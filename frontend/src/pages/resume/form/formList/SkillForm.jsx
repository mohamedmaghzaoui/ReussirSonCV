import { ArrowRight, ArrowLeft, Loader2, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // thème de base

export const SkillForm = ({ goToPrevStep, goToNextStep, resume, setResume }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const [skills, setSkills] = useState([]);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [form, setForm] = useState({
    name: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resume?.skills) {
      setSkills(resume.skills);
    }
  }, [resume]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (!form.name ) return;
    setSkills((prev) => [...prev, form]);
    setForm({
      name:''
    });
  };

const removeSkill = async (index) => {
  const skill = skills[index];
  setDeletingIndex(index);

  try {

    if (skill.id) {
      await axios.delete(`${apiUrl}/skills/${skill.id}/`);
    }

    // Supprimer localement du tableau
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);

    // 🔁 Met à jour aussi le resume global
    setResume((prev) => ({
      ...prev,
      skills: updatedSkills,
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

      for (let skill of skills) {
        if(skill.id){
           responses.push(skill); 
          continue;
        }
        const payload = { ...skill, cv: resume.id };
        const response = await axios.post(`${apiUrl}/skills/`, payload);
        responses.push(response.data);
      }

      setResume((prev) => ({
        ...prev,
        skills: responses,
      }));

      goToNextStep();
    } catch (error) {
      console.error("Erreur lors de l’envoi des competences :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 lg:w-[610px] md:w-[500px] mx-auto bg-base-100 shadow-md p-6 rounded-lg overflow-y-auto max-h-[80vh] lg:mb-40">
      <progress className="progress progress-primary w-full mb-4" value={70} max="100"></progress>

      <h1 className="text-xl font-bold text-info-content mb-6">Compétences</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Experience Form Inputs */}
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" className="input input-bordered w-full" />
  

        <button type="button" onClick={addSkill} className="btn btn-neutral mt-10 w-full">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter cet competence à la liste
        </button>

        {/* Preview list of skills */}
        {skills.length > 0 && (
          <div className="mt-6 space-y-2">
            <h2 className="font-semibold">Éléments ajoutés :</h2>
            {skills.map((skill, index) => (
              <div key={index} className="p-4 border rounded-md bg-base-200 flex justify-between items-start">
                <div>
                  <p className="font-bold">{skill.name} </p>
                </div>
                <button
  onClick={() => removeSkill(index)}
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
