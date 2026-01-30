import React from 'react';
import { Briefcase, Link } from 'lucide-react';

interface JobInputProps {
  jobUrl: string;
  setJobUrl: (val: string) => void;
  jobDescription: string;
  setJobDescription: (val: string) => void;
}

export const JobInput: React.FC<JobInputProps> = ({ jobUrl, setJobUrl, jobDescription, setJobDescription }) => {
  return (
    <div className="glass-panel rounded-2xl p-6 transition-all hover:shadow-indigo-500/5">
        <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2.5">
            <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                <Briefcase className="w-5 h-5" /> 
            </div>
            Job Target
        </h2>
        
        <div className="space-y-5">
             <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Target URL</label>
                <div className="relative group">
                    <Link className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                        type="text" 
                        value={jobUrl} 
                        onChange={(e) => setJobUrl(e.target.value)}
                        placeholder="https://boards.greenhouse.io/..."
                        className="glass-input w-full pl-10 pr-4 py-2.5 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-300"
                    />
                </div>
             </div>
             
             <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Job Description</label>
                <textarea 
                    className="glass-input w-full rounded-xl p-4 h-40 text-sm focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-300 resize-none"
                    placeholder="Paste the full job description here..."
                    value={jobDescription} 
                    onChange={(e) => setJobDescription(e.target.value)}
                />
             </div>
        </div>
    </div>
  );
};
