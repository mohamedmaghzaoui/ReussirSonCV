import { ArrowRight, ArrowLeft, Loader2, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // thème de base

export const ExperienceForm = ({ goToPrevStep, goToNextStep, resume, setResume }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const [experiences, setExperiences] = useState([]);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [form, setForm] = useState({
    title: '',
    company: '',
    start_date: '',
    end_date: '',
    description: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resume?.experiences) {
      setExperiences(resume.experiences);
    }
  }, [resume]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addExperience = () => {
    if (!form.title || !form.company) return;
    setExperiences((prev) => [...prev, form]);
    setForm({
      title: '',
      company: '',
      start_date: '',
      end_date: '',
      description: '',
      address: '',
    });
  };

const removeExperience = async (index) => {
  const exp = experiences[index];
  setDeletingIndex(index);

  try {
    // Si l'éducation a été enregistrée dans la BDD
    if (exp.id) {
      await axios.delete(`${apiUrl}/experiences/${exp.id}/`);
    }

    // Supprimer localement du tableau
    const updatedexperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedexperiences);

    // 🔁 Met à jour aussi le resume global
    setResume((prev) => ({
      ...prev,
      experiences: updatedexperiences,
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

      for (let exp of experiences) {
        if(exp.id){
           responses.push(exp); 
          continue;
        }
        const payload = { ...exp, cv: resume.id };
        const response = await axios.post(`${apiUrl}/experiences/`, payload);
        responses.push(response.data);
      }

      setResume((prev) => ({
        ...prev,
        experiences: responses,
      }));

      goToNextStep();
    } catch (error) {
      console.error("Erreur lors de l’envoi des éducations :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 lg:w-[610px] md:w-[500px] mx-auto bg-base-100 shadow-md p-6 rounded-lg overflow-y-auto max-h-[80vh] lg:mb-40">
      <progress className="progress progress-primary w-full mb-4" value={40} max="100"></progress>

      <h1 className="text-xl font-bold text-info-content mb-6">Experience</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Experience Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Titre" className="input input-bordered w-full" />
          <input name="company" value={form.company} onChange={handleChange} placeholder="Entreprise" className="input input-bordered w-full" />
          <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="input input-bordered w-full" />
          <input type="date" name="end_date" value={form.end_date} onChange={handleChange} className="input input-bordered w-full" />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Adresse (optionnelle)" className="input input-bordered w-full md:col-span-2" />
          <div className="md:col-span-2 mb-2">
  <ReactQuill
    className='h-25'
    value={form.description}
    onChange={(value) => setForm((prev) => ({ ...prev, description: value }))}
    theme="snow"
    placeholder="Description"
  />
  
</div>

        </div>

        <button type="button" onClick={addExperience} className="btn btn-neutral mt-10 w-full">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter cette formation à la liste
        </button>

        {/* Preview list of experiences */}
        {experiences.length > 0 && (
          <div className="mt-6 space-y-2">
            <h2 className="font-semibold">Éléments ajoutés :</h2>
            {experiences.map((exp, index) => (
              <div key={index} className="p-4 border rounded-md bg-base-200 flex justify-between items-start">
                <div>
                  <p className="font-bold">{exp.title} - {exp.company}</p>
                  <p className="text-sm">{exp.start_date} à {exp.end_date || "présent"}</p>
                  <p className="text-xs text-gray-600">{exp.address}</p>
                   <p className="text-xs my-2" dangerouslySetInnerHTML={{__html:exp.description}}></p>
                </div>
                <button
  onClick={() => removeExperience(index)}
  type="button"
  className="text-error ml-4"
  disabled={deletingIndex === index}
>
  {deletingIndex === index
    ? <Loader2 className="w-5 h-5 animate-spin" />
    : <Trash2 className="w-5 h-5" />}
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
          <button type="submit" className="btn btn-primary flex items-center gap-2" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Suivant'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </form>
    </div>
  );
};
