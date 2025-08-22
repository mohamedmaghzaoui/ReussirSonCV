import { useState } from "react";
import { useResumes } from "../context/ResumeContext";


const ResumePopUp = ({ closePopUp }) => {
  const [resumeName, setResumeName] = useState("");
  const { addResume } = useResumes();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // empêche le reload
    if (!resumeName) return; // sécurité supplémentaire

    setIsLoading(true);
    await addResume({
      name: resumeName,
      theme: {
        font: "Arial",
        color: "#000000",
        background_color: "#FFFFFF",
      },
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
        <h2 className="text-xl font-semibold mb-8 text-center">
          Ajouter un CV
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="label font-medium mb-2 text-base-content">
            Titre du CV
          </label>
          <input
            required
            type="text"
            placeholder="Ex : Mon premier CV"
            value={resumeName}
            onChange={(e) => setResumeName(e.target.value)}
            className="input input-bordered w-full mb-8"
          />

          <div className="flex justify-end gap-2 w-full">
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-neutral flex items-center justify-center gap-2 w-full"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm text-neutral " />
              ) : (
                "Ajouter votre CV"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumePopUp;
