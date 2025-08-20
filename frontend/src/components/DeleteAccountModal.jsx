import React from "react";

const DeleteAccountModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-bold mb-4 text-center text-red-600">
          Supprimer le compte
        </h2>
        <p className="mb-6 text-center">
          Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
          irréversible.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="btn btn-error"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            Supprimer
          </button>
          <button className="btn btn-outline" onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
