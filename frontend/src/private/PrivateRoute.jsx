import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const PrivateRoute = ({ element }) => {
  const { user, loading } = useUser();

  if (loading) {
    // Full page spinner
    return (
      <div className=" w-full flex items-center justify-center bg-gray-100">
        <div className="loading loading-spinner loading-lg text-primary"></div>{" "}
        {/* DaisyUI Spinner */}
      </div>
    );
  }

  return user ? element : <Navigate to="/" />;
};
