// src/pages/FAQ.jsx
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqData = [
  {
    category: "Compte",
    faqs: [
        {
      question: "Comment créer un compte ?",
      answer: `Pour créer un compte, cliquez sur le bouton "S'inscrire" en haut à droite de la page d'accueil. 
      Remplissez vos informations personnelles : nom, prénom, email et mot de passe. 
      Une fois le formulaire soumis, vous recevrez un email de confirmation. 
      Vous pourrez ensuite vous connecter avec vos identifiants.`
    },
      {
        question: "Comment me connecter à mon compte ?",
        answer: `Cliquez sur "Connexion", entrez votre email et mot de passe, puis cliquez sur "Se connecter".`
      },
      {
        question: "Comment supprimer mon compte ?",
        answer: `Dans votre profil, cliquez sur "Supprimer ce compte". Cette action est irréversible.`
      },
    ],
  },
  {
    category: "CV",
    faqs: [
      {
        question: "Comment créer et remplir mon CV ?",
        answer: `Après vous être connecté, cliquez sur "Créer un CV". Vous aurez accès à un formulaire dynamique 
      qui vous permettra de saisir toutes vos informations : données personnelles, expériences professionnelles, 
      formations, compétences et langues. Chaque section peut être modifiée à tout moment.`
    },
    {
      question: "Puis-je modifier mon CV après l'avoir enregistré ?",
      answer: `Oui, tous vos CV sont sauvegardés dans votre compte. Pour modifier un CV existant, 
      rendez-vous dans la section "Mes CV", sélectionnez le CV voulu et cliquez sur "Modifier". 
      Les changements sont sauvegardés automatiquement.`
    },
      {
        question: "Comment choisir le modèle et prévisualiser mon CV ?",
        answer: `Sélectionnez la police et les couleurs. L’aperçu en temps réel vous permet de vérifier le rendu avant téléchargement.`
      },
      {
        question: "Comment exporter mon CV ?",
        answer: `Cliquez sur "Télécharger" et choisissez le format PDF recommandé. Vérifiez la mise en page avant l’export.`
      },
    ],
  },
  {
    category: "IA et Analyse",
    faqs: [
      {
        question: "Comment utiliser l'analyse IA du CV ?",
        answer: `Cliquez sur "Analyser mon CV". L'IA fournit un rapport détaillé incluant points forts, points faibles, suggestions d'amélioration et score global.`
      },
      {
      question: "Comment l'IA analyse-t-elle mon CV ?",
      answer: `Notre IA vérifie votre CV pour s'assurer qu'il est compatible avec les systèmes ATS. 
      Elle détecte les erreurs de structure, les mots-clés manquants, et vous fournit des conseils pour améliorer 
      la lisibilité et la pertinence de votre contenu.`
    },
    ],
    
  },
  {
    category: "Autres",
    faqs: [
        {
      question: "Est-ce que mes données sont sécurisées ?",
      answer: `Oui, toutes vos informations sont stockées de manière sécurisée. Nous respectons le RGPD et aucune donnée 
      sensible n'est envoyée sans anonymisation. Vous pouvez supprimer votre compte à tout moment si vous le souhaitez.`
    },
    {
      question: "Puis-je utiliser l'application sur mobile ou tablette ?",
      answer: `Oui, l'application est responsive. Vous pouvez créer, modifier et exporter vos CV sur ordinateur, tablette ou mobile.`
    },
    {
      question: "Quels sont les prérequis pour utiliser l'application ?",
      answer: `Vous devez disposer d'une connexion internet stable et d'un navigateur moderne (Chrome, Firefox, Edge, Safari). 
      Aucun plugin ou installation supplémentaire n'est nécessaire.`
    },
    ],
    
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">Foire aux Questions (FAQ)</h1>
      <p className="text-center text-gray-600 mb-10">
        Retrouvez ici toutes les réponses aux questions les plus fréquentes sur l’utilisation de RéussirSonCV.
      </p>

      {faqData.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">{section.category}</h2>
          {section.faqs.map((faq, index) => {
            const uniqueIndex = `${sectionIndex}-${index}`;
            const isOpen = openIndex === uniqueIndex;
            return (
              <div
                key={uniqueIndex}
                className="border border-gray-300 rounded-lg mb-2 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(uniqueIndex)}
                  className="flex justify-between w-full p-4 text-left bg-gray-100 hover:bg-gray-200 transition-colors font-medium"
                >
                  {faq.question}
                  {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </button>
                {isOpen && (
                  <div className="p-4 bg-white border-t border-gray-200 animate-slideDown">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
