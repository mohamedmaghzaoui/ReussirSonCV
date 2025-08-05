
import { PersonalInfoPreview } from './previewList/PersonalInfoPreview'
import { ProfilePreview } from './previewList/ProfilePreview'
import { EducationPreview } from './previewList/EducationPreview'
import { ExperiencesPreview } from './previewList/ExperiencesPreview'
import { ProjectsPreview } from './previewList/ProjectsPreview'
import { SkillsPreview } from './previewList/SkillsPreview'
import { LanguagesPreview } from './previewList/LanguagesPreview'

export const ResumePreview=({resume})=> {

   

  return (
    <div className=' shadow-lg  h-full p-10 border-t-[20px] font-poppins '
    style={{
        borderColor:resume?.theme,
        fontWeight:"500",
        


    }}>
        {/* Personal Detail  */}
            <PersonalInfoPreview theme={resume.theme} data={resume.personal_info} />
            <ProfilePreview theme={resume.theme} data={resume.profile} />
            <EducationPreview theme={resume.theme} data={resume.educations} />
            <ExperiencesPreview theme={resume.theme} data={resume.experiences} />
            <ProjectsPreview theme={resume.theme} data={resume.projects} />
            <SkillsPreview theme={resume.theme} data={resume.skills} />
            <LanguagesPreview theme={resume.theme} data={resume.languages} />
      
    </div>
  )
}

