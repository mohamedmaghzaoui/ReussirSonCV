export const MentionsLegales = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-primary">Mentions légales</h1>
      <p className="mb-4">
        Conformément aux dispositions des articles 6-III et 19 de la Loi
        n°2004-575 du 21 juin 2004 pour la Confiance dans l’économie numérique
        (LCEN), nous portons à la connaissance des utilisateurs du site
        ReussirSonCV les informations suivantes :
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Éditeur du site</h2>
      <p>
        <strong>Nom :</strong> Mohamed Maghzaoui
      </p>
      <p>
        <strong>Email :</strong> contact@reussirsoncv.com
      </p>
      <p>
        <strong>Responsable de la publication :</strong> Mohamed Maghzaoui
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Hébergement</h2>
      <p>
        Le site est hébergé par : <strong>Vercel</strong>
      </p>
      <p>
        <strong>Adresse :</strong> Vercel Inc, 440 N Barranca Ave #4133, Covina,
        CA 91723, USA
      </p>
      <p>
        <strong>Site web :</strong>{" "}
        <a
          className="link link-primary"
          href="https://vercel.com"
          target="_blank"
          rel="noreferrer"
        >
          vercel.com
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Propriété intellectuelle
      </h2>
      <p>
        Le contenu du site ReussirSonCV (textes, images, graphismes, logo, etc.)
        est protégé par le droit d’auteur. Toute reproduction, représentation ou
        diffusion sans autorisation est interdite.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Responsabilité</h2>
      <p>
        ReussirSonCV met tout en œuvre pour fournir des informations fiables.
        Toutefois, l’éditeur ne peut être tenu responsable d'erreurs,
        d'omissions ou de résultats obtenus par l’usage de ces informations.
      </p>
    </div>
  );
};
