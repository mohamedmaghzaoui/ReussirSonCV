export const PolitiqueConfidentialite = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-primary">Politique de confidentialité</h1>
      <p className="mb-4">
        Cette politique de confidentialité définit la manière dont ReussirSonCV utilise et protège les informations que vous transmettez en utilisant ce site.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Données collectées</h2>
      <p>Nous collectons uniquement les données nécessaires au fonctionnement du site :</p>
      <ul className="list-disc list-inside ml-4">
        <li>Nom, prénom, email lors de l'inscription</li>
        <li>Adresse IP à des fins de sécurité</li>
        <li>Cookies de session pour l’authentification</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Utilisation des données</h2>
      <p>Les données collectées sont utilisées pour :</p>
      <ul className="list-disc list-inside ml-4">
        <li>Créer et gérer votre compte</li>
        <li>Sécuriser l’accès au site</li>
        <li>Améliorer les services proposés</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Durée de conservation</h2>
      <p>Les données sont conservées aussi longtemps que nécessaire pour les finalités décrites ou jusqu’à la suppression de votre compte.</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Droits des utilisateurs</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul className="list-disc list-inside ml-4">
        <li>Droit d’accès, de rectification et d’opposition</li>
        <li>Droit à l’effacement (droit à l’oubli)</li>
        <li>Droit à la portabilité des données</li>
      </ul>
      <p>Pour exercer ces droits, contactez-nous à : <strong>contact@reussirsoncv.com</strong></p>
    </div>
  );
};
