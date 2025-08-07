// ResumeForm.jsx
import React, { useState } from 'react';
import { FirstPersonalInfoForm} from './formList/FirstPersonalInfoForm';
import { SecondPersonalInfoForm } from './formList/SecondPersonalInfoForm';
import { ProfileForm } from './formList/ProfileForm';
import { EducationForm } from './formList/EducationForm';
import { ExperienceForm } from './formList/ExperienceForm';
import { ProjectForm } from './formList/ProjectForm';
import { SkillForm } from './formList/SkillForm';
import { LanguageForm } from './formList/LanguageForm';
import { SectionOrderForm } from './formList/SectionOrderForm';


export const ResumeForm = ({setResume,resume}) => {
  const [step, setStep] = useState(1);
  const goToNextStep = () => setStep((prev) => prev + 1);
  const goToPrevStep = () => setStep((prev) => prev - 1);
  console.log(step)
  return(
   <>
    {step === 1 && (
        <FirstPersonalInfoForm
          resume={resume}
          setResume={setResume}
          goToNextStep={goToNextStep}
         
        />
      )}
      {step === 2 && (
        <SecondPersonalInfoForm
          resume={resume}
          setResume={setResume}
          
          goToPrevStep={goToPrevStep}
          goToNextStep={goToNextStep}

        />
      )}
      {step === 3 && (
        <ProfileForm
          resume={resume}
          setResume={setResume}
          goToPrevStep={goToPrevStep}
          goToNextStep={goToNextStep}

        />
      )}
      {step === 4 && (
        <EducationForm
          resume={resume}
          setResume={setResume}
          goToPrevStep={goToPrevStep}
          goToNextStep={goToNextStep}

        />
      )}
      {step === 5&& (
        <ExperienceForm
          resume={resume}
          setResume={setResume}
          goToPrevStep={goToPrevStep}
          goToNextStep={goToNextStep}

        />
      )}
      {step === 6&& (
        <ProjectForm
          resume={resume}
          setResume={setResume}
          goToPrevStep={goToPrevStep}
          goToNextStep={goToNextStep}

        />
      )}
      {step === 7&& (
        <SkillForm
          resume={resume}
          setResume={setResume}
          goToPrevStep={goToPrevStep}
          goToNextStep={goToNextStep}

        />
      )}
      {step === 8&& (
        <LanguageForm
          resume={resume}
          setResume={setResume}
          goToPrevStep={goToPrevStep}
          goToNextStep={goToNextStep}

        />
      )}
      {step === 9&& (
        <SectionOrderForm
          resume={resume}
          setResume={setResume}
          goToPrevStep={goToPrevStep}
          goToNextStep={goToNextStep}

        />
      )}
   </> 
  )
  
};
