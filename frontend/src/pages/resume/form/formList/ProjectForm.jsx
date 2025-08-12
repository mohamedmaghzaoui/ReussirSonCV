import { ArrowRight, ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // thème de base

export const ProjectForm = ({
  goToPrevStep,
  goToNextStep,
  resume,
  setResume,
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [projects, setProjects] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [form, setForm] = useState({
    title: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resume?.projects) {
      setProjects(resume.projects);
    }
  }, [resume]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addProject = () => {
  const errors = {};

  if (!form.title.trim()) errors.title = "Le titre est requis.";
  if (!form.start_date.trim()) errors.start_date = "date de début est requis.";

  setFormErrors(errors);
  if (Object.keys(errors).length > 0) return;
  setProjects((prev) => [...prev, form]);
    setForm({
      title: "",
      start_date: "",
      end_date: "",
      description: "",
    });
  };

  const removeProject = async (index) => {
    const project = projects[index];
    setDeletingIndex(index);

    try {
      // Si l'éducation a été enregistrée dans la BDD
      if (project.id) {
        await axios.delete(`${apiUrl}/projects/${project.id}/`);
      }

      // Supprimer localement du tableau
      const updatedProjects = projects.filter((_, i) => i !== index);
      setProjects(updatedProjects);

      // 🔁 Met à jour aussi le resume global
      setResume((prev) => ({
        ...prev,
        projects: updatedProjects,
      }));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    } finally {
      setDeletingIndex(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const responses = [];

      for (let project of projects) {
        if (project.id) {
          responses.push(project);
          continue;
        }
        const payload = { ...project, cv: resume.id };
        const response = await axios.post(`${apiUrl}/projects/`, payload);
        responses.push(response.data);
      }

      setResume((prev) => ({
        ...prev,
        projects: responses,
      }));

      goToNextStep();
    } catch (error) {
      console.error("Erreur lors de l’envoi des projets :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 lg:w-[610px] md:w-[500px] mx-auto bg-base-100 shadow-md p-6 rounded-lg  lg:mb-40">
      <progress
        className="progress progress-primary w-full mb-4"
        value={60}
        max="100"
      ></progress>

      <h1 className="text-xl font-bold text-info-content mb-6">Projets</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Experience Form Inputs */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titre"
           className={`input input-bordered w-full ${formErrors.title ? "input-error" : ""}`}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className={`input input-bordered w-full ${formErrors.start_date ? "input-error" : ""}`}
          />
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <div className="md:col-span-2 mb-3">
            <ReactQuill
              className="h-25"
              value={form.description}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, description: value }))
              }
              theme="snow"
              placeholder="Description"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="btn btn-neutral mt-10 w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter ce projet à la liste
        </button>

        {/* Preview list of projects */}
        {projects.length > 0 && (
          <div className="mt-6 space-y-2">
            <h2 className="font-semibold">Éléments ajoutés :</h2>
            {projects.map((project, index) => (
              <div
                key={index}
                className="p-4 border rounded-md bg-base-200 flex justify-between items-start"
              >
                <div>
                  <p className="font-bold">{project.title} </p>
                  <p className="text-sm">
                    {project.start_date} à {project.end_date || "présent"}
                  </p>

                  <p
                    className="text-xs my-2"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  ></p>
                </div>
                <button
                  onClick={() => removeProject(index)}
                  type="button"
                  className="text-error ml-4"
                  disabled={deletingIndex === index}
                >
                  {deletingIndex === index ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5 cursor-pointer" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-8 flex flex-wrap justify-between gap-4">
          <button type="button" onClick={goToPrevStep} className="btn">
            <ArrowLeft className="w-4 h-4" />
            Précédent
          </button>
          <button
            type="submit"
            className="btn btn-primary flex items-center gap-2"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Suivant"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </form>
    </div>
  );
};
