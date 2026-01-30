import React from 'react';
import { User, Mail, Phone, FileText } from 'lucide-react';

interface ProfileInputProps {
  profile: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  setProfile: (val: any) => void;
  resumeText: string;
  setResumeText: (val: string) => void;
}

export const ProfileInput: React.FC<ProfileInputProps> = ({ profile, setProfile, resumeText, setResumeText }) => {
  const handleChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <div className="glass-panel rounded-2xl p-6 transition-all hover:shadow-indigo-500/5">
        <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2.5">
            <div className="p-1.5 bg-violet-100 rounded-lg text-violet-600">
                <User className="w-5 h-5" />
            </div>
            Your Profile
        </h2>
        
        <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="relative group">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="First Name" 
                    className="glass-input w-full pl-10 pr-3 py-2.5 text-sm rounded-xl focus:ring-2 focus:ring-violet-500/50 transition-all placeholder:text-slate-300"
                    value={profile.first_name} 
                    onChange={e => handleChange('first_name', e.target.value)} 
                />
            </div>
            <div className="relative group">
                <input 
                    type="text" 
                    placeholder="Last Name" 
                    className="glass-input w-full px-4 py-2.5 text-sm rounded-xl focus:ring-2 focus:ring-violet-500/50 transition-all placeholder:text-slate-300"
                    value={profile.last_name} 
                    onChange={e => handleChange('last_name', e.target.value)} 
                />
            </div>
            <div className="relative group">
                <Mail className={`absolute left-3 top-3 w-4 h-4 transition-colors ${profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email) ? 'text-red-500' : 'text-slate-400 group-focus-within:text-violet-500'}`} />
                <input 
                    type="email" 
                    placeholder="Email" 
                    className={`glass-input w-full pl-10 pr-3 py-2.5 text-sm rounded-xl focus:ring-2 transition-all placeholder:text-slate-300 ${profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email) ? 'border-red-500 focus:ring-red-500/20' : 'focus:ring-violet-500/50'}`}
                    value={profile.email} 
                    onChange={e => handleChange('email', e.target.value)} 
                />
            </div>
            <div className="relative group">
                <Phone className={`absolute left-3 top-3 w-4 h-4 transition-colors ${profile.phone && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(profile.phone) ? 'text-red-500' : 'text-slate-400 group-focus-within:text-violet-500'}`} />
                <input 
                    type="tel" 
                    placeholder="Phone" 
                    className={`glass-input w-full pl-10 pr-3 py-2.5 text-sm rounded-xl focus:ring-2 transition-all placeholder:text-slate-300 ${profile.phone && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(profile.phone) ? 'border-red-500 focus:ring-red-500/20' : 'focus:ring-violet-500/50'}`}
                    value={profile.phone} 
                    onChange={e => handleChange('phone', e.target.value)} 
                />
            </div>
        </div>

        <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                <FileText className="w-3 h-3" /> Base Resume Text
            </label>
            <textarea 
                className="glass-input w-full rounded-xl p-4 h-32 text-sm focus:ring-2 focus:ring-violet-500/50 transition-all placeholder:text-slate-300 resize-none font-mono text-xs leading-relaxed"
                placeholder="Paste your full resume text here..."
                value={resumeText} 
                onChange={(e) => setResumeText(e.target.value)}
            />
        </div>
    </div>
  );
};
