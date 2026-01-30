from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import uvicorn
import os
import asyncio
from ai_agent import JobAgent
from browser_agent import BrowserAgent
from resume_renderer import markdown_to_pdf

app = FastAPI(title="JobApplierAI Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Models ---
class JobRequest(BaseModel):
    job_description: str
    resume_text: str
    model: str = "models/gemini-2.5-flash"

class ApplyRequest(BaseModel):
    job_url: str
    tailored_resume_text: str
    user_profile: dict 

class PDFRequest(BaseModel):
    resume_text: str
    user_profile: dict

# --- Routes ---

@app.get("/")
def health_check():
    return {"status": "active", "system": "JobApplierAI Agent"}

@app.get("/api/models")
def list_models():
    return {"models": JobAgent.get_available_models()}

@app.post("/api/analyze-and-tailor")
async def analyze_and_tailor(payload: JobRequest):
    try:
        agent = JobAgent(model_name=payload.model)
    except:
        agent = JobAgent(model_name="models/gemini-2.5-flash")

    analysis = await agent.analyze_job_posting(payload.job_description)
    
    if "error" in analysis:
         return {"status": "error", "message": analysis['error']}

    if analysis.get("scam_risk") == "High":
        return {
            "status": "blocked",
            "message": "Potential scam detected. Review manually.",
            "analysis": analysis
        }

    fit_report = await agent.analyze_fit_and_recommend(payload.resume_text, payload.job_description)
    tailored_resume = await agent.tailor_resume(payload.resume_text, analysis)

    return {
        "status": "success",
        "analysis": analysis,
        "fit_report": fit_report,
        "tailored_resume": tailored_resume
    }

@app.post("/api/generate-pdf")
async def generate_pdf(payload: PDFRequest):
    try:
        pdf_buffer = markdown_to_pdf(payload.resume_text, payload.user_profile)
        filename = f"Resume_{payload.user_profile.get('last_name', 'Candidate')}.pdf"
        
        return StreamingResponse(
            pdf_buffer, 
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/apply")
async def auto_apply(payload: ApplyRequest):
    # 1. Generate PDF for the application
    try:
        pdf_buffer = markdown_to_pdf(payload.tailored_resume_text, payload.user_profile)
        resume_filename = f"tailored_resume_{payload.user_profile.get('last_name', 'user')}.pdf"
        resume_path = os.path.join(os.getcwd(), "temp_resumes", resume_filename)
        
        os.makedirs(os.path.dirname(resume_path), exist_ok=True)
        with open(resume_path, "wb") as f:
            f.write(pdf_buffer.getvalue())
            
    except Exception as e:
        return {"status": "error", "message": f"PDF Generation failed: {str(e)}"}

    # 2. Launch Browser Agent
    agent = BrowserAgent()
    try:
        result = await agent.apply_to_job(payload.job_url, payload.user_profile, resume_path)
        return result
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
