from bson import ObjectId
from flask import Flask, jsonify
from flask_cors import CORS  # 👈 NEW import
from pymongo import MongoClient
import requests
from io import BytesIO

# Import your analyzer functions (adjust the import paths as needed)
from main import ResumeAnalyzer
from analysisbygemini import extract_text_from_pdf_bytes, analyze_resume_with_gemini

app = Flask(__name__)

# ✅ Enable CORS for your frontend
CORS(app, supports_credentials=True, origins=["http://localhost:5173", "http://localhost:5173"])

# MongoDB Connection
client = MongoClient("mongodb+srv://adityaonstudy:ShsHrmRBSB3J40zU@cluster0.bzjb1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["test"]
users_collection = db["users"]

# Resume Analyzer Object
analyzer = ResumeAnalyzer()

@app.route("/analyze_resume/<user_id>")
def analyze_resume(user_id):
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user or "profile" not in user or "resume" not in user["profile"]:
        return jsonify({"error": "Resume not found"}), 404

    resume_url = user["profile"]["resume"]
    print("Resume URL:", resume_url)

    response = requests.get(resume_url)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch resume"}), 500

    pdf_file = BytesIO(response.content)
    result = analyzer.analyze_resume(pdf_file, job_role="Software Engineer")
    return jsonify(result)

@app.route("/analyze_resume_api/<user_id>")
def analyze_resume_api(user_id):
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user or "profile" not in user or "resume" not in user["profile"]:
        return jsonify({"error": "Resume not found"}), 404

    resume_url = user["profile"]["resume"]
    print("Resume URL:", resume_url)

    try:
        pdf_response = requests.get(resume_url)
        if pdf_response.status_code != 200:
            return jsonify({"error": "Failed to fetch resume"}), 500

        pdf_bytes = pdf_response.content
        resume_text = extract_text_from_pdf_bytes(pdf_bytes)

        if len(resume_text) > 30000:
            resume_text = resume_text[:30000]

        result = analyze_resume_with_gemini(resume_text, job_role="Software Engineer")
        return jsonify(result)

    except Exception as e:
        print("Unexpected error:", e)
        return jsonify({"error": "Unexpected error"}), 500

if __name__ == "__main__":
    app.run(debug=True)

