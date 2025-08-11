import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { HashLoader } from "react-spinners";

export const PrivateRoute = ({ element }) => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        <HashLoader color="#570DF8" />
      </div>
    );
  }

  return user ? element : <Navigate to="/" />;
};
