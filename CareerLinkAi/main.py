import pandas as pd
import spacy
import re
from collections import Counter
import PyPDF2
from spacy.matcher import PhraseMatcher

def load_nlp_model():
    try:
        return spacy.load('en_core_web_sm')
    except OSError:
        raise RuntimeError("spaCy model 'en_core_web_sm' is missing! Install it using: python -m spacy download en_core_web_sm")
# Main class for resume analysis
class ResumeAnalyzer:
    def __init__(self):
        # Load spaCy model
        self.nlp = load_nlp_model()
        
        # Load skills and courses data
        self.tech_skills = self.load_skills('tech_skills.csv')
        self.soft_skills = self.load_skills('soft_skills.csv')
        self.courses = self.load_courses('courses.csv')
        
        # Initialize matchers
        self.tech_matcher = self.create_matcher(self.tech_skills)
        self.soft_matcher = self.create_matcher(self.soft_skills)
        
    def load_skills(self, filename):
        """Load skills from CSV file"""
        try:
            return pd.read_csv(f'data/{filename}')['Skills'].str.lower().tolist()
        except Exception as e:
            return ["python", "java", "javascript"] if 'tech' in filename else ["communication", "teamwork", "leadership"]
    
    def load_courses(self, filename):
        """Load course recommendations from CSV file"""
        try:
            return pd.read_csv(f'data/{filename}')
        except Exception as e:
            return pd.DataFrame({
                'Skill': ["python", "data science"],
                'Course': ["Python for Everybody", "Data Science Specialization"],
                'Platform': ["Coursera", "Coursera"],
                'URL': ["https://coursera.org/python", "https://coursera.org/data-science"]
            })
    
    def create_matcher(self, skills):
        """Create a phrase matcher for a list of skills"""
        matcher = PhraseMatcher(self.nlp.vocab, attr="LOWER")
        patterns = [self.nlp.make_doc(skill) for skill in skills]
        matcher.add("SkillSet", None, *patterns)
        return matcher
    
    def extract_text_from_pdf(self, pdf_file):
        """Extract text from PDF file"""
        text = ""
        try:
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            for page_num in range(len(pdf_reader.pages)):
                text += pdf_reader.pages[page_num].extract_text()
            return text
        except Exception as e:
            return f"Error extracting text from PDF: {str(e)}"
    
    def extract_name(self, text):
        """Extract name from resume text"""
        doc = self.nlp(text[:500])  # Look at the first 500 characters
        for ent in doc.ents:
            if ent.label_ == "PERSON":
                return ent.text
        return "Name not found"
    
    def extract_email(self, text):
        """Extract email from resume text"""
        email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
        emails = re.findall(email_pattern, text)
        return emails[0] if emails else "Email not found"
    
    def extract_phone_number(self, text):
        """Extract phone number from resume text"""
        phone_pattern = r'(\+\d{1,3}[-\.\s]??)?\(?\d{3}\)?[-\.\s]?\d{3}[-\.\s]?\d{4}'
        matches = re.findall(phone_pattern, text)
        return matches[0] if matches else "Phone number not found"
    
    def extract_skills(self, text):
        """Extract skills from resume text"""
        doc = self.nlp(text.lower())
        
        tech_matches = self.tech_matcher(doc)
        soft_matches = self.soft_matcher(doc)
        
        tech_skills_found = []
        for match_id, start, end in tech_matches:
            span = doc[start:end]
            tech_skills_found.append(span.text)
            
        soft_skills_found = []
        for match_id, start, end in soft_matches:
            span = doc[start:end]
            soft_skills_found.append(span.text)
            
        return {
            "technical_skills": list(set(tech_skills_found)),
            "soft_skills": list(set(soft_skills_found))
        }
    
    def extract_education(self, text):
        """Extract education information"""
        education_keywords = ["education", "university", "college", "bachelor", "master", "phd", "degree"]
        education_section = None
        
        # Try to find education section
        for keyword in education_keywords:
            pattern = re.compile(f"(?i)({keyword}.*?)(?:$|experience|skills|projects)", re.DOTALL)
            match = pattern.search(text)
            if match and match.group(1):
                education_section = match.group(1)
                break
        
        if not education_section:
            return "Education details not found"
        
        # Find degree types and institutions
        degrees = []
        doc = self.nlp(education_section)
        for sent in doc.sents:
            degrees.append(sent.text.strip())
        
        return degrees[:3]  # Return top 3 education entries
    
    def extract_experience(self, text):
        """Extract work experience information"""
        exp_keywords = ["experience", "work experience", "employment", "work history"]
        exp_section = None
        
        for keyword in exp_keywords:
            pattern = re.compile(f"(?i)({keyword}.*?)(?:$|education|skills|projects)", re.DOTALL)
            match = pattern.search(text)
            if match and match.group(1):
                exp_section = match.group(1)
                break
        if not exp_section:
            return "Experience details not found"
        # Extract company names and positions
        experience = []
        doc = self.nlp(exp_section)
        for sent in doc.sents:
            if len(sent.text.strip()) > 30:  # Ignore short sentences
                experience.append(sent.text.strip())
        
        return experience[:5]  # Return top 5 experience entries
    
    def calculate_resume_score(self, text, skills_found):
        """Calculate resume score based on various factors"""
        score = 0
        
        # Score for skill count (max 30 points)
        total_skills = len(skills_found["technical_skills"]) + len(skills_found["soft_skills"])
        skill_score = min(30, total_skills * 3)
        score += skill_score
        
        # Score for resume length (max 20 points)
        words = text.split()
        length_score = min(20, len(words) / 50)
        score += length_score
        
        # Score for contact information (max 10 points)
        if self.extract_email(text) != "Email not found":
            score += 5
        if self.extract_phone_number(text) != "Phone number not found":
            score += 5
        
        # Score for education section (max 20 points)
        edu = self.extract_education(text)
        if edu != "Education details not found" and isinstance(edu, list):
            score += min(20, len(edu) * 10)
        
        # Score for experience section (max 20 points)
        exp = self.extract_experience(text)
        if exp != "Experience details not found" and isinstance(exp, list):
            score += min(20, len(exp) * 5)
            
        return round(score)
    
    def suggest_missing_skills(self, job_role, found_skills):
        """Suggest skills that are missing based on job role"""
        # Define required skills for common roles
        role_skills = {
            "data scientist": ["python", "r", "sql", "machine learning", "statistics", "data visualization"],
            "web developer": ["html", "css", "javascript", "react", "node.js", "mongodb"],
            "software engineer": ["algorithms", "data structures", "object-oriented programming", "git", "testing"],
            "project manager": ["agile", "scrum", "jira", "leadership", "communication", "budgeting"]
        }
        
        # Default to software engineer if role not found
        required_skills = role_skills.get(job_role.lower(), role_skills["software engineer"])
        
        # Find missing skills
        all_found_skills = found_skills["technical_skills"] + found_skills["soft_skills"]
        missing_skills = [skill for skill in required_skills if skill not in all_found_skills]
        
        return missing_skills
    
    def get_course_recommendations(self, missing_skills):
        """Get course recommendations based on missing skills"""
        recommendations = []
        
        for skill in missing_skills:
            matching_courses = self.courses[self.courses['Skill'].str.contains(skill, case=False)]
            if not matching_courses.empty:
                course = matching_courses.iloc[0]
                recommendations.append({
                    "skill": skill,
                    "course_name": course['Course'],
                    "platform": course['Platform'],
                    "url": course['URL']
                })
        
        # If no specific courses found, add some general ones
        if not recommendations:
            recommendations = [{
                "skill": "General Career Development",
                "course_name": "Career Development Specialization",
                "platform": "Coursera",
                "url": "https://www.coursera.org/specializations/career-success"
            }]
        return recommendations[:5]  # Return top 5 recommendations
    
    def get_resume_tips(self, text, score):
        """Get tips for improving the resume"""
        tips = []
        
        # Check resume length
        words = text.split()
        if len(words) < 300:
            tips.append("Your resume is quite short. Consider adding more detail about your experiences and achievements.")
        elif len(words) > 1000:
            tips.append("Your resume is quite long. Consider condensing it to highlight only the most relevant information.")
        
        # Check for action verbs
        action_verbs = ["achieved", "improved", "created", "managed", "developed", "designed", "implemented", "increased"]
        doc = self.nlp(text.lower())
        verb_count = sum(1 for token in doc if token.pos_ == "VERB" and token.text in action_verbs)
        
        if verb_count < 5:
            tips.append("Use more action verbs (like achieved, improved, created) to describe your accomplishments.")
        
        # Tips based on score
        if score < 50:
            tips.append("Include a clear objective or professional summary at the top of your resume.")
            tips.append("Quantify your achievements with numbers and percentages where possible.")
        elif score < 70:
            tips.append("Tailor your resume more specifically to each job application.")
            tips.append("Ensure your most impressive achievements are highlighted prominently.")
        
        # If no specific tips, add some general ones
        if not tips:
            tips = [
                "Regularly update your resume with new skills and experiences.",
                "Have someone else review your resume for feedback and to catch errors."
            ]
            
        return tips
    
    def get_career_recommendations(self, skills_found):
        """Get career path recommendations based on skills"""
        # Simple logic based on technical skills
        tech_skills = set(skills_found["technical_skills"])
        
        recommendations = []
        
        # Data-related career paths
        data_skills = {"python", "r", "sql", "machine learning", "statistics", "data"}
        if len(tech_skills.intersection(data_skills)) >= 2:
            recommendations.append({
                "title": "Data Scientist/Analyst",
                "reason": "Your technical skills align well with data science and analysis roles."
            })
        
        # Web development career paths
        web_skills = {"html", "css", "javascript", "react", "angular", "node.js", "web"}
        if len(tech_skills.intersection(web_skills)) >= 2:
            recommendations.append({
                "title": "Web Developer",
                "reason": "You have solid web development technologies in your skill set."
            })
        
        # Software engineering paths
        se_skills = {"java", "c++", "python", "algorithms", "oop", "software"}
        if len(tech_skills.intersection(se_skills)) >= 2:
            recommendations.append({
                "title": "Software Engineer",
                "reason": "Your programming language skills and technical background suit software engineering roles."
            })
        
        # If no specific recommendations, add a default one
        if not recommendations:
            recommendations.append({
                "title": "Technical Consultant",
                "reason": "Your mix of skills would allow you to provide technical consultation in various domains."
            })
            
        return recommendations[:3]  # Return top 3 recommendations
    
    def analyze_resume(self, pdf_file, job_role="Software Engineer"):
        """Main function to analyze resume and return structured results"""
        # Extract text from PDF
        text = self.extract_text_from_pdf(pdf_file)
        if text.startswith("Error"):
            return {"error": text}
        
        # Extract information
        name = self.extract_name(text)
        email = self.extract_email(text)
        phone = self.extract_phone_number(text)
        skills_found = self.extract_skills(text)
        education = self.extract_education(text)
        experience = self.extract_experience(text)
        
        # Calculate resume score
        score = self.calculate_resume_score(text, skills_found)
        
        # Get recommendations
        missing_skills = self.suggest_missing_skills(job_role, skills_found)
        course_recommendations = self.get_course_recommendations(missing_skills)
        resume_tips = self.get_resume_tips(text, score)
        career_recommendations = self.get_career_recommendations(skills_found)
        
        # Compile results
        result = {
            "personal_info": {
                "name": name,
                "email": email,
                "phone": phone
            },
            "resume_score": score,
            "skills": {
                "found": skills_found,
                "missing_for_role": missing_skills
            },
            "education": education,
            "experience": experience,
            "recommendations": {
                "career": career_recommendations,
                "courses": course_recommendations,
                "resume_tips": resume_tips,
                "skills_to_develop": missing_skills
            }
        }
        return result
