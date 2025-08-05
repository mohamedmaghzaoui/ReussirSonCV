import React from 'react';

export const LanguagesPreview = ({ data, theme }) => {
  return (
    <div className="my-3">
      <h1
        className="text-start font-bold mb-2"
        style={{ color: theme }}
      >
        Langues
      </h1>
      <hr style={{ borderColor: theme }} />

      <ul className="mt-3 space-y-1">
        {data?.map((lang, index) => (
      <li key={index} className="text-sm flex items-center gap-1">
  <span className="capitalize text-xs  font-bold">{lang.name} :</span>
  <span className="font-medium   text-xs">{lang.level}.</span>
</li>

        ))}
      </ul>
    </div>
  );
};
