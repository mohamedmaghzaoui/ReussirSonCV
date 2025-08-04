import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const FirstPersonalInfoForm = ({ goToNextStep, resume, setResume }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    age: '',
    phone: '',
    title: ''
  });

  const [loading, setLoading] = useState(false);

  // Préremplir les champs si les données existent
  useEffect(() => {
    if (resume?.personal_info) {
      setFormData({
        email: resume.personal_info.email || '',
        first_name: resume.personal_info.first_name || '',
        last_name: resume.personal_info.last_name || '',
        age: resume.personal_info.age || '',
        phone_number: resume.personal_info.phone_number || '',
        title: resume.personal_info.title || ''
      });
    }
  }, [resume]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        cv: resume.id
      };

      let response;

      if (resume.personal_info?.id) {
        response = await axios.put(`${apiUrl}/personal-infos/${resume.personal_info.id}/`, payload);
      } else {
        response = await axios.post(`${apiUrl}/personal-infos/`, payload);
      }

      setResume((prev) => ({
        ...prev,
        personal_info: response.data,
      }));

      goToNextStep();
    } catch (err) {
      console.error('Erreur lors de l’envoi :', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 lg:w-[610px] md:w-[500px] mx-auto bg-base-100 shadow-md p-6 rounded-lg overflow-y-auto max-h-[80vh]">
      <progress className="progress progress-primary w-full mb-4" value={10} max="100"></progress>

      <h1 className="text-xl font-bold text-info-content mb-6">Informations personnelles</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="label text-base-content">Adresse email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ex : jean.dupont@email.com"
            className="input input-bordered w-full text-base"
          />
        </div>

        {/* Nom et prénom */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="label text-base-content">Nom</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="ex : Dupont"
              className="input input-bordered w-full text-base"
            />
          </div>
          <div className="flex-1">
            <label className="label text-base-content">Prénom</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="ex : Jean"
              className="input input-bordered w-full text-base"
            />
          </div>
        </div>

        {/* Âge et téléphone */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="label text-base-content">Âge</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="ex : 25"
              className="input input-bordered w-full text-base"
              min="0"
            />
          </div>
          <div className="flex-1">
            <label className="label text-base-content">Numéro de téléphone</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="ex : 06 12 34 56 78"
              className="input input-bordered w-full text-base"
            />
          </div>
        </div>

        {/* Titre du CV */}
        <div>
          <label className="label text-base-content">Titre du CV</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="ex : Développeur Web Junior"
            className="input input-bordered w-full text-base"
          />
        </div>

        {/* Boutons */}
        <div className="mt-8 flex flex-wrap justify-between gap-4">
          <Link to="/" className="btn">
            Accueil
          </Link>
          <button type="submit" className="btn btn-primary flex items-center gap-2" disabled={loading}>
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Suivant'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </form>
    </div>
  );
};
