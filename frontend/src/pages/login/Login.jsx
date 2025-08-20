import { useState } from "react";
import axios from "axios";
import { useCSRF } from "../../hooks/useCSRF";
const apiUrl = import.meta.env.VITE_API_URL;
export const Login = ({ setOpenLogin, refetch }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification basique
    if (!formData.email || !formData.password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post(`${apiUrl}/login/`, formData);

      
      const csrfRes = await axios.get(`${apiUrl}/csrf/`, {
    withCredentials: true,
  });
      axios.defaults.headers.common["X-CSRFToken"] = csrfRes.data.csrfToken;
      refetch();
      setOpenLogin(false);
    } catch (err) {
      console.error("Login error:", err);
      const errorType = err.response?.data?.error;
      if (errorType === "unverified") {
        setError("Votre compte n'est pas vérifié.");
  }   else {
        setError("Email ou mot de passe incorrect.");
  }
    } finally {
      
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box  p-0 sm:p-4 relative">
        {/* Close Icon */}
        <img
          className="absolute top-4 right-4 w-5 h-5 cursor-pointer"
          src="/close_icon.png"
          alt="Close"
          onClick={() => setOpenLogin(false)}
        />

        {/* Scrollable content */}
        <div className="max-h-[80vh] overflow-y-scroll p-4">
          <h3 className="font-bold mb-4 text-5xl text-center">Connexion</h3>
          <p className="text-info-content text-center">
            Veuillez remplir les informations pour se connecter.
          </p>

          {/* Affichage des erreurs */}
          {error && (
            <div className="alert alert-error my-4">
              <span>{error}</span>
            </div>
          )}

          {/* FORMULAIRE */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
          >
            <div className="flex flex-col gap-4">
              <h1 className="text-info-content font-bold">
                Données personnelles
              </h1>
              <label className="text-base-content">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input input-bordered w-100"
              />

              <label className="text-base-content">Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                className="input input-bordered w-100"
              />
            </div>
          </form>

          {/* Boutons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => setOpenLogin(false)}
              className="btn"
            >
              Fermer
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn btn-neutral"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Se connecter"
              )}
            </button>
          </div>

          <p className="ml-4 mt-3 text-info-content">
            Vous n'avez pas un compte ?{" "}
            <span
              onClick={() => {
                setOpenLogin(false);
              }}
              className="text-primary cursor-pointer"
            >
              Inscrire
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
