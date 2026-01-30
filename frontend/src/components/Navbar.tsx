import React from 'react';
import { Bot, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="glass-panel sticky top-0 z-50 border-b-0 mb-8 backdrop-blur-md bg-white/70">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/20 transform transition hover:scale-105 duration-300">
                <Bot className="w-6 h-6 text-white" />
             </div>
             <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 tracking-tight">
                    JobApplier<span className="font-light text-slate-500">AI</span>
                </h1>
                <p className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase mt-0.5">Automated Career Agent</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" /> SAFE MODE
            </span>
          </div>
        </div>
      </header>
  );
};
