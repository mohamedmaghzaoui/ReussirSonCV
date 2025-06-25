export const Login = ({ setOpenLogin }) => {
  return (
    <>
      <div className="modal modal-open">
        <div className="modal-box w-full  p-0 sm:p-4">
           <img 
          className="absolute top-4 right-4 w-5 h-5 cursor-pointer" 
          src="../../../public/close_icon.png" 
          alt="Close" 
          onClick={() => setOpenLogin(false)} 
        />

          
          {/* 📦 SCROLLABLE CONTENT WRAPPER */}
          <div className="max-h-[80vh] overflow-y-scroll p-4">
            <h3 className="font-bold mb-4 text-6xl text-center">Login</h3>
            <p className="text-info-content text-center">
              Veuillez remplir les informations pour se connecter.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Form Section */}
              <form className="flex flex-col gap-2">
                <h1 className="text-info-content font-bold">Données personnelles</h1>
               <label className="text-base-content">Email</label>
                <input type="email" placeholder="Email" className="input input-bordered w-100" />
                <label>Password</label>
                <input type="password" placeholder="Mot de passe" className="input input-bordered w-100" />
            
              </form>

          
            </div>

            {/*  Buttons */}
            <div className="mt-10 flex flex-wrap   gap-4">
              <button onClick={() => setOpenLogin(false)} className="btn">
                Fermer
              </button>
              <button type="submit" className="btn btn-neutral">
                connecter
              </button>
            </div>
              <p className="ml-4 mt-3 text-info-content">Vous n'avez pas un compte? <span className="text-primary">Inscrire</span></p>
          </div>
        </div>
      </div>
    </>
  );
};
