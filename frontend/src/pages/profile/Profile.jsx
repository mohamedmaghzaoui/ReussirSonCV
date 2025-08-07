import { useUser } from "../../context/UserContext";
import { useResumes } from "../../context/ResumeContext";
import { Pencil, Trash2, Copy, Check, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Profile Panel */}
      <div className="col-span-1 bg-white p-6 rounded-xl shadow-md border">
        <h2 className="text-2xl font-bold text-primary mb-6">Mon Profil</h2>
        <div className="space-y-6">
          {/* Each profile field */}
          {["first_name", "last_name", "email", "birthdate"].map((field) => (
            <div key={field} className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">
                  {{
                    first_name: "Prénom",
                    last_name: "Nom",
                    email: "Email",
                    birthdate: "Date de naissance",
                  }[field]}
                </p>
                {editingField === field ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type={field === "birthdate" ? "date" : "text"}
                      className="input input-bordered input-sm w-full max-w-xs"
                      value={formData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                    />
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => saveField(field)}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => setEditingField(null)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <p className="text-base mt-1">
                    {field === "birthdate"
                      ? new Date(formData[field]).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : formData[field]}
                  </p>
                )}
              </div>
              {editingField !== field && (
                <button
                  onClick={() => setEditingField(field)}
                  className="btn btn-sm btn-outline"
                >
                  <Pencil className="w-4 h-4" />
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
              className="bg-white p-5 rounded-lg shadow-md flex flex-col justify-between border hover:shadow-lg transition"
            >
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
              <div className="mt-4 flex gap-3">
                <button
                  className="btn btn-sm btn-outline btn-primary"
                  onClick={() => navigate(`/dashboard/edit/${resume.id}`)}
                >
                  <Pencil className="w-4 h-4" />
                  Modifier
                </button>
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={() => handleDelete(resume.id)}
                >
                  {loadingId === resume.id ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </>
                  )}
                </button>
                <button className="btn btn-sm btn-outline btn-neutral">
                  <Copy className="w-4 h-4" />
                  Dupliquer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
