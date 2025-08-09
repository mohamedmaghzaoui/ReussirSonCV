import { ArrowRight, ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // thème de base

export const EducationForm = ({
  goToPrevStep,
  goToNextStep,
  resume,
  setResume,
}) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [educations, setEducations] = useState([]);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [form, setForm] = useState({
    degree: "",
    institution: "",
    start_date: "",
    end_date: "",
    description: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resume?.educations) {
      setEducations(resume.educations);
    }
  }, [resume]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addEducation = () => {
    if (!form.degree || !form.institution) return;
    setEducations((prev) => [...prev, form]);
    setForm({
      degree: "",
      institution: "",
      start_date: "",
      end_date: "",
      description: "",
      address: "",
    });
  };

  const removeEducation = async (index) => {
    const edu = educations[index];
    setDeletingIndex(index);

    try {
      // Si l'éducation a été enregistrée dans la BDD
      if (edu.id) {
        await axios.delete(`${apiUrl}/educations/${edu.id}/`);
      }

      // Supprimer localement du tableau
      const updatedEducations = educations.filter((_, i) => i !== index);
      setEducations(updatedEducations);

      // 🔁 Met à jour aussi le resume global
      setResume((prev) => ({
        ...prev,
        educations: updatedEducations,
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

      for (let edu of educations) {
        // ✅ Skip if already saved (has an ID)
        if (edu.id) {
          responses.push(edu); // Keep the already saved one
          continue;
        }

        const payload = { ...edu, cv: resume.id };
        const response = await axios.post(`${apiUrl}/educations/`, payload);
        responses.push(response.data);
      }

      setResume((prev) => ({
        ...prev,
        educations: responses,
      }));

      goToNextStep();
    } catch (error) {
      console.error("Erreur lors de l’envoi des éducations :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 lg:w-[610px] md:w-[500px] mx-auto bg-base-100 shadow-md p-6 rounded-lg  lg:mb-40">
      <progress
        className="progress progress-primary w-full mb-4"
        value={40}
        max="100"
      ></progress>

      <h1 className="text-xl font-bold text-info-content mb-6">Formations</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Education Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="degree"
            value={form.degree}
            onChange={handleChange}
            placeholder="Diplôme"
            className="input input-bordered w-full"
          />
          <input
            name="institution"
            value={form.institution}
            onChange={handleChange}
            placeholder="Établissement"
            className="input input-bordered w-full"
          />
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Adresse (optionnelle)"
            className="input input-bordered w-full md:col-span-2"
          />
          <div className="md:col-span-2 mb-3 ">
            <ReactQuill
              className="h-20"
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
          onClick={addEducation}
          className="btn btn-neutral mt-10 w-full "
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter cette formation à la liste
        </button>

        {/* Preview list of educations */}
        {educations.length > 0 && (
          <div className="mt-6 space-y-2">
            <h2 className="font-semibold">Éléments ajoutés :</h2>
            {educations.map((edu, index) => (
              <div
                key={index}
                className="p-4 border rounded-md bg-base-200 flex justify-between items-start"
              >
                <div>
                  <p className="font-bold">
                    {edu.degree} - {edu.institution}
                  </p>
                  <p className="text-sm">
                    {edu.start_date} à {edu.end_date || "présent"}
                  </p>
                  <p className="text-xs text-gray-600">{edu.address}</p>
                  <p
                    className="text-xs my-2"
                    dangerouslySetInnerHTML={{ __html: edu.description }}
                  ></p>
                </div>
                <button
                  onClick={() => removeEducation(index)}
                  type="button"
                  className="text-error ml-4"
                  disabled={deletingIndex === index}
                >
                  {deletingIndex === index ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
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
            Retourner
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
