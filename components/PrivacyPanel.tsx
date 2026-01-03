
import React from 'react';

const PrivacyPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Politique de Confidentialité</h2>
          <p className="text-slate-600 leading-relaxed">
            Chez <strong>HashMesDonnées</strong>, la protection de votre vie privée n'est pas une option, c'est le fondement même de notre outil.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="space-y-3">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              Zéro Collecte de Données
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Nous ne collectons, ne stockons et ne transmettons aucune donnée personnelle. Aucune adresse IP n'est enregistrée, aucun identifiant unique n'est créé.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              Calculs 100% Locaux
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tous les calculs cryptographiques (Génération, Hash, HMAC) sont effectués exclusivement dans votre navigateur via la <strong>Web Crypto API</strong>. Vos secrets ne quittent jamais votre machine.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              Cookies & Traceurs
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ce site n'utilise aucun cookie publicitaire ou de tracking tiers (Google Analytics, etc.). Le seul cookie technique utilisé sert à mémoriser votre choix de consentement.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              Conformité RGPD
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Conformément au RGPD, vous disposez d'un droit total à l'oubli, d'autant plus simple que nous ne savons pas qui vous êtes. L'utilisation du site est anonyme par défaut.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-lg flex items-start gap-3">
            <svg className="w-5 h-5 text-indigo-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-slate-500 italic">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}. Pour toute question relative à la sécurité, consultez notre documentation technique.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPanel;