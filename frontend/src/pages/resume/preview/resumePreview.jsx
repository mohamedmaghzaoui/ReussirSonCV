// ResumePreview.jsx
const ResumePreview = ({resume}) => {
  return (
    <div className="bg-white text-black shadow-md p-6 rounded-lg w-full max-w-xl mx-auto mt-6 border border-base-200">
 <h1
  className="text-2xl font-bold mb-2"
  style={{ color: resume.theme }}
>
  Jean Dupont
</h1>

      <p className="text-sm text-gray-700">exemple@email.com</p>
      <p className="text-sm text-gray-700">+33 6 00 00 00 00</p>
      <p className="text-sm text-gray-700">123 Rue Exemple, Paris</p>
    </div>
  );
};

export default ResumePreview;
