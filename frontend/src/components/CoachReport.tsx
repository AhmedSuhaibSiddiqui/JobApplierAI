import React from 'react';
import { Cpu, AlertCircle, BookOpen, Search, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FitReport {
  fit_score: number;
  missing_skills: string[];
  learning_recommendations: string[];
  alternative_roles: string[];
  similar_opportunities_query: string;
}

interface CoachReportProps {
  report: FitReport | null;
}

export const CoachReport: React.FC<CoachReportProps> = ({ report }) => {
  if (!report) return null;

  const scoreColor = report.fit_score >= 80 ? 'text-emerald-600' : 
                     report.fit_score >= 60 ? 'text-amber-500' : 'text-red-500';
  
  const barColor = report.fit_score >= 80 ? 'bg-emerald-500' : 
                   report.fit_score >= 60 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="glass-panel rounded-2xl p-6 animate-scale-in border-t-4 border-indigo-500 shadow-xl shadow-indigo-500/10">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2.5 text-slate-800">
                 <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-600">
                    <Cpu className="w-5 h-5" />
                 </div>
                 Career Coach Analysis
            </h3>
            <div className="flex flex-col items-end">
                <span className={`text-2xl font-black ${scoreColor}`}>
                    {report.fit_score}%
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fit Score</span>
            </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 mb-8 overflow-hidden">
            <div 
                className={`h-2.5 rounded-full ${barColor} transition-all duration-1000 ease-out`} 
                style={{ width: `${report.fit_score}%` }}
            ></div>
        </div>

        <div className="space-y-6">
            {/* Missing Skills */}
            {report.missing_skills.length > 0 ? (
                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2 mb-3">
                        <AlertCircle className="w-3.5 h-3.5 text-red-500" /> Skill Gaps Detected
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {report.missing_skills.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-red-50/80 text-red-600 text-xs font-medium rounded-full border border-red-100">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Perfect Skill Match!</span>
                </div>
            )}

            {/* Learning Recommendations */}
            {report.learning_recommendations.length > 0 && (
                <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2 mb-3">
                        <BookOpen className="w-3.5 h-3.5 text-blue-500" /> Recommended Learning Path
                    </h4>
                    <ul className="bg-white/40 rounded-xl p-4 space-y-2 border border-white/50">
                        {report.learning_recommendations.map((item, idx) => (
                            <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                                <span className="text-blue-400 mt-0.5">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Alternative Roles */}
            <div>
                 <h4 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2 mb-3">
                     <Search className="w-3.5 h-3.5 text-emerald-500" /> Strategic Pivots
                 </h4>
                 <div className="space-y-2.5">
                    {report.alternative_roles.map(role => (
                        <div key={role} className="text-xs font-medium text-slate-700 bg-white/60 hover:bg-white px-3 py-2.5 rounded-lg border border-slate-100 transition-colors cursor-default">
                            {role}
                        </div>
                    ))}
                 </div>
                 
                 <a 
                    href={`https://www.google.com/search?q=${encodeURIComponent(report.similar_opportunities_query)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex items-center justify-between w-full px-4 py-2 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-colors group"
                >
                    Find Similar Jobs 
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </div>
    </div>
  );
};
