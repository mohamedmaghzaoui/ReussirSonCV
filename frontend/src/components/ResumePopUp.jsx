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
   await addResume({
  name: resumeName,
  theme: {
    font: "Arial",  // Default font, change it as needed
    color: "#000000",  // Default text color, change it as needed
    background_color: "#FFFFFF"  // Default background color, change it as needed
  }
});

   
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
         <label className="label font-medium mb-2 text-base-content">Titre de cv</label>
        <input
          required
          type="text"
          placeholder="EX :mon premier cv "
          value={resumeName}
          onChange={(e) => setResumeName(e.target.value)}
          className="input input-bordered w-full mb-8"
        />
        <div className="flex justify-end gap-2 w-full">
       
<button
  onClick={handleAdd}
  disabled={isLoading}
  className="btn btn-neutral flex items-center justify-center gap-2 w-full"
>
  {isLoading ? (
    <span className="loading loading-spinner loading-sm text-neutral " />
  ) : ("Ajouter votre cv")}

</button>


        </div>
      </div>
    </div>
  );
};

export default ResumePopUp;
