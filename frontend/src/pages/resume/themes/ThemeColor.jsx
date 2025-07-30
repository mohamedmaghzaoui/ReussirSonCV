import { LayoutList } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const ThemeColor = ({ resume}) => {
  console.log(resume)
  const [resumeTheme, setResumeTheme] = useState(resume.theme || "");
  const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const colors = [
    "#34d399", "#FF5733", "#3abff8", "#f000b8",
    "#1fb2a6", "#FF7133", "#570df8", "#FF3371",
    "#335AFF", "#71FF33", "#3371FF", "#33FFA1",
    "#5733FF", "#7133FF", "#33FF5A", "#33A1FF"
  ];

  const handleThemeChange = async (color) => {
    if (loading || color === resumeTheme) return;

    setLoading(true);
    try {
      await axios.put(`${apiUrl}/cvs/${resume.id}/`, {
        ...resume,
        theme: color,
      });
      setResumeTheme(color);
      
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
        <LayoutList className="w-5 h-5" />
        {loading ? (
          <span className="loading loading-spinner loading-sm text-primary" />
        ) : (
          "Thèmes"
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
                resumeTheme === color ? 'ring-2 ring-primary border-black' : ''
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

export default ThemeColor;
