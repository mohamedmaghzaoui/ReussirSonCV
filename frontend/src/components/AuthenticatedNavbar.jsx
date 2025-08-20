import { useState } from "react";
import userIcon from "../assets/user_icon.jpg";
import { Link } from "react-router-dom";
export const AuthenticatedNavbar = ({ user, logout }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
  };
  console.log(user);

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Start */}
      <div className="navbar-start">
     <Link to="/" className="btn btn-ghost font-bold text-2xl items-center gap-2">
  <img
    src="/logo.png"
    alt="site preview"
    className="h-15 w-auto" // height matches text, keeps aspect ratio
  />
  <h1>
    Reussir<span className="text-primary">SonCV</span>
  </h1>
</Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex"></div>

      {/* End - User Info */}

      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={
                user?.profile_picture
                  ? `http://127.0.0.1:8000/${user.profile_picture}`
                  : userIcon
              }
              alt="User Icon"
              className="w-8 h-8 rounded-full object-contain  "
            />

            <span className="font-medium hidden sm:inline">
              {user?.first_name || user?.email}
            </span>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
          >
            <li>
              <Link
                to={"/profile"}
                className="text-black hover:bg-black hover:text-white py-2 rounded"
              >
                Profile
              </Link>

              <button
                className="text-red-500 hover:bg-red-100 py-2 rounded"
                onClick={() => {
                  handleLogout();
                }}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm text-neutral text- " />
                ) : (
                  "Deconnecter"
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
