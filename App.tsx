
import React, { useState } from 'react';
import { CryptoOperation, CryptoResult } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import GeneratePanel from './components/GeneratePanel';
import HashPanel from './components/HashPanel';
import HmacPanel from './components/HmacPanel';
import NotesPanel from './components/NotesPanel';
import PrivacyPanel from './components/PrivacyPanel';
import LegalPanel from './components/LegalPanel';
import ResultCard from './components/ResultCard';
import ContextCard from './components/ContextCard';
import CookieBanner from './components/CookieBanner';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CryptoOperation>(CryptoOperation.GENERATE);
  const [lastResult, setLastResult] = useState<CryptoResult | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleResult = (result: CryptoResult) => {
    setLastResult(result);
  };

  const renderPanel = () => {
    switch (activeTab) {
      case CryptoOperation.GENERATE:
        return <GeneratePanel onResult={handleResult} />;
      case CryptoOperation.HASH:
        return <HashPanel onResult={handleResult} />;
      case CryptoOperation.HMAC:
        return <HmacPanel onResult={handleResult} />;
      case CryptoOperation.NOTES:
        return <NotesPanel />;
      case CryptoOperation.PRIVACY:
        return <PrivacyPanel />;
      case CryptoOperation.LEGAL:
        return <LegalPanel />;
      default:
        return null;
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const isFullWidthPanel = activeTab === CryptoOperation.NOTES || activeTab === CryptoOperation.PRIVACY || activeTab === CryptoOperation.LEGAL;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          closeSidebar();
        }} 
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header activeTab={activeTab} toggleSidebar={toggleSidebar} />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              <div className={isFullWidthPanel ? "lg:col-span-12" : "lg:col-span-7 space-y-6"}>
                {renderPanel()}
                
                {!isFullWidthPanel && lastResult && (
                  <div className="lg:hidden">
                    <ResultCard result={lastResult} />
                  </div>
                )}
              </div>
              
              {!isFullWidthPanel && (
                <div className="lg:col-span-5 space-y-6">
                  <ContextCard activeTab={activeTab} />
                  
                  <div className="hidden lg:block">
                    {lastResult && <ResultCard result={lastResult} />}
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Moteur de Calcul
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      Cette application utilise la <strong>Web Crypto API</strong> native de votre navigateur. 
                      Tous les calculs sont effectués localement, garantissant une confidentialité totale.
                    </p>
                    <div className="p-3 bg-indigo-50 rounded-lg text-xs text-indigo-700 font-medium">
                      💡 Sécurité : Aucune donnée ne quitte votre appareil.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <CookieBanner />

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};

export default App;