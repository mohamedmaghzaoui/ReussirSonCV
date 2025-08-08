import { Type } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

export const FontSelector = ({ resume, setResume }) => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

 const fonts = [
  "Roboto", "Open Sans", "Lato", "Montserrat", "Source Sans Pro",
  "Poppins", "Inter", "Nunito", "Raleway", "Merriweather",
  "Quicksand", "Lora", "Fira Sans", "Ubuntu", "Bree Serif", "Work Sans",
  "Arial" ,"Default"
];



  // Initialize resume.theme to default values if undefined
  const theme = resume?.theme || {
    font: "Roboto",  // Default font
    color: "#000000", // Default color
    background_color: "#FFFFFF", // Default background color
  };

  const handleFontChange = async (font) => {
    if (loading || font === theme.font) return;

    setLoading(true);
    try {
      await axios.put(`${apiUrl}/cvs/${resume.id}/`, {
        ...resume,
        theme: {
          ...theme,
          font: font,  // Update the font
        },
      });

      setResume({
        ...resume,
        theme: {
          ...theme,
          font: font,
        },
      });
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la police :", err);
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
        <Type className="w-5 h-5" />
        {loading ? (
          <span className="loading loading-spinner loading-sm text-primary" />
        ) : (
          "Police"
        )}
      </div>

      <div
        tabIndex={0}
        className="dropdown-content z-[1] bg-base-100 p-4 mt-2 shadow rounded-box w-52"
      >
        <h2 className="mb-3 text-sm font-semibold">Choisir une police</h2>
        <div className="grid grid-cols-2 gap-4 w-50">
          {fonts.map((font, index) => (
            <div
              key={index}
              onClick={() => handleFontChange(font)}
              className={`cursor-pointer border transition-all duration-150 hover:scale-110 ${
                theme.font === font ? 'ring-2 ring-primary border-black' : ''
              }`}
              style={{ fontFamily: font }}
              title={font}
            >
              {font}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
