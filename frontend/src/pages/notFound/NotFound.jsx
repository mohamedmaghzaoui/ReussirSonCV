import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <div className="space-y-6">
        <h1 className="text-6xl font-extrabold text-red-500">404</h1>
        <p className="text-xl text-gray-700">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary px-6 py-3 text-white text-lg">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
