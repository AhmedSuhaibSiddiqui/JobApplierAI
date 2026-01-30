# JobApplierAI Agent

**An Intelligent, Ethical, and Automated Job Application Assistant.**

JobApplierAI is a "Human-in-the-Loop" tool designed to streamline the job application process. It leverages Generative AI to analyze job descriptions and tailor resumes, combined with browser automation to handle the repetitive task of form filling.

---

## 🚀 Overview

Job hunting is often a volume game where quality suffers. Candidates spend hours tweaking resumes for ATS (Applicant Tracking Systems) and manually entering data into repetitive forms.

**JobApplierAI solves this by:**
1.  **Analyzing** job descriptions to extract key skill requirements.
2.  **Tailoring** your base resume to specifically target those requirements using Google's Gemini AI.
3.  **Automating** the submission process on supported platforms (Greenhouse, Lever) via a secure browser agent.

**Core Philosophy:** *Automation with Oversight.* This tool is not a "spam bot." It is a productivity multiplier that requires your review for every application, ensuring ethical usage and high-quality submissions.

---

## ✨ Key Features

*   **🤖 AI Analyst (The Brain):** Instantly parses job descriptions to identify hard skills, soft skills, and cultural fit keywords.
*   **✍️ Smart Tailor (The Writer):** Rewrites your professional summary and re-prioritizes skills in your resume to match the specific job description.
*   **🛡️ Ethical Guardrails:** Automatically flags potential job scams (e.g., "pay-to-work" schemes) before you apply.
*   **⚡ Auto-Applier (The Hands):** A Playwright-based browser agent that navigates to job boards, fills out your profile (Name, Email, Phone), and uploads your tailored resume.
*   **💎 Modern UI:** A beautiful, glassmorphism-styled dashboard with a live "hacker terminal" to monitor the agent's actions in real-time.

---

## 🛠️ Architecture

The project is built as a local full-stack application to ensure data privacy.

*   **Frontend:** React (Vite) + TypeScript + Tailwind CSS
*   **Backend:** Python (FastAPI)
*   **AI Engine:** Google Gemini (via `google-generativeai`)
*   **Automation:** Playwright (Python)

---

## ⚙️ Installation & Setup

### Prerequisites
*   **Node.js** (v18+)
*   **Python** (v3.10+)
*   **Google Gemini API Key** (Get one [here](https://aistudio.google.com/app/apikey))

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/JobApplierAi.git
cd JobApplierAi
```

### 2. Backend Setup (The Brain)
```bash
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
# Windows:
.\venv\Scripts\Activate
# Mac/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Install Playwright browsers
playwright install chromium

# Configure Environment
# Rename .env.example to .env and add your API Key
# GEMINI_API_KEY=your_actual_key_here
```
*Note: Ensure you create a `.env` file in the `backend/` folder and paste your actual API key inside.*

### 3. Frontend Setup (The Dashboard)
Open a new terminal window:
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 📖 How to Use

1.  **Start the Servers:** Ensure both backend (`python main.py`) and frontend (`npm run dev`) are running.
2.  **Access Dashboard:** Open your browser to `http://localhost:5173`.
3.  **Configure Profile:** Enter your basic details (Name, Email, Phone) in the "Your Profile" section.
4.  **Target a Job:**
    *   Paste the **Job Description** into the text area.
    *   Paste the **Job URL** (Greenhouse or Lever links work best).
5.  **Generate:** Click **"Generate Resume"**. The AI will rewrite your resume text to match the job.
6.  **Apply:** Once satisfied with the tailored text, click **"Auto-Apply Now"**.
    *   A browser window will open.
    *   Watch as the agent navigates to the URL, fills the form, and uploads your resume.

---

## ⚠️ Disclaimer & Ethics

This tool is designed for personal productivity, **not** for spamming.
*   **Rate Limits:** Please respect the rate limits of job boards. Applying to hundreds of jobs per minute is unethical and will get your IP banned.
*   **Review:** Always review the AI-generated resume before applying. AI can occasionally hallucinate facts.
*   **Terms of Service:** Ensure your use of automation complies with the Terms of Service of the platforms you are accessing.