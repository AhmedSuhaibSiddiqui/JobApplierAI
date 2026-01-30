import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("Warning: GEMINI_API_KEY not found. Please set it in backend/.env")

try:
    genai.configure(api_key=api_key)
except Exception as e:
    print(f"Error configuring Gemini: {e}")

class JobAgent:
    def __init__(self, model_name: str = "gemini-2.5-flash"):
        self.model_name = model_name
        self.model = genai.GenerativeModel(model_name)

    @staticmethod
    def get_available_models():
        """Lists all models compatible with generateContent."""
        try:
            models = []
            for m in genai.list_models():
                if 'generateContent' in m.supported_generation_methods:
                    models.append(m.name)
            # Sort to put flash/pro models at top
            models.sort(key=lambda x: 'flash' in x or 'pro' in x, reverse=True)
            return models
        except Exception as e:
            return [f"Error fetching models: {e}"]

    async def analyze_fit_and_recommend(self, resume_text: str, job_text: str) -> dict:
        """
        Compares Resume vs Job to find gaps and suggest alternatives.
        """
        prompt = f"""
        Act as a Senior Career Coach. I am applying for a job, but I want to know where I stand.
        Compare my RESUME against the JOB DESCRIPTION.
        
        Output a STRICT JSON object with these keys:
        - "fit_score": A number 0-100 representing how well I match.
        - "missing_skills": List of critical skills found in the job but MISSING in my resume.
        - "learning_recommendations": List of specific tech stacks or concepts I should learn to fill those gaps.
        - "alternative_roles": List of 3 other job titles I am better suited for based on my CURRENT resume.
        - "similar_opportunities_query": A search query string I can use to find similar jobs at other companies (e.g., "React Developer jobs fintech").

        RESUME:
        {resume_text[:3000]}

        JOB DESCRIPTION:
        {job_text[:3000]}
        """
        
        try:
            response = self.model.generate_content(prompt)
            clean_text = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)
        except Exception as e:
            return {"error": str(e)}

    async def analyze_job_posting(self, job_text: str) -> dict:
        """
        Analyzes a job description to extract key requirements and ethical fit.
        """
        prompt = f"""
        Act as a Career Coach. Analyze this job description.
        
        Output a STRICT JSON object with these keys:
        - "role_name": Title of the role.
        - "company": Company name (if found).
        - "key_requirements": List of top 5 hard skills/requirements.
        - "soft_skills": List of top 3 soft skills.
        - "cultural_keywords": Keywords to include for cultural fit.
        - "scam_risk": "Low", "Medium", or "High" (Assess if it sounds like a fake job/scam).

        JOB DESCRIPTION:
        {job_text[:4000]}
        """
        
        try:
            response = self.model.generate_content(prompt)
            clean_text = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_text)
        except Exception as e:
            return {"error": str(e), "raw": "Model Error"}

    async def tailor_resume(self, base_resume: str, job_analysis: dict) -> str:
        """
        Rewrites the resume summary and highlights based on the job analysis.
        """
        prompt = f"""
        Act as a professional Resume Writer. Tailor the following resume for this specific job.
        
        TARGET JOB: {job_analysis.get('role_name', 'Unknown Role')} at {job_analysis.get('company', 'Unknown Company')}
        KEY REQUIREMENTS: {', '.join(job_analysis.get('key_requirements', []))}

        BASE RESUME:
        {base_resume[:4000]}

        INSTRUCTIONS:
        1. Rewrite the "Professional Summary" to specifically target this role.
        2. Re-order or highlight skills in a "Relevant Skills" section.
        3. Do NOT fabricate experience. Only rephrase existing experience to align with the job keywords.
        4. Return the result in clean Markdown format.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Error tailoring resume: {e}"
