import { useUser } from "../../context/UserContext";
import { useResumes } from "../../context/ResumeContext";
import { Pencil, Trash2, Copy, Check, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/user_icon.jpg";
export const Profile = () => {
  const { user, logout } = useUser();
  const { resumes, deleteResume } = useResumes();
  const navigate = useNavigate();

  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    birthdate: user.birthdate,
  });

  const getLabel=(field)=> {
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
}


  const [loadingId, setLoadingId] = useState(null);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const saveField = (field) => {
    console.log("Saving...", field, formData[field]);
    // TODO: Send update to backend
    setEditingField(null);
  };

  const handleDelete = async (id) => {
    setLoadingId(id);
    await deleteResume(id);
    setLoadingId(null);
  };

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 ">
      {/* Profile Panel */}
      <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-300 ">
    <div className="flex justify-center mb-4">
    <img
      src={user?.profile_picture ? `http://127.0.0.1:8000/${user.profile_picture}` : userIcon}
      alt="User Icon"
      className="w-20 h-20 rounded-full object-contain"
    />
  </div>
      
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">{user.first_name} {user.last_name}</h2>
        <hr className="border border-gray-200 mb-4"/>
        <div className="space-y-6 ">
      {["first_name", "last_name", "email", "birthdate"].map((field) => (
  <div key={field} className="flex justify-between items-center mb-4">
    
   
    <div>
      {/* Show label*/}
      <p className="text-gray-400 text-sm">
        {getLabel(field)}
      </p>

      {/* If we are editing this field, show input */}
      {editingField === field ? (
        <div className=" gap-2 mt-1">
          <input
            type={field === "birthdate" ? "date" : "text"}
            className="input input-bordered mb-1"
            value={formData[field]}
            onChange={(e) => handleChange(field, e.target.value)}
          />

          {/* Save button */}
          
          {/* Cancel button */}
          <button className="btn btn-sm mx-4 " onClick={() => setEditingField(null)}>
            cancel
          </button>
          <button className="btn btn-sm btn-success" onClick={() => saveField(field)}>
            save
          </button>

        </div>
      ) : (
        // Show the value if we're not editing
        <p className="text-base mt-1">
          {field === "birthdate"
            ? new Date(formData[field]).toLocaleDateString("fr-FR")
            : formData[field]}
        </p>
      )}
    </div>

    {/* Right side: Edit button (if not already editing) */}
    {editingField !== field && (
      <button className="btn btn-xs btn" onClick={() => setEditingField(field)}>
        <Pencil size={15}/>
      </button>
    )}
  </div>
))}

          {/* Logout */}
          <button className="btn btn-error btn-block mt-6" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Supprimer ce compte
          </button>
        </div>
      </div>

      {/* Resumes Panel */}
      <div className="col-span-1 md:col-span-2">
        <h2 className="text-2xl font-bold text-primary mb-6">
          Mes CVs
        </h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
  {resumes.map((resume) => (
    <div
      key={resume.id}
      className="bg-white p-5 rounded-lg shadow-md flex flex-col justify-between border border-gray-300 hover:shadow-lg transition"
    >
      <div className="flex justify-between items-start flex-col sm:flex-row">
        <div>
          <h3 className="font-semibold text-lg mb-1">{resume.name}</h3>
          <p className="text-gray-500 text-sm">
            Créé le{" "}
            {new Date(resume.created_at).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        {/* Buttons */}
        <div className="mt-4 sm:mt-0 flex gap-3 flex-wrap sm:justify-end">
          <button
            className="btn btn-sm btn-outline btn-primary"
            onClick={() => navigate(`/dashboard/edit/${resume.id}`)}
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            className="btn btn-sm btn-outline btn-error"
            onClick={() => handleDelete(resume.id)}
          >
            {loadingId === resume.id ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
          <button className="btn btn-sm btn-outline btn-neutral">
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
<div className="bg-white mt-5 p-5 rounded-lg shadow-md flex flex-col justify-between border border-gray-300 hover:shadow-lg transition">
  <h2 className="text-2xl font-semibold mb-6 text-center">Modifier votre mot de passe</h2>

  <form>
    <div className="mb-4">
      <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-3">
        Ancien mot de passe
      </label>
      <input
        type="password"
        id="oldPassword"
        className="input w-full"
        placeholder="Entrez votre ancien mot de passe"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-3">
        Nouveau mot de passe
      </label>
      <input
        type="password"
        id="newPassword"
        className="input w-full"
        placeholder="Entrez votre nouveau mot de passe"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-3">
        Confirmer le nouveau mot de passe
      </label>
      <input
        type="password"
        id="confirmPassword"
        className="input w-full"
        placeholder="Confirmez votre nouveau mot de passe"
      />
    </div>

    <button
      type="submit"
      className="w-full  btn btn-neutral"
    >
      Modifier le mot de passe
    </button>
  </form>
</div>

      </div>

      
    </div>
  );
};
