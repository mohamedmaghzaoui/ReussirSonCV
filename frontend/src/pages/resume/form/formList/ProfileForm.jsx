import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export const ProfileForm = ({
  goToPrevStep,
  goToNextStep,
  resume,
  setResume,
}) => {
  const [description, setDescription] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resume?.profile) {
      setDescription(resume.profile.description || "");
    }
  }, [resume]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        description,
        cv: resume.id,
      };

      let response;

      if (resume.profile?.id) {
        response = await axios.put(
          `${apiUrl}/profiles/${resume.profile.id}/`,
          payload,
        );
      } else {
        response = await axios.post(`${apiUrl}/profiles/`, payload);
      }
      console.log("response = ", response);

      setResume((prev) => ({
        ...prev,
        profile: response.data,
      }));

      goToNextStep();
    } catch (err) {
      console.error("Erreur lors de l’envoi :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80 lg:w-[610px] md:w-[500px] mx-auto bg-base-100 shadow-md p-6 rounded-lg  lg:mb-40">
      <progress
        className="progress progress-primary w-full mb-4"
        value={30}
        max="100"
      ></progress>

      <h1 className="text-xl font-bold text-info-content mb-6">Profil</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex-1">
          <label className="label text-base-content">Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            value={description}
            placeholder="Décrivez-vous en quelques lignes..."
            className="textarea textarea-bordered w-full text-base min-h-[120px] resize-y"
          />
        </div>

        {/* Boutons dans le formulaire */}
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
