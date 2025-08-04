import React from 'react'

export const ExperiencesPreview=({data,theme})=> {
  console.log(data)
  return (
    <div className='my-4'>
    <h1 className='text-start font-bold  mb-2'
    style={{
        color:theme
    }}
    >Expériences professionnelles</h1>
    <hr style={{
        borderColor:theme
    }} />

   {data?.map((experience, index) => (
  <div key={index} className="my-5">
    {/* Ligne 1 : École (gauche) | Date (droite) */}
    <div className="flex justify-between items-center">
      <h2 className="text-sm font-bold capitalize">{experience.title}</h2>
      <span className="text-xs font-bold text-right">
        {new Date(experience?.start_date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })} -{" "}
        {experience?.end_date
          ? new Date(experience?.end_date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
          : "Présent"}
      </span>
    </div>

    {/* Ligne 2 : Diplôme (gauche) | Adresse (droite) */}
    <div className="flex justify-between items-center text-xs mt-1">
      <span className="">{experience?.company}</span>
      <span className="text-right">{experience?.address}</span>
    </div>

     {/* Description */}
    {experience?.description && (
      <p className="text-xs my-2" dangerouslySetInnerHTML={{__html:experience.description}}></p>
    )}
  </div>
))}


    </div>
  )
}

