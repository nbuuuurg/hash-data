
import React from 'react';
import { CryptoOperation } from '../types';

interface ContextCardProps {
  activeTab: CryptoOperation;
}

// Fix: Removed invalid 'miscarriage' member from react import
const ContextCard: React.FC<ContextCardProps> = ({ activeTab }) => {
  const getContent = () => {
    switch (activeTab) {
      case CryptoOperation.GENERATE:
        return {
          title: "Pourquoi Générer ?",
          description: "La génération de chaînes aléatoires sécurisées est cruciale pour créer des identifiants imprévisibles.",
          points: [
            "Clés API uniques pour vos utilisateurs.",
            "Tokens de session temporaires.",
            "Secrets pour sécuriser vos endpoints API.",
            "Mots de passe temporaires."
          ],
          color: "bg-green-50 text-green-800 border-green-100"
        };
      case CryptoOperation.HASH:
        return {
          title: "Pourquoi Hasher ?",
          description: "Le hashage transforme une donnée en une empreinte unique et irréversible. C'est une fonction à sens unique.",
          points: [
            "Vérifier l'intégrité d'un fichier (checksum).",
            "Stocker des mots de passe sans les connaître.",
            "Identifier des doublons de données.",
            "Créer des signatures numériques simplifiées."
          ],
          color: "bg-blue-50 text-blue-800 border-blue-100"
        };
      case CryptoOperation.HMAC:
        return {
          title: "Pourquoi l'HMAC ?",
          description: "L'HMAC combine une fonction de hashage avec une clé secrète partagée pour garantir l'origine et l'intégrité.",
          points: [
            "Vérifier qu'un webhook Stripe ou GitHub vient bien d'eux.",
            "Signer des requêtes API vers AWS ou Binance.",
            "Empêcher la modification de paramètres d'URL.",
            "Authentification légère sans infrastructure PKI."
          ],
          color: "bg-purple-50 text-purple-800 border-purple-100"
        };
      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  return (
    <div className={`p-6 rounded-xl border shadow-sm transition-all duration-300 ${content.color}`}>
      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-1.003l-.547-.547z" />
        </svg>
        {content.title}
      </h3>
      <p className="text-sm opacity-90 leading-relaxed mb-4">
        {content.description}
      </p>
      <ul className="space-y-2">
        {content.points.map((point, idx) => (
          <li key={idx} className="text-xs flex items-start gap-2">
            <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextCard;
