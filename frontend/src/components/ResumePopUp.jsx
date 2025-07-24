import { useState } from "react";
import { useResumes } from "../context/ResumeContext";
import { useUser } from "../context/UserContext";

const ResumePopUp = ({ closePopUp }) => {
  const [resumeName, setResumeName] = useState("");
  const { addResume } = useResumes();
  const [isLoading, setIsLoading] = useState(false);
  useUser

  const handleAdd = async () => {
    setIsLoading(true);
    await addResume({ name: resumeName, theme: "default" });
   
    setIsLoading(false);
    closePopUp();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box p-0 sm:p-4 relative">
        <img
          className="absolute top-4 right-4 w-5 h-5 cursor-pointer"
          src="/close_icon.png"
          alt="Close"
          onClick={closePopUp}
        />
        <h2 className="text-xl font-semibold mb-8 text-center">Ajouter un CV</h2>
        <input
          required
          type="text"
          placeholder="Nom du CV"
          value={resumeName}
          onChange={(e) => setResumeName(e.target.value)}
          className="input input-bordered w-full mb-8"
        />
        <div className="flex justify-end gap-2">
          <button className="btn btn-outline" onClick={closePopUp}>
            Fermer
          </button>
<button
  onClick={handleAdd}
  disabled={isLoading}
  className="btn btn-primary flex items-center justify-center gap-2"
>
  {isLoading ? (
    <span className="loading loading-spinner loading-sm text-neutral " />
  ) : ("Ajouter")}

</button>


        </div>
      </div>
    </div>
  );
};

export default ResumePopUp;
