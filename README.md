# JobApplierAI Agent 

**An Intelligent, Ethical, and Automated Job Application Assistant.**

JobApplierAI Agent is a full-stack automation tool designed to streamline the modern job hunt. It leverages **Google's Gemini 2.5 Flash** to analyze job descriptions and scientifically tailor resumes, combined with a **Playwright** browser agent to autonomously navigate and submit applications.

---

## 🛠️ Installation & Setup (Step-by-Step)

Follow these steps in order to get the application running on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/AhmedSuhaibSiddiqui/JobApplierAI.git
cd JobApplierAi
```

### 2. Configure the Backend (The Brain)
Open a terminal and navigate to the backend directory:
```bash
cd backend
```

**Create and Activate Virtual Environment:**
*   **Windows:**
    ```powershell
    python -m venv venv
    .\venv\Scripts\Activate
    ```
*   **Mac/Linux:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

**Install Dependencies:**
```bash
pip install -r requirements.txt
playwright install chromium
```

**Set up API Key:**
Create a file named `.env` in the `backend/` folder and add your Gemini key:
```bash
GEMINI_API_KEY=your_actual_key_here
```

**Start the Backend:**
```bash
python main.py
```

---

### 3. Configure the Frontend (The Dashboard)
Open a **NEW** terminal window and navigate to the frontend directory:
```bash
cd JobApplierAi/frontend
```

**Install & Run:**
```bash
npm install
npm run dev
```

---

## 📖 How to Use (The Working)

Once both servers are running, follow this workflow to apply for a job:

1.  **Access the App:** Open [http://localhost:5173](http://localhost:5173) in your browser.
2.  **Setup Profile:** Enter your First Name, Last Name, Email, and Phone in the **Your Profile** card.
3.  **Paste Base Resume:** Paste your standard, non-tailored resume into the **Base Resume Text** area.
4.  **Target a Job:** 
    *   Find a job on **Greenhouse.io** or **Lever.co**.
    *   Paste the **Job URL** and the **Job Description** into the **Job Target** card.
5.  **Analyze & Generate:** Click **"Analyze & Generate Resume"**. 
    *   *The AI will calculate your fit score and rewrite your resume text.*
6.  **Review:** Look at the **Career Coach** report on the right to see missing skills and advice.
7.  **Auto-Apply:** Click the green **"Auto-Apply Now"** button.
    *   *A browser window will pop up.*
    *   *The agent will fill the form, upload the tailored PDF, and wait for your final review/submission.*

---

## ✨ Features
*   **Gemini 2.5 Flash:** High-speed, accurate resume tailoring.
*   **Cyber-Glass UI:** Modern dark-mode dashboard with live logs.
*   **PDF Engine:** Automatically generates a professional PDF for every application.
*   **Scam Detection:** Warns you if a job posting appears fraudulent.

---

## 📂 Project Structure
*   `/backend`: FastAPI, AI logic, Playwright automation, and PDF rendering.
*   `/frontend`: React, TypeScript, Tailwind CSS, and Framer-like animations.