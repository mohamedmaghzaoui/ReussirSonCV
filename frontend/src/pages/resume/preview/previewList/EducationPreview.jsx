import React from 'react'

export const EducationPreview=({data,theme})=> {
  console.log(data)
  return (
    <div className='my-6'>
    <h1 className='text-start font-bold  mb-2'
    style={{
        color:theme
    }}
    >Formation</h1>
    <hr style={{
        borderColor:theme
    }} />

   {data?.map((education, index) => (
  <div key={index} className="my-5">
    {/* Ligne 1 : École (gauche) | Date (droite) */}
    <div className="flex justify-between items-center">
      <h2 className="text-sm font-bold capitalize">{education.institution}</h2>
      <span className="text-xs font-bold text-right">
        {new Date(education?.start_date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })} -{" "}
        {education?.end_date
          ? new Date(education?.end_date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
          : "Présent"}
      </span>
    </div>

    {/* Ligne 2 : Diplôme (gauche) | Adresse (droite) */}
    <div className="flex justify-between items-center text-xs mt-1">
      <span className="">{education?.degree}</span>
      <span className="text-right">{education?.address}</span>
    </div>

    {/* Description */}
    {education?.description && (
      <p className="text-xs my-2" dangerouslySetInnerHTML={{__html:education.description}}></p>
    )}
  </div>
))}


    </div>
  )
}

