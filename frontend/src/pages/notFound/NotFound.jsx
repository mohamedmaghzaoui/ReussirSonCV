import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-100 text-center px-4 py-10">
      <div className="space-y-6">
        <h1 className="text-6xl font-extrabold text-red-500">404</h1>
        <p className="text-xl text-gray-700">
          Oups ! La page que vous cherchez n'existe pas.
        </p>
        <Link to="/" className="btn btn-primary px-6 py-3 text-white text-lg">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
