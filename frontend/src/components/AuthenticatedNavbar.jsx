import { useState } from "react";
import userIcon from "../assets/user_icon.jpg";
import { Link } from 'react-router-dom';
export const AuthenticatedNavbar = ({ user, logout }) => {
  const [isLoading,setIsLoading]=useState(false)
  const handleLogout=async()=>{
    setIsLoading(true)
    await logout()
    setIsLoading(false)
  }
  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Start */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost font-bold text-2xl">
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
          <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer">
            <img
              src={userIcon}
              alt="User Icon"
              className="w-8 h-8 rounded-full object-cover"
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
              <button className="text-black hover:bg-black hover:text-white py-2 rounded">
                Profile
              </button>
              {console.log("user",user)}
        

                    <button
            className="text-red-500 hover:bg-red-100 py-2 rounded"
            onClick={ () => {
        handleLogout()
            }}
          >
             {isLoading ? (
    <span className="loading loading-spinner loading-sm text-neutral text- " />
  ) : ("Deconnecter")}
          </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
