import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const SecondPersonalInfoForm = ({
  goToPrevStep,
  goToNextStep,
  resume,
  setResume,
}) => {
  const [formData, setFormData] = useState({
    address: "",
    linkedin: "",
    portfolio: "",
    website: "",
    user_picture: null,
  });
  const [loading, setLoading] = useState(false);

  const [imageName, setImageName] = useState("");

  useEffect(() => {
    if (resume?.personal_info) {
      setFormData({
        address: resume.personal_info.address || "",
        linkedin: resume.personal_info.linkedin || "",
        portfolio: resume.personal_info.portfolio || "",
        website: resume.personal_info.website || "",
        user_picture: resume.personal_info.user_picture || null,
      });
    }
  }, [resume]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        user_picture: file,
      }));
      setImageName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append("address", formData.address);
      formPayload.append("linkedin", formData.linkedin);
      formPayload.append("portfolio", formData.portfolio);
      formPayload.append("website", formData.website);
      formPayload.append("cv", resume.id);
      formPayload.append("email", resume.personal_info.email);
      formPayload.append("first_name", resume.personal_info.first_name);
      formPayload.append("last_name", resume.personal_info.last_name);
      formPayload.append("title", resume.personal_info.title);

      if (formData.user_picture instanceof File) {
        formPayload.append("user_picture", formData.user_picture);
      }

      let response;

      if (resume.personal_info?.id) {
        response = await axios.put(
          `${apiUrl}/personal-infos/${resume.personal_info.id}/`,
          formPayload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
      } else {
        response = await axios.post(`${apiUrl}/personal-infos/`, formPayload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setResume((prev) => ({
        ...prev,
        personal_info: response.data,
      }));

      goToNextStep();
    } catch (err) {
      console.error("Erreur lors de l’envoi :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 lg:w-[610px] md:w-[500px] mx-auto bg-base-100 shadow-md p-6 rounded-lg ">
      <progress
        className="progress progress-primary w-full mb-4"
        value={20}
        max="100"
      ></progress>

      <h1 className="text-xl font-bold text-info-content mb-6">
        Informations personnelles
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Adresse */}
        <div className="flex-1">
          <label className="label text-base-content">Adresse</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="ex : 31 rue de Mont"
            className="input input-bordered w-full text-base"
          />
        </div>

        {/* Profil LinkedIn */}
        <div className="flex-1">
          <label className="label text-base-content">Profil LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/..."
            className="input input-bordered w-full text-base"
          />
        </div>

        {/* Portfolio et site web */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="label text-base-content">Portfolio</label>
            <input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              placeholder="https://monportfolio.com"
              className="input input-bordered w-full text-base"
            />
          </div>
          <div className="flex-1">
            <label className="label text-base-content">
              Site web personnel
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://monsiteweb.com"
              className="input input-bordered w-full text-base"
            />
          </div>
        </div>

        {/* Téléversement de photo */}
        <div>
          <label className="label text-base-content">Photo de profil</label>
          <input
            type="file"
            name="user_picture"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />
          {imageName && (
            <p className="text-sm text-gray-500 mt-1">
              Image sélectionnée : <strong>{imageName}</strong>
            </p>
          )}
        </div>

        {/* Boutons */}
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
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Suivant"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </form>
    </div>
  );
};
