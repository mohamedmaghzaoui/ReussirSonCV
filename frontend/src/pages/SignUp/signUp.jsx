import { useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const SignUp = ({ setOpenSignUp }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    profile_picture: null,
  });

  const [error, setError] = useState("");
  const [imageName, setImageName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      profile_picture: file,
    }));
    setImageName(file ? file.name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.birthdate||
      !imageName
    ) {
      setError("Veuillez remplir toutes les informations.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    const data = new FormData();
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("birthdate", formData.birthdate);
    if (formData.profile_picture) {
      data.append("profile_picture", formData.profile_picture);
    }

    try {
      const response = await axios.post(`${apiUrl}/register/`, data);

      console.log("Success:", response.data);
      setOpenSignUp(false);
     
    } catch (error) {
      console.error("Error:", error);
      setError("Un utilisateur existe deja avec ce email.");
    } finally {
      setIsSubmitting(false);
       
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box   max-w-3xl p-0 sm:p-4 relative">
        <img
          className="absolute top-4 right-4 w-5 h-5 cursor-pointer"
          src="/close_icon.png"
          alt="Close"
          onClick={() => setOpenSignUp(false)}
        />

        <div className="max-h-[90vh] overflow-y-scroll p-4">
          <h3 className="font-bold mb-4 text-5xl text-center">Inscription</h3>
          <p className="text-info-content text-center">
            Veuillez remplir les informations pour créer votre compte.
          </p>
          <hr className="mx-auto my-4 w-3/4 text-info-content" />

          {/* dispaly error*/}
          {error && (
            <div className="alert alert-error ">
              <span>{error}</span>
            </div>
          )}

          {/* form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
              {/* Left Side */}
              <div className="flex flex-col gap-4">
                <h1 className="text-info-content font-bold">Données personnelles</h1>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Prénom"
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Nom"
                  className="input input-bordered w-full"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="input input-bordered w-full"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mot de passe"
                  className="input input-bordered w-full"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Répéter votre mot de passe"
                  className="input input-bordered w-full"
                />
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Right Side - Image */}
              <div className="flex flex-col gap-4 items-center">
                <p className="text-info-content text-center font-bold">
                  Ajoutez votre photo de profil
                </p>
                <label
                  htmlFor="profileImage"
                  className="w-40 h-32 bg-indigo-50 flex items-center justify-center rounded-lg cursor-pointer"
                >
                  <span className="text-sm text-primary">Cliquez pour téléverser</span>
                </label>
                <input
                  type="file"
                  id="profileImage"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                {imageName && (
                  <p className="text-sm text-center text-info-content mt-2">{imageName}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap ml-10 gap-4">
              <button
                type="button"
                onClick={() => setOpenSignUp(false)}
                className="btn"
              >
                Fermer
              </button>

              <button type="submit" className="btn btn-neutral" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Créer un compte"
                )}
              </button>
            </div>
          </form>

          {/* Bottom link */}
          <p className="ml-13 mt-3 text-info-content">
            Vous avez déjà un compte ?{" "}
            <span onClick={()=>setOpenSignUp(false)} className="text-primary cursor-pointer">Connecter</span>
          </p>
        </div>
      </div>
    </div>
  );
};
