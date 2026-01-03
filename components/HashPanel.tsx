
import React, { useState } from 'react';
import { CryptoResult, Encoding } from '../types';
import { cryptoService } from '../services/cryptoService';

interface Props {
  onResult: (res: CryptoResult) => void;
}

const HashPanel: React.FC<Props> = ({ onResult }) => {
  const [text, setText] = useState('');
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [encoding, setEncoding] = useState<Encoding>('hex');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleHash = async () => {
    if (!text.trim()) {
      setError("Veuillez entrer du texte à hacher.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const res = await cryptoService.hash(text, algorithm, encoding);
      onResult(res);
    } catch (e) {
      console.error(e);
      setError("Échec du hachage. L'algorithme sélectionné n'est peut-être pas supporté par votre navigateur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-800">Hachage de données</h2>
        <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-md">Action: Hash</span>
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
          <label className="block text-sm font-semibold text-slate-700 mb-2">Payload (Texte)</label>
          <textarea 
            value={text}
            onChange={(e) => { setText(e.target.value); setError(null); }}
            placeholder="Entrez le texte à transformer en empreinte..."
            className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm mono transition-all bg-slate-50/30"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Algorithme</label>
            <select 
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="SHA-256">SHA-256</option>
              <option value="SHA-512">SHA-512</option>
              <option value="SHA-384">SHA-384</option>
              <option value="SHA-1">SHA-1 (Obsolète)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Encodage</label>
            <select 
              value={encoding}
              onChange={(e) => setEncoding(e.target.value as Encoding)}
              className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="hex">Hexadécimal</option>
              <option value="base64">Base64</option>
            </select>
          </div>
        </div>

        <button 
          onClick={handleHash}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 active:scale-[0.98]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calcul...
            </span>
          ) : 'Calculer l\'Empreinte'}
        </button>
      </div>
    </div>
  );
};

export default HashPanel;
