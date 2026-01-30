import React from 'react';

export const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0f172a] selection:bg-indigo-500/30">
        
        {/* Base Gradient - Deep dark slate */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f172a]" />

        {/* Orb 1: Top Left (Glowing Indigo) */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse-slow" />

        {/* Orb 2: Bottom Right (Deep Purple) */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-900/20 blur-[120px] animate-pulse-slow" />

        {/* Orb 3: Center Glow (Cyan) */}
        <div className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-cyan-900/10 blur-[100px]" />

        {/* Grid Overlay for "Tech" feel */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
    </div>
  );
};