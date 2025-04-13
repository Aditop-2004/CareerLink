import requests
from io import BytesIO
import json
import PyPDF2
import google.generativeai as genai
import re

API_KEY = "AIzaSyClapFFMKbnxwbi5FIPaCqqAcXoDwE1xmc"  # Replace with your actual key
genai.configure(api_key=API_KEY)

def extract_text_from_pdf_bytes(pdf_bytes):
    try:
        pdf_reader = PyPDF2.PdfReader(BytesIO(pdf_bytes))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() or ""
        return text
    except Exception as e:
        return f"Error extracting text from PDF: {str(e)}"

def analyze_resume_with_gemini(resume_text, job_role):
    model = genai.GenerativeModel('gemini-2.0-flash')
    prompt = f"""
    You are a professional resume analyzer. Analyze this resume text for someone targeting a {job_role} role.

    RESUME TEXT:
    {resume_text}

    Provide analysis in this JSON format:
    {{
        "personal_info": {{
            "name": "extracted name or 'Name not found'",
            "email": "extracted email or 'Email not found'",
            "phone": "extracted phone or 'Phone not found'"
        }},
        "resume_score": <score from 0-100>,
        "skills": {{
            "found": {{
                "technical_skills": ["list of technical skills"],
                "soft_skills": ["list of soft skills"]
            }},
            "missing_for_role": ["missing skills for {job_role}"]
        }},
        "education": ["education entries"],
        "experience": ["experience entries"],
        "recommendations": {{
            "career": [
                {{"title": "Career Path 1", "reason": "reason"}},
                {{"title": "Career Path 2", "reason": "reason"}}
            ],
            "courses": [
                {{"skill": "Skill", "course_name": "Course", "platform": "Platform", "url": "link"}},
                {{"skill": "Skill", "course_name": "Course", "platform": "Platform", "url": "link"}}
            ],
            "resume_tips": ["tip1", "tip2"],
            "skills_to_develop": ["skill1", "skill2"]
        }}
    }}
    ONLY return JSON.
    """
    response = model.generate_content(prompt)
    try:
        match = re.search(r'({.*})', response.text, re.DOTALL)
        return json.loads(match.group(1)) if match else json.loads(response.text)
    except Exception as e:
        return {"error": f"Failed to parse Gemini response: {str(e)}"}