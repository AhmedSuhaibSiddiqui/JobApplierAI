import React, { useState } from 'react';
import { FileText, Copy, Check, Download, FileDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ResumePreviewProps {
  tailoredResume: string;
  profile?: any;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ tailoredResume, profile }) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tailoredResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
        const response = await fetch('http://localhost:8000/api/generate-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                resume_text: tailoredResume,
                user_profile: profile || {}
            })
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Resume_${profile?.last_name || 'Tailored'}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }
    } catch (e) {
        console.error(e);
    } finally {
        setDownloading(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border-l-4 border-indigo-500 animate-fade-in shadow-xl">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" /> Formatted Resume Preview
            </h3>
            <div className="flex gap-2">
                <button 
                    onClick={handleDownload}
                    disabled={downloading}
                    className="text-[10px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors font-bold uppercase tracking-wider"
                >
                    {downloading ? <FileDown className="w-3.5 h-3.5 animate-bounce" /> : <Download className="w-3.5 h-3.5" />}
                    PDF
                </button>
                <button 
                    onClick={handleCopy}
                    className="text-[10px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors font-bold uppercase tracking-wider"
                >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
        </div>
        
        {/* Render Markdown here */}
        <div className="bg-white/40 rounded-xl p-6 max-h-[400px] overflow-y-auto border border-white/50 shadow-inner prose-resume custom-scrollbar">
            <ReactMarkdown>{tailoredResume}</ReactMarkdown>
        </div>
    </div>
  );
};
