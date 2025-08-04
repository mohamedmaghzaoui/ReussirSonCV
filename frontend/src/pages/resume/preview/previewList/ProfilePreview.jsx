import React from 'react'

export const ProfilePreview=({data,theme}) =>{
  return (
    <div>
         <h1 className='text-start font-bold  mb-2'
    style={{
        color:theme
    }}
    >Profil</h1>
      <p className='text-xs'>
        {data?.description}
    </p>
    </div>
  
  )
}

