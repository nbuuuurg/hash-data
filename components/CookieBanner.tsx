
import React, { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('hashmesdonnees-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (accepted: boolean) => {
    localStorage.setItem('hashmesdonnees-cookie-consent', accepted ? 'accepted' : 'refused');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-md z-50 animate-in slide-in-from-bottom-8 duration-700">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col gap-4 shadow-indigo-500/10">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">Respect de la vie privée</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nous utilisons uniquement des cookies techniques essentiels. Aucune donnée personnelle n'est collectée ou partagée par <strong>HashMesDonnées</strong>.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 pt-2">
          <button 
            onClick={() => handleChoice(true)}
            className="flex-1 bg-slate-900 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
          >
            Accepter
          </button>
          <button 
            onClick={() => handleChoice(false)}
            className="flex-1 bg-slate-50 text-slate-600 text-xs font-bold py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;