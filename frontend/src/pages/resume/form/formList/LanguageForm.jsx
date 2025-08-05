import { ArrowRight, ArrowLeft, Loader2, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // thème de base

export const LanguageForm = ({ goToPrevStep, goToNextStep, resume, setResume }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const [languages, setLanguages] = useState([]);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [form, setForm] = useState({
    name: '',
    level:''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resume?.languages) {
      setLanguages(resume.languages);
    }
  }, [resume]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addLanguage = () => {
    if (!form.name ) return;
    setLanguages((prev) => [...prev, form]);
    setForm({
      name:'',
      level:''
    });
  };

const removeLanguage = async (index) => {
  const language = languages[index];
  setDeletingIndex(index);

  try {

    if (language.id) {
      await axios.delete(`${apiUrl}/languages/${language.id}/`);
    }

    // Supprimer localement du tableau
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);

    // 🔁 Met à jour aussi le resume global
    setResume((prev) => ({
      ...prev,
      languages: updatedLanguages,
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

      for (let language of languages) {
        if(language.id){
           responses.push(language); 
          continue;
        }
        const payload = { ...language, cv: resume.id };
        const response = await axios.post(`${apiUrl}/languages/`, payload);
        responses.push(response.data);
      }

      setResume((prev) => ({
        ...prev,
        languages: responses,
      }));

      goToNextStep();
    } catch (error) {
      console.error("Erreur lors de l’envoi des competences :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 lg:w-[610px] md:w-[500px] mx-auto bg-base-100 shadow-md p-6 rounded-lg  lg:mb-40">
      <progress className="progress progress-primary w-full mb-4" value={80} max="100"></progress>

      <h1 className="text-xl font-bold text-info-content mb-6">Langues</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Experience Form Inputs */}
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" className="input input-bordered w-full" />
        <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
                  <option value="">-- Niveau de langue --</option>
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Avancé">Avancé</option>
                  <option value="Maîtrisé">Maîtrisé</option>
                  <option value="Bilingue">Bilingue</option>
                  <option value="Langue maternelle">Langue maternelle</option>
    </select>

  

        <button type="button" onClick={addLanguage} className="btn btn-neutral mt-10 w-full">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter cet Langue à la liste
        </button>

        {/* Preview list of languages */}
        {languages.length > 0 && (
          <div className="mt-6 space-y-2">
            <h2 className="font-semibold">Éléments ajoutés :</h2>
            {languages.map((language, index) => (
              <div key={index} className="p-4 border rounded-md bg-base-200 flex justify-between items-start">
                <div>
                  <p className="font-bold">{language.name} </p>
                  <p className="font-bold">{language.level} </p>
                </div>
                <button
  onClick={() => removeLanguage(index)}
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
