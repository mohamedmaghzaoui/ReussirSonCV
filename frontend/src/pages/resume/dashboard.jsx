import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import purpleBg from "../../assets/purple_bg.jpg";
import { useNavigate } from 'react-router-dom';

import addIcon from "../../assets/add_icon_purple.png";
const ResumePopUp = React.lazy(() => import("../../components/ResumePopUp"));

import { useResumes } from "../../context/ResumeContext";
export const Dashboard = () => {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState(null);
  const [isPopUpOpen,setIsPopUpOpen]=useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const {resumes,deleteResume}=useResumes()
  console.log(resumes)

  const openPopUp=()=>{
    setIsPopUpOpen(true)
  
  }
  const closePopUp=()=>{
    setIsPopUpOpen(false)
  }

  const handleDelete=async(id)=>{
      setIsLoading(true)
      await deleteResume(id);
      setIsLoading(false)
      setActiveMenu(null);
  }

  const toggleMenu = (index) => {
    setActiveMenu((prev) => (prev === index ? null : index));
  };

  return (
    <div>
      <div className="mt-5 w-full grid grid-cols-1 lg:grid-cols-2 items-center px-6 py-10 gap-10">
        <div className="text-center lg:text-left">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
            Dashboard
          </h1>
          <p className="mt-5 text-info-content font-semibold">
            Commencer Maintenant à créer votre CV pour décrocher votre futur emploi
          </p>
        </div>
      </div>

      <section className="px-6 py-10 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* First Card - Add Resume */}
          <div onClick={openPopUp} className="card cursor-pointer  bg-[#D3D3D3] shadow-md p-6 rounded-box text-center h-80 w-70 flex flex-col justify-center items-center">
            <img src={addIcon} alt="Add Icon" className="w-16 h-16 mb-4" />
            <h2 className="text-xl font-bold">Ajouter un CV</h2>
          </div>

          {/* display resume list */}
      {resumes.map((resume, index) => (
  <div
    key={resume.id}
    className="card shadow-md rounded-box text-center h-90 w-70 flex flex-col justify-end bg-cover bg-center relative"
    style={{ backgroundImage: `url(${purpleBg})` }}
  >
    <div className="relative w-full">
      <div className="flex items-center justify-between w-70 bg-neutral text-neutral-content rounded px-4 py-2">
        <span className="text-left">{resume.name}</span>
        <button onClick={() => toggleMenu(index)}>
          <MoreVertical size={18} />
        </button>
      </div>

      {activeMenu === index && (
        <div className="absolute right-4 top-full mt-2 flex space-x-2 bg-white shadow-md rounded z-20 px-3 py-2">
        <button
  className="px-3 py-1 text-sm font-semibold bg-gray-100 hover:bg-gray-200 rounded"
  onClick={() => navigate(`/dashboard/edit/${resume.id}`)}
>
  Modifier
</button>

          <button
            className="px-3 py-1 text-sm font-semibold bg-red-100 text-red-600 hover:bg-red-200 rounded"
            onClick={ () => {
        handleDelete(resume.id)
            }}
          >
             {isLoading ? (
    <span className="loading loading-spinner loading-sm text-neutral " />
  ) : ("Supprimer")}
          </button>
        </div>
      )}
    </div>
  </div>
))}

          
        </div>
      </section>
      {isPopUpOpen && <ResumePopUp closePopUp={closePopUp}/>}
    </div>
  );
};
