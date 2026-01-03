
import React, { useState, useEffect } from 'react';
import { cryptoService } from '../services/cryptoService';

const NotesPanel: React.FC = () => {
  const [testInput, setTestInput] = useState('HashMesDonnées');
  const [hashes, setHashes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateHashes = async () => {
      const algos = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
      const results: Record<string, string> = {};
      for (const algo of algos) {
        try {
          const res = await cryptoService.hash(testInput, algo, 'hex');
          results[algo] = res.output;
        } catch (e) {
          results[algo] = 'Non supporté';
        }
      }
      setHashes(results);
    };
    updateHashes();
  }, [testInput]);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Introduction */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
           <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z"/>
           </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Introduction à la Cryptographie</h2>
        <p className="text-slate-600 leading-relaxed max-w-2xl relative z-10">
          La cryptographie est la science du secret. Cette page explore les mécanismes fondamentaux utilisés pour garantir l'intégrité, l'authenticité et la confidentialité des données modernes.
        </p>
      </section>

      {/* Concept Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { color: 'green', title: 'Generate', desc: "Crée de l'entropie pure. Idéal pour des secrets, des identifiants imprévisibles ou des tokens de session.", icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
          { color: 'blue', title: 'Hashing', desc: "Empreinte numérique unique. Utilisé pour vérifier l'intégrité : toute modification de l'entrée change radicalement la sortie.", icon: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14' },
          { color: 'purple', title: 'HMAC', desc: "Hashage avec clé secrète. Garantit l'authenticité : prouve que le message vient d'un émetteur connu et n'a pas été altéré.", icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
        ].map(item => (
          <div key={item.title} className={`bg-${item.color}-50 rounded-xl p-6 border border-${item.color}-100 hover:shadow-md transition-all group`}>
            <div className={`w-12 h-12 bg-${item.color}-100 rounded-xl flex items-center justify-center text-${item.color}-600 mb-4 group-hover:scale-110 transition-transform`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
            </div>
            <h3 className={`font-bold text-${item.color}-900 mb-2`}>{item.title}</h3>
            <p className={`text-sm text-${item.color}-800/80 leading-relaxed`}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* HEX Encoding Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-1 bg-blue-600 text-white text-[10px] font-bold rounded uppercase">Encodage</span>
            <h3 className="font-bold text-slate-900">HEX (Hexadécimal)</h3>
          </div>
          <p className="text-xs text-slate-500">Représentation textuelle de données binaires, caractère par caractère.</p>
        </div>
        
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed">
              Le format HEX décompose chaque octet (8 bits) en deux groupes de 4 bits (<strong>nibbles</strong>). Chaque nibble est un caractère de <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600">0-9</code> ou <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600">a-f</code>.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <div className="text-[10px] font-bold text-blue-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2"/></svg>
                 Exemple
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Texte</span>
                  <div className="font-mono text-sm font-bold text-slate-800">"Key"</div>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Sortie Hex</span>
                  <div className="font-mono text-sm font-bold text-blue-600 tracking-widest">4b 65 79</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-center justify-center">
            <svg viewBox="0 0 300 160" className="w-full max-w-[280px]">
              <rect x="75" y="10" width="150" height="40" rx="8" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2"/>
              <text x="150" y="35" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">1 OCTET (8 bits)</text>
              <path d="M110 50 L80 100" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" fill="none"/>
              <path d="M190 50 L220 100" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" fill="none"/>
              <rect x="40" y="100" width="80" height="30" rx="6" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5"/>
              <text x="80" y="120" textAnchor="middle" fontSize="11" fontWeight="semibold" fill="#1D4ED8">4 bits</text>
              <rect x="180" y="100" width="80" height="30" rx="6" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5"/>
              <text x="220" y="120" textAnchor="middle" fontSize="11" fontWeight="semibold" fill="#1D4ED8">4 bits</text>
              <text x="80" y="150" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#2563EB" className="mono">0-F</text>
              <text x="220" y="150" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#2563EB" className="mono">0-F</text>
            </svg>
          </div>
        </div>
      </section>

      {/* BASE64 Encoding Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-1 bg-purple-600 text-white text-[10px] font-bold rounded uppercase">Encodage</span>
            <h3 className="font-bold text-slate-900">BASE64</h3>
          </div>
          <p className="text-xs text-slate-500">Un format efficace pour transporter des données binaires sur des canaux textuels.</p>
        </div>
        
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-center justify-center">
            <svg viewBox="0 0 320 160" className="w-full max-w-[300px]">
              <rect x="70" y="10" width="180" height="40" rx="8" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2"/>
              <text x="160" y="35" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">3 OCTETS (24 bits)</text>
              <path d="M100 50 L55 100" stroke="#DDD6FE" strokeWidth="1.5" strokeDasharray="4 2" fill="none"/>
              <path d="M140 50 L125 100" stroke="#DDD6FE" strokeWidth="1.5" strokeDasharray="4 2" fill="none"/>
              <path d="M180 50 L195 100" stroke="#DDD6FE" strokeWidth="1.5" strokeDasharray="4 2" fill="none"/>
              <path d="M220 50 L265 100" stroke="#DDD6FE" strokeWidth="1.5" strokeDasharray="4 2" fill="none"/>
              <rect x="35" y="100" width="45" height="25" rx="4" fill="#FAF5FF" stroke="#8B5CF6" strokeWidth="1"/>
              <rect x="105" y="100" width="45" height="25" rx="4" fill="#FAF5FF" stroke="#8B5CF6" strokeWidth="1"/>
              <rect x="165" y="100" width="45" height="25" rx="4" fill="#FAF5FF" stroke="#8B5CF6" strokeWidth="1"/>
              <rect x="235" y="100" width="45" height="25" rx="4" fill="#FAF5FF" stroke="#8B5CF6" strokeWidth="1"/>
              <text x="160" y="85" textAnchor="middle" fontSize="10" fill="#7C3AED" fontWeight="semibold">Segments de 6 bits</text>
              <text x="57.5" y="145" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7C3AED" className="mono">A-z</text>
              <text x="127.5" y="145" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7C3AED" className="mono">0-9</text>
              <text x="197.5" y="145" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7C3AED" className="mono">+</text>
              <text x="267.5" y="145" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7C3AED" className="mono">/</text>
            </svg>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed">
              Le format BASE64 divise 24 bits en 4 segments de 6 bits. Si les données ne sont pas un multiple de 3 octets, des caractères de <strong>padding</strong> (<code className="bg-slate-100 px-1 text-purple-600 font-bold">=</code>) sont ajoutés à la fin pour compléter le bloc.
            </p>
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
              <div className="text-[10px] font-bold text-purple-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2"/></svg>
                 Application Directe
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Texte</span>
                  <div className="font-mono text-sm font-bold text-slate-800">"Key"</div>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Sortie Base64</span>
                  <div className="font-mono text-sm font-bold text-purple-600 tracking-widest">S2V5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Algorithms - INTERACTIVE SECTION */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900">Comparateur de Hachage</h3>
            <p className="text-xs text-slate-500">Observez l'effet avalanche : une modification mineure change radicalement le hash.</p>
          </div>
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <input 
              type="text" 
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Testez une modification..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>
        
        <div className="p-8 space-y-4 bg-slate-50/30">
          {/* Fix: Explicitly cast Object.entries result to string array to avoid 'unknown' type error */}
          {(Object.entries(hashes) as [string, string][]).map(([algo, value]) => (
            <div key={algo} className="group relative">
              <div className="flex flex-col md:flex-row gap-4 md:items-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
                <div className="w-full md:w-40 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${algo === 'SHA-1' ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700'}`}>
                      {algo}
                    </span>
                    {algo === 'SHA-1' && <span className="text-[9px] font-bold text-red-500 uppercase tracking-tighter">⚠️ Vulnérable</span>}
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                    {value.length / 2} OCTETS / {value.length * 4} BITS
                  </div>
                </div>
                <div className="flex-1 bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-indigo-400 break-all leading-relaxed shadow-inner border border-white/5 group-hover:text-indigo-300 transition-colors">
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 bg-white">
           {[
             { name: 'SHA-256', type: 'Standard', color: 'green', desc: 'Le standard actuel. Très résistant, utilisé pour TLS (HTTPS) et la blockchain.', bits: 256 },
             { name: 'SHA-512', type: 'Haute Sécurité', color: 'blue', desc: 'Plus long et complexe, particulièrement efficace sur les architectures 64 bits.', bits: 512 }
           ].map(algo => (
             <div key={algo.name} className="space-y-4">
               <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-${algo.color}-500 shadow-sm`}></div>
                  <h4 className="font-bold text-sm text-slate-800">{algo.name}</h4>
               </div>
               <p className="text-xs text-slate-500 leading-relaxed italic">{algo.desc}</p>
               <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex items-center justify-center">
                  <svg viewBox="0 0 240 80" className="w-full max-w-[220px]">
                    <rect x="10" y="25" width="45" height="30" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5"/>
                    <text x="32.5" y="44" textAnchor="middle" fontSize="9" fill="#94A3B8" fontWeight="600">Entrée</text>
                    <path d="M55 40 L85 40" stroke="#CBD5E1" strokeWidth="2" markerEnd={`url(#arrow-${algo.color})`}/>
                    <rect x="85" y="15" width="70" height="50" rx="10" fill={`#F${algo.color === 'green' ? '0FDF4' : '5F3FF'}`} stroke={algo.color === 'green' ? '#10B981' : '#3B82F6'} strokeWidth="2.5"/>
                    <text x="120" y="38" textAnchor="middle" fontSize="10" fontWeight="bold" fill={algo.color === 'green' ? '#065F46' : '#1E40AF'}>{algo.name}</text>
                    <text x="120" y="52" textAnchor="middle" fontSize="8" fill={algo.color === 'green' ? '#10B981' : '#3B82F6'} fontWeight="bold">{algo.bits} bits</text>
                    <path d="M155 40 L185 40" stroke="#CBD5E1" strokeWidth="2" markerEnd={`url(#arrow-${algo.color})`}/>
                    <rect x="185" y="25" width="45" height="30" rx="4" fill={algo.color === 'green' ? '#10B981' : '#3B82F6'} stroke="none"/>
                    <text x="207.5" y="44" textAnchor="middle" fontSize="9" fill="#FFFFFF" fontWeight="bold">Hash</text>
                    <defs>
                      <marker id={`arrow-${algo.color}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orientation="auto">
                        <path d="M0,0 L0,6 L6,3 z" fill="#CBD5E1" />
                      </marker>
                    </defs>
                  </svg>
               </div>
             </div>
           ))}
        </div>
      </section>

      {/* HTTP vs HTTPS section */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-8 p-8 space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
               </div>
               <h3 className="text-xl font-bold text-slate-900">HTTP vs HTTPS : Sécurité du Transport</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-3">
                 <div className="flex items-center gap-2 text-red-600 font-bold text-sm uppercase tracking-wider">
                   <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                   HTTP (Données en clair)
                 </div>
                 <p className="text-sm text-slate-600 leading-relaxed">
                   Les données circulent sans protection. Un attaquant sur le réseau peut lire vos secrets.
                 </p>
                 <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-[10px] font-mono text-red-800">
                    Password: secret_123 <span className="text-red-500 font-bold">← VISIBLE</span>
                 </div>
               </div>
               <div className="space-y-3">
                 <div className="flex items-center gap-2 text-green-600 font-bold text-sm uppercase tracking-wider">
                   <div className="w-2 h-2 rounded-full bg-green-600"></div>
                   HTTPS (Données chiffrées)
                 </div>
                 <p className="text-sm text-slate-600 leading-relaxed">
                   Ajoute une couche de chiffrement TLS. Les données sont illisibles pendant le transport.
                 </p>
                 <div className="bg-green-50 p-3 rounded-lg border border-green-100 text-[10px] font-mono text-green-800">
                    Data: <span className="font-bold text-green-600">x7!a$9Lm#pQ...</span>
                 </div>
               </div>
            </div>
          </div>
          <div className="lg:col-span-4 bg-slate-50 border-l border-slate-100 p-8 flex flex-col justify-center items-center gap-4 text-center">
             <div>
                <h4 className="font-bold text-slate-800 text-sm">Attention au Code</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-2">
                  HTTPS protège le <strong>transport</strong>. Mais si le site est compromis (XSS), vos secrets peuvent être volés directement depuis votre navigateur, même en HTTPS.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-amber-50 border border-amber-200 p-8 rounded-2xl shadow-sm space-y-6">
          <h4 className="font-bold text-amber-900 text-xl flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Sécurité Critique
          </h4>
          <div className="space-y-4">
            <div>
              <h5 className="font-bold text-amber-800 text-xs mb-1 uppercase">1. Hachage de mots de passe</h5>
              <p className="text-xs text-amber-800/80 leading-relaxed">
                N'utilisez pas de hash simple (SHA-256). Utilisez des algorithmes lents et résistants par ordre de préférence : <strong>Argon2id</strong> (standard moderne), <strong>scrypt</strong>, ou <strong>bcrypt</strong>.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-amber-800 text-xs mb-1 uppercase">2. Le Sel (Salt) est obligatoire</h5>
              <p className="text-xs text-amber-800/80 leading-relaxed">
                Le "sel" est une chaîne aléatoire unique ajoutée à chaque mot de passe avant le hachage. Il neutralise les <strong>Rainbow Tables</strong> : des bases de données massives contenant des millions d'empreintes pré-calculées. Avec un sel unique par utilisateur, un attaquant devrait recalculer une table entière pour chaque sel, rendant l'attaque impraticable.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-amber-800 text-xs mb-1 uppercase">3. Génération côté client</h5>
              <p className="text-xs text-amber-800/80 leading-relaxed">
                Pratique pour des tests, mais en production, préférez générer vos secrets côté serveur dans un environnement isolé et contrôlé.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-slate-300 p-8 rounded-2xl shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xl flex items-center gap-2">L'Humilité face au Chiffre</h4>
            <p className="text-sm text-slate-400 leading-relaxed italic">
              "Don't roll your own crypto." — Une erreur d'implémentation (attaques par canaux auxiliaires/side-channel, sources d'entropie faibles) peut tout compromettre. Pour la production, utilisez des bibliothèques éprouvées.
            </p>
            <div className="pt-4 border-t border-white/5 space-y-2">
               <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Adieu Algorithmes Brisés</h5>
               <p className="text-xs text-red-400/80">SHA-1 et MD5 sont obsolètes. Ils ne doivent plus être utilisés pour la sécurité.</p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
             <span>© {new Date().getFullYear()} HashMesDonnées</span>
             <span>BUILDING A SECURE WEB</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotesPanel;
