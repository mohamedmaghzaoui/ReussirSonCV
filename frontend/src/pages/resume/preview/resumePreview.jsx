import { PersonalInfoPreview } from './previewList/PersonalInfoPreview'
import { ProfilePreview } from './previewList/ProfilePreview'
import { EducationPreview } from './previewList/EducationPreview'
import { ExperiencesPreview } from './previewList/ExperiencesPreview'
import { ProjectsPreview } from './previewList/ProjectsPreview'
import { SkillsPreview } from './previewList/SkillsPreview'
import { LanguagesPreview } from './previewList/LanguagesPreview'

export const ResumePreview = ({ resume }) => {
  const theme = resume?.theme;
  const sectionOrder = resume?.section_order || [
    'profile',
    'education',
    'experience',
    'projects',
    'skills',
    'languages',
  ];

  const sectionComponents = {
    personal_info: <PersonalInfoPreview theme={theme} data={resume.personal_info} />,
    profile: <ProfilePreview theme={theme} data={resume.profile} />,
    education: <EducationPreview theme={theme} data={resume.educations} />,
    experience: <ExperiencesPreview theme={theme} data={resume.experiences} />,
    projects: <ProjectsPreview theme={theme} data={resume.projects} />,
    skills: <SkillsPreview theme={theme} data={resume.skills} />,
    languages: <LanguagesPreview theme={theme} data={resume.languages} />,
  };

  return (
    <div
      className="h-full p-6 md:p-10 border-t-[20px] font-poppins"
      style={{
        borderColor: theme,
        fontWeight: '500',
      }}
    >
      {[
        'personal_info', // Always first
        ...sectionOrder.filter((s) => s !== 'personal_info'),
      ].map((key) => sectionComponents[key])}
    </div>
  );
};
