# ✅ RéussirSonCV – Générateur de CV intelligent et compatible ATS

**Auteur** : Mohamed Maghzaoui  
**Formation** : Certification Concepteur Développeur d'Applications – École Hexagone  
**Projet individuel**

## 🎯 Objectif du projet

RéussirSonCV est une application web permettant de générer facilement un CV professionnel, moderne et compatible ATS (Applicant Tracking Systems).  
Ce projet vise à aider les étudiants, demandeurs d’emploi ou professionnels en reconversion à créer des CV de qualité sans compétences en design.

## 🔧 Fonctionnalités principales

- Création de compte et authentification  
- Formulaire dynamique pour remplir les sections du CV  
- Choix de templates modernes et responsives  
- Aperçu en temps réel du CV  
- Génération du CV au format PDF  
- Sauvegarde et modification de plusieurs versions  
- Analyse IA du contenu pour détecter les erreurs de structure ou de mots-clés  
- Interface responsive (PC, tablette, mobile)

## 🛠️ Technologies utilisées

Frontend :
- React.js avec Vite
- Tailwind CSS
- React-PDF ou jsPDF pour l’export PDF

Backend :
- Django
- Django REST Framework (DRF)
- Appels IA via l’API OpenAI ou Gemini

Base de données :
- MySQL 

Autres outils :
- Git + GitHub
- GitHub Actions (CI/CD)
- Trello (gestion de projet)
- Figma (maquettes responsives)

## 🚀 Lancer le projet en local

1. Cloner le dépôt :
```bash
git clone https://github.com/mohamedmaghzaoui/ReussirSonCV.git  
cd ReussirSonCV
```

2. Installation du backend Django :
```bash
cd backend  
python -m venv env
```

Activer l’environnement :
```bash
- Sous Windows : env\Scripts\activate  
- Sous macOS / Linux : source env/bin/activate
```
Installer les dépendances :
```bash
pip install -r requirements.txt
```

Appliquer les migrations :
```bash
python manage.py migrate
```

Lancer le serveur Django :
```bash
python manage.py runserver
```

Le backend sera accessible sur : http://127.0.0.1:8000/

3. Installation du frontend React (Vite) :
```bash
cd ../frontend  
npm install  
npm run dev
```

Le frontend sera accessible sur : http://localhost:5173/

## 🤖 Analyse IA du CV

Le backend effectue un appel à l'API OpenAI ou Gemini pour analyser le contenu du CV (structure, mots-clés, lisibilité).  
Les données sont anonymisées avant envoi afin de respecter le RGPD.

## 📄 Export PDF

L’utilisateur peut générer un PDF fidèle au template choisi, compatible avec les systèmes ATS.

## 🔐 Sécurité et accessibilité

- Données validées côté client et serveur  
- Authentification sécurisée  
- Gestion des rôles  
- Interface accessible sur tous les appareils

## 🐳 DevOps & Tests

### Dockerisation :

Backend  conteneurisé pour simplifier le déploiement

Exemple de docker-compose.yml pour lancer l’ensemble du projet facilement

### Tests :

Tests unitaires Django avec pytest-django

Tests de composants React avec Jest et React Testing Library

### CI/CD :

GitHub Actions pour automatiser les tests et le déploiement

Build Docker et push vers un registre privé ou Docker Hub
## 💡 Améliorations futures

- Éditeur drag-and-drop  
- Pré-remplissage automatique depuis LinkedIn  
- Score ATS avec recommandations automatiques

## 📫 Contact

Mohamed Maghzaoui  
Site : https://mohamedmaghzaoui.online  
GitHub : https://github.com/mohamedmaghzaoui
linkedin : https://www.linkedin.com/in/mohamed-maghzaoui-577044256/

## 📜 Licence

Projet réalisé dans le cadre de la formation bachelor informatique – École Hexagone.  
Usage pédagogique uniquement.
