# JobApplierAI Agent - Frontend 💻

The frontend is a modern, responsive dashboard built to control the AI Agent. It features a "Cyber-Glass" aesthetic and provides real-time feedback on the agent's operations.

## 🛠️ Tech Stack

*   **Framework:** React (Vite) + TypeScript
*   **Styling:** Tailwind CSS + Custom CSS Modules (Glassmorphism)
*   **Icons:** Lucide React
*   **Markdown:** `react-markdown` for rich resume previews

## 🎨 UI Features

*   **Cyber-Glass Theme:** Dark mode aesthetic with deep gradients and frosted glass panels.
*   **Live Terminal:** A scrolling log window that displays real-time status updates from the backend agent.
*   **Interactive Forms:** Real-time validation (Regex) for emails and phone numbers.
*   **Career Coach Panel:** Visualizes "Fit Score" and displays learning recommendations dynamically.

## 📂 Project Structure

| Component | Purpose |
|-----------|---------|
| `App.tsx` | Main application logic and state management. |
| `components/Background.tsx` | Renders the animated "Northern Lights" background layers. |
| `components/Terminal.tsx` | The "Hacker Style" log output window. |
| `components/ResumePreview.tsx` | Renders the Markdown resume and handles PDF downloads. |
| `custom.css` | Contains the core Glassmorphism variables and animations. |

## 🚀 Running the Dashboard

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start Dev Server:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.