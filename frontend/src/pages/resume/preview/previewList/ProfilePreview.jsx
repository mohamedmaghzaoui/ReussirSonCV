import React from "react";

export const ProfilePreview = ({ data, theme }) => {
  return (
    <div className="my-3">
      <h1
        className="text-start font-bold  mb-2"
        style={{
          color: theme,
        }}
      >
        Profil
      </h1>
      <hr
        style={{
          borderColor: theme,
        }}
      />
      <p className="text-xs my-3">{data?.description}</p>
    </div>
  );
};
