import { PersonalInfoPreview } from "./previewList/PersonalInfoPreview.jsx";
import { ProfilePreview } from "./previewList/ProfilePreview.jsx";
import { EducationPreview } from "./previewList/EducationPreview.jsx";
import { ExperiencesPreview } from "./previewList/ExperiencesPreview.jsx";
import { ProjectsPreview } from "./previewList/ProjectsPreview.jsx";
import { SkillsPreview } from "./previewList/SkillsPreview.jsx";
import { LanguagesPreview } from "./previewList/LanguagesPreview.jsx";

export const ResumePreview = ({ resume }) => {
  const theme = resume?.theme;
  const sectionOrder = resume?.section_order || [
    "profile",
    "education",
    "experience",
    "projects",
    "skills",
    "languages",
  ];
  const hasData = (data) => {
  if (!data) return false;
  if (Array.isArray(data)) return data.length > 0;
  if (typeof data === "object") return Object.keys(data).length > 0;
  return true; // pour les autres types (string, number), tu peux ajuster si besoin
};
const sectionComponents = {
  personal_info: hasData(resume.personal_info) ? (
    <PersonalInfoPreview theme={theme.color} data={resume.personal_info} />
  ) : null,
  profile: hasData(resume.profile) ? (
    <ProfilePreview theme={theme.color} data={resume.profile} />
  ) : null,
  education: hasData(resume.educations) ? (
    <EducationPreview theme={theme.color} data={resume.educations} />
  ) : null,
  experience: hasData(resume.experiences) ? (
    <ExperiencesPreview theme={theme.color} data={resume.experiences} />
  ) : null,
  projects: hasData(resume.projects) ? (
    <ProjectsPreview theme={theme.color} data={resume.projects} />
  ) : null,
  skills: hasData(resume.skills) ? (
    <SkillsPreview theme={theme.color} data={resume.skills} />
  ) : null,
  languages: hasData(resume.languages) ? (
    <LanguagesPreview theme={theme.color} data={resume.languages} />
  ) : null,
};

  return (
    <div
      className="h-full 	 p-10 p-6 md:p-10 border-t-[20px] "
      style={{
        color: "black !important",
        borderColor: theme.color,
        fontWeight: "500",
        backgroundColor: theme.background_color,
        fontFamily: theme.font !== "Default" ? theme.font : "",
      }}
    >
      {[
        "personal_info", // Always first
        ...sectionOrder.filter((s) => s !== "personal_info"),
      ].map((key) => sectionComponents[key])}
    </div>
  );
};
