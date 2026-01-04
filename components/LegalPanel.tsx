
import React from 'react';

const LegalPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Mentions Légales</h2>
          <p className="text-slate-600 leading-relaxed">
            L'utilisation du site <strong>HashMesDonnées</strong> implique l'acceptation pleine et entière des conditions générales d'utilisation ci-après décrites.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="space-y-3">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              Édition du site
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Le présent site est édité par <strong>NovApps</strong>, agissant en tant qu'outil pédagogique et technique gratuit.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              Hébergement
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Le site est hébergé par Netlify, Inc., société de droit américain, dont le siège social est situé au 2325 3rd Street, Suite 215, San Francisco, CA 94107, États-Unis. Netlify fournit des infrastructures cloud sécurisées garantissant la disponibilité du service. Aucune donnée saisie par l’utilisateur n’est stockée sur les serveurs de l’hébergeur.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              Propriété Intellectuelle
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              L'architecture, les textes, les graphismes et le logo sont la propriété de <strong>HashMesDonnées</strong>. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site est interdite sans autorisation préalable.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Le code source du site est accessible publiquement sur GitHub : 
              <a href="https://github.com/nbuuuurg/hash-data/" target="_blank" rel="noopener noreferrer" className="underline"> https://github.com/nbuuuurg/hash-data/</a>.
              Le site a été conçu et développé à l’aide de Google AI Studio.
              Toute personne est libre d’utiliser, modifier et redistribuer le code conformément aux termes de la licence.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              Responsabilité
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>HashMesDonnées</strong> s'efforce de fournir des informations précises. Toutefois, l'outil est fourni "tel quel" à des fins de test et de démonstration. L'éditeur ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-lg flex items-start gap-3">
            <svg className="w-5 h-5 text-indigo-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            <p className="text-xs text-slate-500 italic">
              Le but de cet outil est strictement éducatif et utilitaire pour les développeurs et administrateurs système.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPanel;