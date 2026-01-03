
import React, { useState } from 'react';
import { CryptoResult, Encoding } from '../types';
import { cryptoService } from '../services/cryptoService';

interface Props {
  onResult: (res: CryptoResult) => void;
}

const GeneratePanel: React.FC<Props> = ({ onResult }) => {
  const [length, setLength] = useState(32);
  const [encoding, setEncoding] = useState<Encoding>('hex');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await cryptoService.generateRandom(length, encoding);
      onResult(res);
    } catch (e) {
      console.error(e);
      setError("Échec de la génération aléatoire. Votre navigateur ne supporte peut-être pas cette fonctionnalité.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-800">Générer un Token Sécurisé</h2>
        <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-md">Action: Generate</span>
      </div>
      
      <div className="p-6 space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Longueur (en octets) : <span className="text-blue-600 font-mono font-bold">{length}</span>
          </label>
          <input 
            type="range" 
            min="8" max="128" 
            value={length} 
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tighter">
            <span>8 octets</span>
            <span>64 octets</span>
            <span>128 octets</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Format de sortie</label>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setEncoding('hex')}
              className={`py-2.5 px-4 rounded-xl border-2 text-sm font-bold transition-all ${encoding === 'hex' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-100 hover:border-slate-300 bg-slate-50'}`}
            >
              HEX
            </button>
            <button 
              onClick={() => setEncoding('base64')}
              className={`py-2.5 px-4 rounded-xl border-2 text-sm font-bold transition-all ${encoding === 'base64' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-100 hover:border-slate-300 bg-slate-50'}`}
            >
              BASE64
            </button>
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 active:scale-[0.98]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Génération...
            </span>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Générer le Token
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GeneratePanel;
