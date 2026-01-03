
import React from 'react';
import { CryptoOperation } from '../types';

interface HeaderProps {
  activeTab: CryptoOperation;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, toggleSidebar }) => {
  const getTitle = () => {
    switch (activeTab) {
      case CryptoOperation.GENERATE: return "Generate Randomness";
      case CryptoOperation.HASH: return "Data Hashing";
      case CryptoOperation.HMAC: return "HMAC Signature";
      case CryptoOperation.NOTES: return "Documentation & Notes";
      case CryptoOperation.PRIVACY: return "Privacy Policy";
      case CryptoOperation.LEGAL: return "Mentions Légales";
      default: return "Crypto Explorer";
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 sticky top-0 z-10 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-tight">{getTitle()}</h1>
            <p className="hidden xs:block text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-semibold mt-0.5">HashMesDonnées</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
          <span className="hidden sm:inline">HashMesDonnées</span>
          <span className="sm:hidden">HMD</span>
        </span>
      </div>
    </header>
  );
};

export default Header;