
# HashMesDonnées

Un outil pour hasher des données, générer des tokens et des signatures API (HMAC). C'est un outil pédagogique et utilitaire modeste pour tester, comparer et comprendre les fonctions cryptographiques.

## Fonctionnalités

- **Génération Aléatoire** : Création de tokens sécurisés (Hex/Base64).
- **Hachage (Hashing)** : SHA-256, SHA-512, SHA-384 et SHA-1.
- **HMAC (Signature)** : Authentification de messages avec clé secrète.
- **Calculs Locaux** : Utilisation de la Web Crypto API (aucune donnée ne quitte le navigateur).
- **Pédagogie** : Documentation intégrée sur les concepts de base de la cryptographie.

## Installation Locale

1. Clonez le dépôt :
```bash
git clone https://github.com/nbuuuurg/hash-data
cd hash-mes-donnees
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

## Technologies

- **React 19**
- **Vite** (Build tool)
- **Tailwind CSS** (Styling)
- **TypeScript**
- **Web Crypto API** (Moteur de calcul)

## Réalisation

Ce projet a été conçu comme une **mini-app expérimentale**, montrant qu’il est possible de prototyper rapidement des outils utiles ou pédagogiques **sans forcément les déployer**. Des plateformes comme **Google AI Studio**, **Base44** ou encore **Lovable** permettent d’itérer, tester des idées et apprendre en construisant, même pour de petits projets locaux ou exploratoires.

Réalisé avec Google AI Studio par @nbuuuurg.
