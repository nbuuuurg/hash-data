
import React, { useState } from 'react';
import { CryptoResult, Encoding } from '../types';
import { cryptoService } from '../services/cryptoService';

interface Props {
  onResult: (res: CryptoResult) => void;
}

const HmacPanel: React.FC<Props> = ({ onResult }) => {
  const [payload, setPayload] = useState('{"orderId": 12345, "amount": 99.99}');
  const [secret, setSecret] = useState('sk_test_123456789');
  const [algorithm, setAlgorithm] = useState('SHA-256');
  const [encoding, setEncoding] = useState<Encoding>('hex');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSecretWeak = secret.length > 0 && secret.length < 32;

  const handleCompute = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await cryptoService.hmac(payload, secret, algorithm, encoding);
      onResult(res);
    } catch (e) {
      console.error(e);
      setError("Échec du calcul HMAC. Vérifiez vos paramètres ou essayez un autre algorithme.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-800">Signature API (HMAC)</h2>
        <span className="text-xs font-semibold px-2 py-1 bg-purple-100 text-purple-700 rounded-md">Action: HMAC</span>
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

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Payload (JSON ou Texte)</label>
            <textarea 
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              className="w-full h-24 p-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none text-sm mono bg-slate-50 transition-all"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-slate-700">Clé Secrète (Secret Key)</label>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSecretWeak ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                {secret.length} caractères
              </span>
            </div>
            <input 
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className={`w-full p-2.5 rounded-lg border focus:ring-2 outline-none text-sm mono transition-all ${isSecretWeak ? 'border-amber-300 focus:ring-amber-500' : 'border-slate-200 focus:ring-purple-500'}`}
              placeholder="Votre secret privé..."
            />
            {isSecretWeak && (
              <p className="mt-2 text-[11px] text-amber-600 flex items-start gap-1.5 leading-tight">
                <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Secret faible : Il est recommandé d'utiliser au moins 32 caractères (256 bits) pour une sécurité optimale.
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Algorithme</label>
            <select 
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm font-medium outline-none"
            >
              <option value="SHA-256">HMAC-SHA256</option>
              <option value="SHA-512">HMAC-SHA512</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Encodage</label>
            <select 
              value={encoding}
              onChange={(e) => setEncoding(e.target.value as Encoding)}
              className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm font-medium outline-none"
            >
              <option value="hex">Hex</option>
              <option value="base64">Base64</option>
            </select>
          </div>
        </div>

        <button 
          onClick={handleCompute}
          disabled={loading || !secret || !payload}
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calcul en cours...
            </span>
          ) : 'Générer HMAC'}
        </button>
      </div>
    </div>
  );
};

export default HmacPanel;
