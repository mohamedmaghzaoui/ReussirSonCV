import purpleBg from "../../assets/purple_bg.jpg";
import addIcon from "../../assets/add_icon_purple.png";

export const Dashboard = () => {
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
          <div className="card bg-[#D3D3D3] shadow-md p-6 rounded-box text-center h-80 w-70 flex flex-col justify-center items-center">
            <img src={addIcon} alt="Add Icon" className="w-16 h-16 mb-4" />
            <h2 className="text-xl font-bold">Ajouter un CV</h2>
          </div>

          {/* Second Card */}
    <div
      className="card shadow-md rounded-box text-center h-90 w-70 flex flex-col justify-between bg-cover bg-center"
      style={{ backgroundImage: `url(${purpleBg})` }}
    >
      <br />
      <button className="btn btn-neutral mt-4 w-full justify-start">premier cv</button>
    </div>


          {/* Third Card */}
         <div
      className="card shadow-md rounded-box text-center h-90 w-70 flex flex-col justify-between bg-cover bg-center"
      style={{ backgroundImage: `url(${purpleBg})` }}
    >
      <br />
      <button className="btn btn-neutral mt-4 w-full justify-start">premier cv</button>
    </div>

        </div>
      </section>
    </div>
  );
};
