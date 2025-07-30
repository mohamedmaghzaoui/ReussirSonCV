import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FirstPersonalInfoForm = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-base-100 shadow-md p-6 rounded-lg overflow-y-auto max-h-[80vh]">
      {/* Barre de progression */}
      <progress className="progress progress-primary w-full mb-4" value={10} max="100"></progress>

      {/* Titre */}
      <h1 className="text-xl font-bold text-info-content mb-6">Informations personnelles</h1>

      {/* Formulaire */}
      <form className="space-y-4">
        {/* Email */}
        <div>
          <label className="label text-base-content">Adresse email</label>
          <input
            type="email"
            name="email"
            placeholder="ex : jean.dupont@email.com"
            className="input input-bordered w-full text-base"
          />
        </div>

        {/* Nom et Prénom */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="label text-base-content">Nom</label>
            <input
              type="text"
              name="last_name"
              placeholder="ex : Dupont"
              className="input input-bordered w-full text-base"
            />
          </div>
          <div className="flex-1">
            <label className="label text-base-content">Prénom</label>
            <input
              type="text"
              name="first_name"
              placeholder="ex : Jean"
              className="input input-bordered w-full text-base"
            />
          </div>
        </div>

        {/* Âge et Téléphone */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="label text-base-content">Âge</label>
            <input
              type="number"
              name="age"
              placeholder="ex : 25"
              className="input input-bordered w-full text-base"
              min="0"
            />
          </div>
          <div className="flex-1">
            <label className="label text-base-content">Numéro de téléphone</label>
            <input
              type="tel"
              name="phone"
              placeholder="ex : 06 12 34 56 78"
              className="input input-bordered w-full text-base"
            />
          </div>
        </div>

        {/* Titre du CV */}
        <div>
          <label className="label text-base-content">Titre du CV</label>
          <input
            type="text"
            name="title"
            placeholder="ex : Développeur Web Junior"
            className="input input-bordered w-full text-base"
          />
        </div>
      </form>

      {/* Boutons */}
      <div className="mt-8 flex flex-wrap justify-between gap-4">
        <Link to="/" className="btn">
          Accueil
        </Link>
        <button type="submit" className="btn btn-primary flex items-center gap-2">
          Suivant
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
