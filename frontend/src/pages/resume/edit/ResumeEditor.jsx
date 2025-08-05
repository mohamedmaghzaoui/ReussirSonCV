import { useParams } from 'react-router-dom';
import { useResumes } from '../../../context/ResumeContext';
import { useEffect, useState } from 'react';
import ThemeColor from '../themes/ThemeColor';
import { Download, Trash2, BrainCog  } from 'lucide-react';
import { ResumePreview } from '../preview/ResumePreview';
import { ResumeForm } from '../form/ResumeForm';
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export const ResumeEditor = () => {
  
const contentRef = useRef(null)
const reactToPrintFn = useReactToPrint({ contentRef });
  const { id } = useParams();
  const { resumes} = useResumes();
  const [resume, setResume] = useState(null);
  console.log(resume)
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
        <ThemeColor setResume={setResume} resume={resume}/>
        
      </div>

          {/* Resume Form */}
          <ResumeForm  setResume={setResume} resume={resume} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-1/2 space-y-4">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-2 sm:gap-4">
            <button className="btn btn-neutral flex items-center gap-2 w-full sm:w-auto">
              <BrainCog  className="w-4 h-4" />
              Analyser mon CV
            </button>
            <button className="btn btn-outline btn-error flex items-center gap-2 w-full sm:w-auto">
              <Trash2 className="w-4 h-4" />
              Supprimer
            </button>
            <button onClick={reactToPrintFn} className="btn btn-outline btn-primary flex items-center gap-2 w-full sm:w-auto">
              <Download className="w-4 h-4" />
              Télécharger
            </button>
          </div>

          {/* Resume Preview */}
        
          <div className='' ref={contentRef} >  <ResumePreview   resume={resume} /></div>
        </div>
      </div>
    </div>
  );
};
