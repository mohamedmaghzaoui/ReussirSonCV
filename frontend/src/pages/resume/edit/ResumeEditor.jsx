import { useParams } from "react-router-dom";
import { useResumes } from "../../../context/ResumeContext";
import { useEffect, useState } from "react";
import { ColorSelector } from "../themes/ColorSelector";
import { BackgroundColorSelector } from "../themes/BackgroundColorSelector";
import { FontSelector } from "../themes/FontSelector";
import { Download, CheckCircle, Home } from "lucide-react";
import { ResumePreview } from "../preview/ResumePreview";
import { ResumeForm } from "../form/ResumeForm";
import { useReactToPrint } from "react-to-print";
import { usePDF } from 'react-to-pdf';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const ResumeEditor = () => {
  
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const { id } = useParams();
  const { resumes } = useResumes();
  const [resume, setResume] = useState(null);
  console.log(resume);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = resumes.find((r) => r.id === Number(id));
    setResume(found || null);
    setLoading(false);
  }, [resumes, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="loading loading-spinner loading-lg text-secondary" />
      </div>
    );
  }

  if (!resume) {
    return <p className="text-center text-error mt-10">Ce CV n'existe pas.</p>;
  }

  return (
    <div className="px-4 w-full py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT COLUMN */}
        <div className="w-25 lg:w-1/2 space-y-4">
          {/* Resume name + theme */}
          <div className="w-full lg:w-1/2 flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <h1 className="text-3xl font-bold text-neutral">{resume.name}</h1>
            <ColorSelector setResume={setResume} resume={resume} />
            <BackgroundColorSelector setResume={setResume} resume={resume} />
            <FontSelector setResume={setResume} resume={resume} />
          </div>

          {/* Resume Form */}
          <ResumeForm setResume={setResume} resume={resume} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-1/2 space-y-4">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-2 sm:gap-4">
            <Link
              to={"/dashboard"}
              className="btn btn-neutral flex items-center gap-2 w-full sm:w-auto"
            >
              <Home className="w-4 h-4" />
              Accueil
            </Link>
            <button
              onClick={() => navigate(`/dashboard/analyse/${resume.id}`)}
              className="btn  btn-accent flex items-center gap-2 w-full sm:w-auto"
            >
              <CheckCircle className="w-4 h-4" />
              Analyser mon CV
            </button>

            <button
              onClick={reactToPrintFn}
              className="btn btn-outline btn-primary flex items-center gap-2 w-full sm:w-auto"
            >
              <Download className="w-4 h-4" />
              Télécharger
            </button>
          </div>

          {/* Resume Preview */}

          <div  ref={contentRef}>
            {" "}
            <ResumePreview resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
};
