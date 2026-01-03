import React, { useState } from 'react';
import { CryptoResult } from '../types';

interface ResultCardProps {
  result: CryptoResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-4 bg-slate-800/50 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Operation Result</h3>
        <span className="text-[10px] font-mono text-slate-500">{new Date(result.timestamp).toLocaleTimeString()}</span>
      </div>
      
      <div className="p-5 md:p-6 space-y-6">
        <div className="relative group">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase">Output</label>
            <button 
              onClick={copyToClipboard}
              className="p-1.5 bg-white/5 hover:bg-white/10 rounded-md transition-colors flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-white"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="bg-slate-950 p-4 rounded-lg border border-white/5 font-mono text-sm text-blue-400 break-all leading-relaxed min-h-[80px]">
            {result.output}
          </div>
        </div>

        {result.header && (
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Example Header</label>
            <div className="bg-slate-800/50 p-3 rounded-lg border border-white/5 font-mono text-xs text-slate-300 break-all">
              {result.header}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-white/5">
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Metadata (JSON)</label>
          <pre className="text-[10px] font-mono text-slate-400 bg-slate-950 p-3 rounded-lg overflow-x-auto max-h-40 scrollbar-thin scrollbar-thumb-slate-800">
            {JSON.stringify(result.details, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;