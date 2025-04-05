from bson import ObjectId
from flask import Flask, jsonify
from pymongo import MongoClient
import requests
from io import BytesIO
from main import ResumeAnalyzer

app = Flask(__name__)

# MongoDB Connection
client = MongoClient("mongodb+srv://adityaonstudy:ShsHrmRBSB3J40zU@cluster0.bzjb1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["test"]
users_collection = db["users"]
#print(users_collection)

# Resume Analyzer Object
analyzer = ResumeAnalyzer()

@app.route("/analyze_resume/<user_id>")
def analyze_resume(user_id):
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user or "profile" not in user or "resume" not in user["profile"]:
       return jsonify({"error": "Resume not found"}), 404

    resume_url = user["profile"]["resume"]  # Resume URL extract kiya
    print("Resume URL:", resume_url)
    # Cloudinary se PDF fetch karo
    response = requests.get(resume_url)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch resume"}), 500

    pdf_file = BytesIO(response.content)

    # ResumeAnalyzer ka use karke analyze karo
    result = analyzer.analyze_resume(pdf_file, job_role="Software Engineer")
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
