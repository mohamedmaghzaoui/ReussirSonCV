export const SignUp = ({ setOpenSignUp }) => {
  return (
    <>
      <div className="modal modal-open">
        <div className="modal-box w-full max-w-3xl p-0 sm:p-4">
          
          {/* 📦 SCROLLABLE CONTENT WRAPPER */}
          <div className="max-h-[80vh] overflow-y-scroll p-4">
            <h3 className="font-bold mb-4 text-3xl text-center">Inscription</h3>
            <p className="text-info-content text-center">
              Veuillez remplir les informations pour créer votre compte.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* 📝 Form Section */}
              <form className="flex flex-col gap-4">
                <h1 className="text-info-content">Données personnelles</h1>
                <input type="text" placeholder="Prénom" className="input input-bordered w-full" />
                <input type="text" placeholder="Nom" className="input input-bordered w-full" />
                <input type="email" placeholder="Email" className="input input-bordered w-full" />
                <input type="password" placeholder="Mot de passe" className="input input-bordered w-full" />
                <input type="password" placeholder="Répéter votre mot de passe" className="input input-bordered w-full" />
                <input type="date" placeholder="Date de naissance" className="input input-bordered w-full" />
              </form>

              {/* 📷 Image Section */}
              <div className="flex flex-col gap-4 items-center">
                <p className="text-info-content text-center">Ajoutez votre photo de profil</p>
                <label htmlFor="profileImage" className="w-40 h-32 bg-indigo-50 flex items-center justify-center rounded-lg cursor-pointer">
                  <span className="text-sm text-primary">Cliquez pour téléverser</span>
                </label>
                <input type="file" id="profileImage" className="hidden" accept="image/*" />
                <button className="btn btn-primary btn-md w-40 mt-2">Téléverser</button>
              </div>
            </div>

            {/* ✅ Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button onClick={() => setOpenSignUp(false)} className="btn">
                Fermer
              </button>
              <button type="submit" className="btn btn-neutral">
                Créer un compte
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
