# JobApplierAI Agent - Frontend

The frontend is the "Command Center" of the application. It is built with **React (Vite)** and **TypeScript**, styled with **Tailwind CSS**, and uses a custom **Glassmorphism** design system.

## 📂 Project Structure & Files

| Path / File | Type | Description |
| :--- | :---: | :--- |
| **`src/App.tsx`** | **Core Logic** | The main controller. Manages state (user inputs), handles API calls to the backend, and enforces validation rules (Regex). |
| **`src/main.tsx`** | Entry Point | Mounts the React application to the DOM. |
| **`src/custom.css`** | Styling | Defines the core "Cyber-Glass" theme variables, animations, and glassmorphism classes. |
| **`vite.config.ts`** | Config | Configuration for the Vite build tool. |

### 🧩 Components (`src/components/`)

| Component File | Visual Role | Key Functionality |
| :--- | :--- | :--- |
| **`Background.tsx`** | 🌌 Backdrop | Renders the animated, deep-space gradient and glowing orbs behind the app. |
| **`CoachReport.tsx`** | 📊 Analysis | Visualizes the "Fit Score" (ProgressBar), lists missing skills, and suggests learning paths. |
| **`JobInput.tsx`** | 📝 Form | Captures the Job URL and Job Description text. |
| **`Navbar.tsx`** | 🧭 Navigation | Displays the "JobApplierAI" branding and "Safe Mode" status badge. |
| **`ProfileInput.tsx`** | 👤 Form | Captures User Name, Email, Phone, and Base Resume. Handles real-time validation. |
| **`ResumePreview.tsx`** | 📄 Output | Renders the tailored resume in Markdown. Handles **PDF Download** and Copy-to-Clipboard. |
| **`Terminal.tsx`** | 🖥️ Console | A scrolling log window that displays real-time status updates from the AI Agent. |

## 🎨 Design System

The app uses a hybrid styling approach:

| Class Name | Defined In | Purpose |
| :--- | :--- | :--- |
| `.glass-panel` | `custom.css` | Creates the semi-transparent, blurred card effect. |
| `.glass-input` | `custom.css` | Styles input fields with a dark, transparent background. |
| `.aura-container` | `custom.css` | Handles the ambient background animation layers. |
| `.prose-resume` | `custom.css` | Styles the Markdown resume content (headers, bullets). |

## 🚀 Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Installs dependencies. |
| `npm run dev` | Starts the local dev server (`localhost:5173`). |
| `npm run build` | Builds for production. |
