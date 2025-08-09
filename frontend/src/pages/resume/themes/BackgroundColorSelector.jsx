import { Palette } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export const BackgroundColorSelector = ({ resume, setResume }) => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const backgroundColors = [
    "#F7F7F7",
    "#F0F4F8",
    "#E6F7FF",
    "#FFF8E1",
    "#FFFFFF",
    "#F1FAF6",
    "#E0F7FA",
    "#FFFBF0",
    "#F9F9F9",
    "#F1F5F9",
    "#FFFAF1",
    "#EAEAEA",
    "#F4F4F4",
    "#D9E8D6",
    "#F2F0F1",
    ,
    "#F7EBFF",
  ];

  const handleBackgroundColorChange = async (color) => {
    if (loading || color === resume.theme.background_color) return;

    setLoading(true);
    try {
      await axios.put(`${apiUrl}/cvs/${resume.id}/`, {
        ...resume,
        theme: {
          ...resume.theme,
          background_color: color, // Update the background color
        },
      });

      setResume({
        ...resume,
        theme: {
          ...resume.theme,
          background_color: color,
        },
      });
    } catch (err) {
      console.error(
        "Erreur lors de la mise à jour de la couleur d'arrière-plan :",
        err,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dropdown ml-10 dropdown-bottom lg:dropdown-end w-full lg:w-auto">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-outline w-full sm:w-auto text-base font-medium flex items-center gap-2"
      >
        <Palette className="w-5 h-5" />
        {loading ? (
          <span className="loading loading-spinner loading-sm text-primary" />
        ) : (
          "Fond"
        )}
      </div>

      <div
        tabIndex={0}
        className="dropdown-content z-[1] bg-base-100 p-4 mt-2 shadow rounded-box w-52"
      >
        <h2 className="mb-3 text-sm font-semibold">
          Choisir une couleur d'arrière-plan
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {backgroundColors.map((color, index) => (
            <div
              key={index}
              onClick={() => handleBackgroundColorChange(color)}
              className={`h-6 w-6 rounded-full cursor-pointer border transition-all duration-150 hover:scale-110 ${
                resume.theme.background_color === color
                  ? "ring-2 ring-primary border-black"
                  : ""
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
