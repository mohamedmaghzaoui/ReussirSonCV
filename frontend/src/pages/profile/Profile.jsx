import { useUser } from "../../context/UserContext.jsx";
import { Pencil, Trash2, Copy, Check, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import userIcon from "../../assets/user_icon.jpg";
import DeleteAccountModal from "../../components/DeleteAccountModal.jsx";
import axios from "axios";
export const Profile = () => {
  const { user, refetch} = useUser();
  const apiUrl = import.meta.env.VITE_API_URL;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [userData, setUserData] = useState(user || {});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    birthdate: user.birthdate,
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  useEffect(() => {
    setUserData(user); // sync local state with context
  }, [user]);

  const getLabel = (field) => {
    if (field === "first_name") {
      return "Prénom";
    } else if (field === "last_name") {
      return "Nom";
    } else if (field === "email") {
      return "Email";
    } else if (field === "birthdate") {
      return "Date de naissance";
    } else {
      return field; // fallback if not found
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const saveField = async (field) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${apiUrl}/user/`,
        { [field]: formData[field] },
        { withCredentials: true },
      );
     
      setUserData(res.data.user);
      setEditingField(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordData({ ...passwordData, [id]: value });
  };

  const savePassword = async (e) => {
    e.preventDefault();
    setPasswordMessage("");

    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      return setPasswordMessage("Veuillez remplir tous les champs.");
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setPasswordMessage(
        "Les nouveaux mots de passe ne correspondent pas.",
      );
    }
    if (passwordData.newPassword.length < 8) {
      return setPasswordMessage(
        "Le mot de passe doit contenir au moins 8 caractères.",
      );
    }

    try {
      setLoadingPassword(true);
      const res = await axios.put(
        `${apiUrl}/user/password/`,
        {
          old_password: passwordData.oldPassword,
          new_password: passwordData.newPassword,
        },
        { withCredentials: true },
      );
      setPasswordMessage("✅");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setPasswordMessage("L'ancien mot de passe est incorrect");
    } finally {
      setLoadingPassword(false);
    }
  };

  const deleteAccount = async () => {
  try {
    setLoading(true);
    await axios.delete(`${apiUrl}/user/delete/`);
    refetch();
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Erreur lors de la suppression du compte.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 ">
      {/* Profile Panel */}
      <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-300 ">
        <div className="flex justify-center mb-4">
          <img
            src={
              user?.profile_picture
                ? `${baseUrl}${user.profile_picture}`
                : userIcon
            }
            
            alt="User Icon"
            className="w-20 h-20 rounded-full object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          {userData.first_name} {userData.last_name}
        </h2>
        <hr className="border border-gray-200 mb-4" />
        <div className="space-y-6 ">
          {["first_name", "last_name", "email", "birthdate"].map((field) => (
            <div key={field} className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-400 text-sm">{getLabel(field)}</p>

                {editingField === field ? (
                  field === "email" ? (
                    // Email non modifiable : we show only the value, no input
                    <p className="text-base mt-1">{formData[field]}</p>
                  ) : (
                    <div className=" gap-2 mt-1">
                      <input
                        type={field === "birthdate" ? "date" : "text"}
                        className="input input-bordered mb-1"
                        value={formData[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                      />
                      <button
                        className="btn btn-sm mx-4 "
                        onClick={() => setEditingField(null)}
                      >
                        cancel
                      </button>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => saveField(field)}
                        disabled={loading}
                      >
                        Sauvegarder
                      </button>
                    </div>
                  )
                ) : (
                  <p className="text-base mt-1">
                    {field === "birthdate"
                      ? new Date(formData[field]).toLocaleDateString("fr-FR")
                      : formData[field]}
                  </p>
                )}
              </div>

              {editingField !== field && field !== "email" && (
                <button
                  className="btn btn-xs btn"
                  onClick={() => setEditingField(field)}
                >
                  <Pencil size={15} />
                </button>
              )}
            </div>
          ))}

          {/* delete account */}
          <button className="btn btn-error btn-block mt-6" onClick={() => setIsModalOpen(true)}>
  <LogOut className="w-4 h-4 mr-2" />
  Supprimer ce compte
</button>
<DeleteAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={deleteAccount}
      />

        </div>
      </div>

      {/* Changer password panel */}
      <div className="col-span-1 md:col-span-2">
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Modifier votre mot de passe
          </h2>

          <form onSubmit={savePassword}>
            <div className="mb-4">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Ancien mot de passe
              </label>
              <input
                type="password"
                id="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                className="input w-full"
                placeholder="Entrez votre ancien mot de passe"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="input w-full"
                placeholder="Entrez votre nouveau mot de passe"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="input w-full"
                placeholder="Confirmez votre nouveau mot de passe"
              />
            </div>

            {passwordMessage && (
              <p className="text-sm text-center mb-3 text-red-500">
                {passwordMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full btn btn-neutral"
              disabled={loadingPassword}
            >
              {loadingPassword
                ? "Enregistrement..."
                : "Modifier le mot de passe"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
