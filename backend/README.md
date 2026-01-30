# JobApplierAI Agent - Backend 

The backend acts as the central intelligence unit for the JobApplierAI Agent. It exposes a **FastAPI** service that orchestrates AI analysis, file generation, and browser automation.

## 📂 Project Structure & Files

| Path / File | Type | Description |
| :--- | :---: | :--- |
| **`main.py`** | **API Server** | The entry point. Defines all API endpoints (`/analyze`, `/generate-pdf`, `/apply`) and connects the agents. |
| **`ai_agent.py`** | **The Brain** | Wraps Google Gemini 2.5 Flash. Handles prompts for "Career Coaching", "Fit Analysis", and "Resume Tailoring". |
| **`browser_agent.py`** | **The Hands** | Contains the Playwright automation logic. Detects job board types (Greenhouse/Lever) and executes form filling. |
| **`resume_renderer.py`** | **The Artist** | Converts Markdown text into a professional, CSS-styled PDF document using `xhtml2pdf`. |
| **`requirements.txt`** | Dependency | Lists all Python libraries required to run the project. |
| **`.env`** | Security | Stores sensitive API keys (Gemini API Key). **Not committed to Git.** |

## 🔌 API Endpoints

The backend exposes the following REST endpoints:

| Method | Endpoint | Description |
| :---: | :--- | :--- |
| `GET` | **`/`** | Health check. Returns system status. |
| `GET` | **`/api/models`** | Returns a list of available Gemini models (e.g., `gemini-2.5-flash`). |
| `POST` | **`/api/analyze-and-tailor`** | Accepts Job + Resume. Returns **Fit Score**, **Advice**, and **Tailored Resume Text**. |
| `POST` | **`/api/generate-pdf`** | Accepts Resume Text. Returns a binary **PDF file stream** for download. |
| `POST` | **`/api/apply`** | Accepts Job URL + Resume. Launches the **Browser Agent** to submit the application. |

## 🛠️ Tech Stack Details

| Technology | Role | Why we chose it |
| :--- | :--- | :--- |
| **FastAPI** | Web Framework | Extremely fast, async support (needed for Playwright), and auto-generated docs. |
| **Gemini 2.5 Flash** | AI Model | Google's latest fast model. Cheap, low latency, and high context window. |
| **Playwright** | Automation | More reliable than Selenium. Handles modern shadow-DOM websites (like Greenhouse) easily. |
| **xhtml2pdf** | PDF Engine | robust HTML-to-PDF converter that allows CSS styling. |

## 🚀 Commands

| Command | Action |
| :--- | :--- |
| `python main.py` | Starts the server at `http://localhost:8000`. |
| `pip install -r requirements.txt` | Installs dependencies. |
| `playwright install chromium` | Downloads the browser engine required for automation. |