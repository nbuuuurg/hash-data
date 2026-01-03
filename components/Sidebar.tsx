
import React from 'react';
import { CryptoOperation } from '../types';

interface SidebarProps {
  activeTab: CryptoOperation;
  setActiveTab: (tab: CryptoOperation) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const menuItems = [
    { id: CryptoOperation.GENERATE, label: 'Generate', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { id: CryptoOperation.HASH, label: 'Hash', icon: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14' },
    { id: CryptoOperation.HMAC, label: 'HMAC', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { id: CryptoOperation.NOTES, label: 'Notes', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  ];

  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-30
      w-64 bg-slate-900 text-slate-300 flex flex-col
      transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="py-8 px-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center">
          <img 
            src="/logo_hashmesdonnees-sansfond.png" 
            alt="HashMesDonnées" 
            className="h-16 w-auto object-contain"
            onError={(e) => {
               // Fallback si l'image locale n'est pas trouvée
               e.currentTarget.style.display = 'none';
               const fallbackText = document.createElement('div');
               fallbackText.className = 'text-white font-bold text-lg tracking-tight';
               fallbackText.innerText = 'HashMesDonnées';
               e.currentTarget.parentElement?.appendChild(fallbackText);
            }}
          />
        </div>
        <button 
          onClick={onClose}
          className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === item.id 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
              : 'hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {item.label}
          </button>
        ))}
        
        <div className="pt-4 mt-4 border-t border-white/5 flex flex-col gap-1">
          <button
            onClick={() => setActiveTab(CryptoOperation.PRIVACY)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all ${
              activeTab === CryptoOperation.PRIVACY 
              ? 'bg-white/10 text-white' 
              : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Confidentialité
          </button>
          
          <button
            onClick={() => setActiveTab(CryptoOperation.LEGAL)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all ${
              activeTab === CryptoOperation.LEGAL 
              ? 'bg-white/10 text-white' 
              : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Mentions Légales
          </button>
        </div>
      </nav>

      <div className="p-4 bg-slate-800/50 m-4 rounded-xl border border-white/5">
        <div className="text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-wider">Engine Status</div>
        <div className="flex items-center gap-2 text-xs font-medium">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          Local JS Engine
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
