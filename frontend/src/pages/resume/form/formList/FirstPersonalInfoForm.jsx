import { ArrowRight } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

export const FirstPersonalInfoForm=()=>{
    return (
    <div className="w-80 lg:w-[610px] md:w-[600px] bg-base-100 shadow-md p-6 rounded-lg overflow-y-auto max-h-[80vh] ">
    <progress className="progress progress-primary w-75  lg:w-[570px]" value={10} max="100"></progress>
      <h1 className="text-xl font-bold text-info-content mb-6">Données personnelles</h1>

      <form className="space-y-5">
        {/* Email */}
        <div>
          <label className="label text-base-content">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Entrez votre email"
            className="input input-bordered w-full text-base"
          />
        </div>

        {/* Mot de passe */}
        <div>
          <label className="label text-base-content">Nom</label>
          <input
            type=""
            name="password"
            placeholder="Entrez votre neom"
            className="input input-bordered w-full text-base"
          />
        </div>
        <div>
          <label className="label text-base-content">Prenom</label>
          <input
            type="text"
            name="password"
            placeholder="Entrez votre prenom"
            className="input input-bordered w-full text-base"
          />
        </div>
        <div>
          <label className="label text-base-content">Age</label>
          <input
            type='number'
            name="password"
            placeholder="Entrez votre Age"
            className="input input-bordered w-full text-base"
          />
        </div>
 
      
 
      </form>

      {/* Boutons */}
      <div className="mt-10 mb-2 flex flex-wrap justify-end gap-4">
        <button type="button" className="btn">Accueil </button>
        <button type="submit" className="btn btn-primary flex items-center gap-2">
  Suivant
  <ArrowRight className="w-4 h-4" />
</button>

      </div>
    </div>
  )
}