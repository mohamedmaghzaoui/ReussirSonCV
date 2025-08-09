import React from "react";

export const SkillsPreview = ({ data, theme }) => {
  return (
    <div className="my-3">
      <h1 className="text-start font-bold mb-2" style={{ color: theme }}>
        Compétences
      </h1>
      <hr style={{ borderColor: theme }} />

      {/* skills list */}
      <div className="flex flex-wrap gap-2 mt-3">
        {data?.map((skill, index) => (
          <span
            key={index}
            className="text-xs px-3 py-1 rounded-full border font-medium"
            style={{
              borderColor: theme,
              color: theme,
            }}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};
