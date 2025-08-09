import React from "react";

export const ProjectsPreview = ({ data, theme }) => {
  console.log(data);
  return (
    <div className="my-3">
      <h1
        className="text-start font-bold  mb-2"
        style={{
          color: theme,
        }}
      >
        Projets
      </h1>
      <hr
        style={{
          borderColor: theme,
        }}
      />

      {data?.map((project, index) => (
        <div key={index} className="my-3">
          {/* Ligne 1 : École (gauche) | Date (droite) */}
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold capitalize">{project.title}</h2>
            <span className="text-xs font-bold text-right">
              {new Date(project?.start_date).toLocaleDateString("fr-FR", {
                month: "long",
                year: "numeric",
              })}{" "}
              -{" "}
              {project?.end_date
                ? new Date(project?.end_date).toLocaleDateString("fr-FR", {
                    month: "long",
                    year: "numeric",
                  })
                : "Présent"}
            </span>
          </div>

          {/* Description */}
          {project?.description && (
            <p
              className="text-xs my-2"
              dangerouslySetInnerHTML={{ __html: project.description }}
            ></p>
          )}
        </div>
      ))}
    </div>
  );
};
