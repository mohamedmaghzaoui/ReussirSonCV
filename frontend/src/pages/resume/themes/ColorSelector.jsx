import { Palette } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

export const ColorSelector = ({ resume, setResume }) => {
  const [resumeTheme, setResumeTheme] = useState(resume.theme || { color: "", background_color: "", font: "Arial" });
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const colors = [
    "#065F46", "black", "#374151", "#0F766E",
    "#1fb2a6", "#3B82F6", "#570df8", "#FF3371",
    "#2563EB", "#4B3869", "#0F4C81", "#7C2D12",
    "#5733FF", "#4B5563", "#8B5CF6", "#312E81"
  ];

  const handleThemeChange = async (color) => {
    if (loading || color === resumeTheme.color) return;

    setLoading(true);
    try {
      // Update the theme with the new color and keep existing font and background color
      await axios.put(`${apiUrl}/cvs/${resume.id}/`, {
        ...resume,
        theme: {
          ...resume.theme,           // Keep the existing theme properties
          color: color,              // Change the text color (this is the new color)
          background_color: resume.theme.background_color // Keep the existing background color
        }
      });

      // Update local state
      setResumeTheme((prevState) => ({
        ...prevState,
        color: color,
      }));

      setResume({
        ...resume,
        theme: {
          ...resume.theme,
          color: color,
        },
      });
    } catch (err) {
      console.error("Erreur lors de la mise à jour du thème :", err);
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
          "Couleurs"
        )}
      </div>

      <div
        tabIndex={0}
        className="dropdown-content z-[1] bg-base-100 p-4 mt-2 shadow rounded-box w-52"
      >
        <h2 className="mb-3 text-sm font-semibold">Choisir une couleur</h2>
        <div className="grid grid-cols-4 gap-3">
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => handleThemeChange(color)}
              className={`h-6 w-6 rounded-full cursor-pointer border transition-all duration-150 hover:scale-110 ${
                resumeTheme.color === color ? 'ring-2 ring-primary border-black' : ''
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
