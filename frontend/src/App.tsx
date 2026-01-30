import React, { useState, useEffect } from 'react';
import { Sparkles, Play, AlertCircle } from 'lucide-react';

// Components
import { Navbar } from './components/Navbar';
import { Background } from './components/Background';
import { Terminal } from './components/Terminal';
import { JobInput } from './components/JobInput';
import { ProfileInput } from './components/ProfileInput';
import { CoachReport } from './components/CoachReport';
import { ResumePreview } from './components/ResumePreview';

// Types
interface Log {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
}

interface FitReport {
  fit_score: number;
  missing_skills: string[];
  learning_recommendations: string[];
  alternative_roles: string[];
  similar_opportunities_query: string;
}

function App() {
  // State
  const [jobUrl, setJobUrl] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });

  const [selectedModel, setSelectedModel] = useState('models/gemini-2.5-flash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [tailoredResume, setTailoredResume] = useState('');
  const [fitReport, setFitReport] = useState<FitReport | null>(null);

  // --- Logic ---

  useEffect(() => {
    // Auto-detect best model
    fetch('http://localhost:8000/api/models')
        .then(res => res.json())
        .then(data => {
            if (data.models && data.models.length > 0) {
                const best = data.models.find((m: string) => m.includes('gemini-2.5-flash')) || 
                             data.models.find((m: string) => m.includes('flash')) || 
                             data.models[0];
                setSelectedModel(best);
                addLog(`[SYSTEM] AI Brain Loaded: ${best.replace('models/', '')}`, 'info');
            }
        })
        .catch(err => console.error("Model load failed", err));
  }, []);

  const addLog = (message: string, type: Log['type'] = 'info') => {
    setLogs(prev => [...prev, {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const handleTailor = async () => {
    if (!jobDescription) return addLog("Cannot generate: Missing Job Description.", 'error');

    setIsProcessing(true);
    setTailoredResume('');
    setFitReport(null);
    addLog(`Analyzing Fit & Tailoring Resume...`, 'info');
    
    try {
        const response = await fetch('http://localhost:8000/api/analyze-and-tailor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ job_description: jobDescription, resume_text: resumeText, model: selectedModel })
        });
        const data = await response.json();
        
        if (data.status === 'success') {
            setTailoredResume(data.tailored_resume);
            setFitReport(data.fit_report);
            addLog(`Analysis Complete. Fit Score: ${data.fit_report?.fit_score}/100`, 'success');
        } else {
            addLog(`Error: ${data.message}`, 'error');
        }
    } catch (error) {
        addLog("Connection Failed. Is backend running?", 'error');
    } finally {
        setIsProcessing(false);
    }
  };

  const handleApply = async () => {
    if (!jobUrl) return addLog("Cannot apply: Missing Job URL.", 'error');
    if (!tailoredResume) return addLog("Cannot apply: Resume not generated yet.", 'warning');

    setIsApplying(true);
    addLog(`[AGENT] Launching Browser Agent for ${jobUrl}...`, 'warning');
    
    try {
        const response = await fetch('http://localhost:8000/api/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                job_url: jobUrl,
                tailored_resume_text: tailoredResume,
                user_profile: profile
            })
        });
        const data = await response.json();
        if (data.status === 'success') {
            addLog("[AGENT] Application Submitted (or Form Filled)!", 'success');
        } else {
            addLog(`[AGENT] Failed: ${data.message}`, 'error');
        }
    } catch (e) {
        addLog("Agent connection failed.", 'error');
    } finally {
        setIsApplying(false);
    }
  };

  // --- Render ---

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);

  const canGenerate = jobDescription.length > 10 && validateEmail(profile.email) && validatePhone(profile.phone);
  const canApply = jobUrl.length > 5 && tailoredResume.length > 0 && canGenerate;

  return (
    <div className="min-h-screen pb-12 font-sans relative">
      <Background />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Controls */}
        <div className="lg:col-span-7 space-y-6">
            <JobInput 
                jobUrl={jobUrl} setJobUrl={setJobUrl}
                jobDescription={jobDescription} setJobDescription={setJobDescription}
            />
            
            <ProfileInput 
                profile={profile} setProfile={setProfile}
                resumeText={resumeText} setResumeText={setResumeText}
            />

            {/* Action Bar */}
            <div className="flex gap-4 p-2 bg-white/40 rounded-2xl backdrop-blur-sm border border-white/40">
                <button 
                    onClick={handleTailor}
                    disabled={isProcessing || !canGenerate}
                    className={`flex-1 py-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none disabled:shadow-none ${
                        !canGenerate ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 
                        'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-indigo-500/30'
                    }`}
                >
                    {isProcessing ? <Sparkles className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    Analyze & Generate Resume
                </button>
                
                <div className="relative flex-1 group">
                    <button 
                        onClick={handleApply}
                        disabled={isApplying || !canApply}
                        className={`w-full h-full py-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none disabled:shadow-none ${
                            !canApply ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 
                            'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-emerald-500/30'
                        }`}
                    >
                        {isApplying ? <Play className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                        {isApplying ? 'Agent Applying...' : 'Auto-Apply Now'}
                    </button>

                    {/* Contradiction Tooltip */}
                    {!canApply && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none flex items-center gap-1.5 z-20">
                            <AlertCircle className="w-3 h-3 text-red-400" />
                            {jobUrl.length < 5 ? 'Missing Job URL' : 
                             !validateEmail(profile.email) ? 'Invalid Email' :
                             !validatePhone(profile.phone) ? 'Invalid Phone' :
                             'Generate Resume First'}
                            <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: Output */}
        <div className="lg:col-span-5 space-y-6">
            <CoachReport report={fitReport} />
            <Terminal logs={logs} />
            {tailoredResume && <ResumePreview tailoredResume={tailoredResume} profile={profile} />}
        </div>

      </main>
    </div>
  )
}

export default App