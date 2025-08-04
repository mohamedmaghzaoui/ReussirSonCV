
import { PersonalInfoPreview } from './previewList/PersonalInfoPreview'
import { ProfilePreview } from './previewList/ProfilePreview'
import { EducationPreview } from './previewList/EducationPreview'
import { ExperiencesPreview } from './previewList/ExperiencesPreview'

function ResumePreview({resume}) {

   

  return (
    <div className='  shadow-lg h-full p-14 border-t-[20px] font-poppins '
    style={{
        borderColor:resume?.theme,
        fontWeight:"500"

    }}>
        {/* Personal Detail  */}
            <PersonalInfoPreview theme={resume.theme} data={resume.personal_info} />
            <ProfilePreview theme={resume.theme} data={resume.profile} />
            <EducationPreview theme={resume.theme} data={resume.educations} />
            <ExperiencesPreview theme={resume.theme} data={resume.experiences} />
      
    </div>
  )
}

export default ResumePreview