import { Link } from 'react-router-dom';
import { SignUp } from '../pages/signUp/signUp';
import { useState } from 'react';
import { Login } from '../pages/Login/login';



export const UnauthenticatedNavbar = ({refetch}) => {

  const [openSignUp,setOpenSignUp]=useState(false)
  const [openLogin,setOpenLogin]=useState(false)
  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Start (Mobile Menu) */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      
            <li><button onClick={()=>{setOpenLogin(true)}} className="btn btn-primary mt-2 ">Login</button></li>
            <li><button onClick={()=>{setOpenSignUp(true)}} className="btn btn-neutral mt-2">  Sign up</button></li>
          </ul>
        </div>
        <Link  to="/" className="btn btn-ghost  font-bold  text-2xl">
       
               <h1 >
        Reussir<span className="text-primary">SonCV</span>
      </h1>
      
         </Link>
      </div>

   

      {/* center (desktop) */}
      <div className="navbar-center hidden lg:flex gap-2">
      
        <button onClick={()=>{setOpenLogin(true)}} className="btn btn-primary mr-5 ml-10 btn-block">Login</button>
        <button onClick={()=>{setOpenSignUp(true)}} className="btn btn-neutral btn-block">Sign up</button>
      </div>
     {openSignUp &&  <SignUp setOpenSignUp={setOpenSignUp} />}
     {openLogin &&  <Login refetch={refetch} setOpenLogin={setOpenLogin} />}
     
    </div>
  );
};
