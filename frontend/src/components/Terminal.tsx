import React, { useEffect, useRef } from 'react';

interface Log {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
}

interface TerminalProps {
  logs: Log[];
}

export const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="terminal-window rounded-2xl overflow-hidden h-[450px] flex flex-col shadow-2xl shadow-black/20 ring-1 ring-white/10">
        <div className="bg-[#1a1b26] px-4 py-3 flex items-center justify-between border-b border-white/5">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors"></div>
            </div>
            <span className="text-xs text-slate-500 font-mono font-medium">agent-logs.sh</span>
        </div>
        
        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs space-y-2.5 bg-[#1a1b26] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="text-slate-500 select-none"># System initialized. Waiting for commands...</div>
            
            {logs.map((log) => (
                <div key={log.id} className="flex gap-3 group animate-fade-in">
                    <span className="text-slate-600 select-none min-w-[60px] text-right opacity-50 group-hover:opacity-100 transition-opacity">
                        {log.timestamp}
                    </span>
                    <span className="select-none">➜</span>
                    <span className={`break-words flex-1 leading-relaxed ${
                        log.type === 'error' ? 'text-red-400 font-bold' :
                        log.type === 'success' ? 'text-emerald-400' :
                        log.type === 'warning' ? 'text-amber-400' :
                        'text-indigo-200'
                    }`}>
                        {log.message}
                    </span>
                </div>
            ))}
            <div ref={logsEndRef} />
        </div>
    </div>
  );
};
