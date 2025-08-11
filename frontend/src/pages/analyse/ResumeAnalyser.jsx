import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HashLoader } from "react-spinners";
import { useResumes } from "../../context/ResumeContext";
const apiUrl = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
import ScoreCircle from "../../components/ScoreCircle";

export const ResumeAnalyser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { resumes } = useResumes();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  // Find resume by id from resumes context
  useEffect(() => {
    const found = resumes.find((r) => r.id === Number(id));
    setResume(found || null);
  }, [id, resumes]);

  // When resume is set, send it to backend for analysis
  useEffect(() => {
    if (!resume) {
      setLoading(false);
      return;
    }

    const fetchAnalysis = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(`${apiUrl}/analyse-cv/`, {
          cv: resume,
        });
        console.log(response);

        // parse analysis JSON string from response

        setAnalysis(response.data.analysis);
      } catch (err) {
        setError(err.response?.data?.error || err.message || "Erreur serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [resume]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        <HashLoader color="#570DF8" size={80} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-3xl mx-auto mt-10 bg-red-100 text-red-700 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Erreur</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="p-6 max-w-3xl mx-auto mt-10 bg-yellow-100 text-yellow-800 rounded-md">
        <p>Aucun CV trouvé avec cet ID ou aucune analyse disponible.</p>
      </div>
    );
  }

  return (
    <div className=" font-sans font-medium max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h1 className="text-3xl font-bold mb-4">Analyse de votre CV</h1>

      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Score global : <ScoreCircle value={analysis.score_global} />
        </h2>
        <button
          onClick={() => navigate(`/dashboard/edit/${resume.id}`)}
          className="btn btn-primary btn-xl"
        >
          Améliorer votre CV
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Points forts */}
        <section>
          <h3 className="text-3xl font-semibold mb-4 text-green-700">
            ✅ Points forts
          </h3>
          <ul className="space-y-3">
            {analysis.points_forts.map((point, idx) => (
              <li
                key={idx}
                className="bg-green-50 border border-green-200 shadow-sm rounded-lg px-4 py-3 text-green-800"
              >
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* Points faibles */}
        <section>
          <h3 className="text-3xl font-semibold mb-4 text-red-700">
            ⚠️ Points faibles
          </h3>
          <ul className="space-y-3">
            {analysis.points_faibles.map((point, idx) => (
              <li
                key={idx}
                className="bg-red-50 border border-red-200 shadow-sm rounded-lg px-4 py-3 text-red-800"
              >
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* Suggestions */}
        <section className="md:col-span-2">
          <h3 className="text-3xl font-semibold mb-4 text-blue-700">
            💡 Suggestions d'amélioration
          </h3>
          <ul className="list-decimal list-inside space-y-3">
            {analysis.suggestions.map((suggestion, idx) => (
              <li
                key={idx}
                className="bg-white border border-gray-200 shadow-sm rounded-lg px-4 py-3 text-gray-800"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </section>

        {/* Fautes d'orthographe */}
        <section className="md:col-span-2">
          <h3 className="text-3xl font-semibold mb-4 text-red-700">
            ✏️ Fautes d'orthographe et grammaire
          </h3>
          <ul className="space-y-3">
            {analysis.orthographe_et_grammaire.map((err, idx) => (
              <li
                key={idx}
                className="bg-red-50 border border-red-200 shadow-sm rounded-lg px-4 py-3 text-red-800"
              >
                {err}
              </li>
            ))}
          </ul>
        </section>

        {/* État des sections */}
        <section className="md:col-span-2">
          <h3 className="text-3xl font-semibold mb-4 text-gray-800">
            📂 État des sections
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {Object.entries(analysis.sections).map(([section, status]) => (
              <li key={section}>
                <strong>{section.replace(/_/g, " ")} :</strong> {status}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
