import React from 'react';
import {
  Phone,
  Mail,
  Linkedin,
  Globe,
  Calendar,
} from 'lucide-react';

export const PersonalInfoPreview = ({ data, theme  }) => {
  return (
    <div>
    
      {/* En-tête avec image + nom + titre */}
   <div className="flex items-center gap-4 mb-1 ml-[25%] mb-4">
   
  {/* Image */}
  {data?.user_picture && (
    <img
      src={
        typeof data.user_picture === 'string'
          ? data.user_picture
          : URL.createObjectURL(data.user_picture)
      }
      alt="Profil"
      className="w-20 h-20 object-cover rounded-full border-2 shrink-0"
      style={{ borderColor: theme }}
    />
  )}

  {/* Nom et titre */}
  <div>
    <h2 className="font-bold text-xl" style={{ color: theme }}>
      {data?.first_name} {data?.last_name}
    </h2>
    <h2 className="text-xl font-bold">{data?.title}</h2>
  </div>
</div>


    

      {/* Infos de contact */}
      
      <div className="flex flex-wrap justify-center gap-2 px-2 text-xs">
      
        {data?.phone_number && (
          <div className="flex items-center gap-1" >
            <Phone size={14} /> {data.phone_number}
          </div>
        )}
        {data?.email && (
          <div className="flex items-center gap-1" >
            <Mail size={14} /> {data.email}
          </div>
        )}
        {data?.age && (
          <div className="flex items-center gap-1" >
            <Calendar size={14} /> {data.age} ans
          </div>
        )}
        {data?.linkedin && (
          <div className="flex items-center gap-1" >
            <Linkedin size={14} />
            <a
              href={data.linkedin}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              LinkedIn
            </a>
          </div>
        )}
        {data?.website && (
          <div className="flex items-center gap-1" >
            <Globe size={14} />
            <a
              href={data.website}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Site web
            </a>
          </div>
        )}
        {data?.portfolio && (
          <div className="flex items-center gap-1" >
            <Globe size={14} />
            <a
              href={data.portfolio}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Portfolio
            </a>
          </div>
        )}
      </div>
        {/* Adresse */}
      {data?.address && (
        <p
          className=" text-xs  text-center mb-2"
          
        >
          {data.address}
        </p>
      )}

      <hr className="border-[1.5px] my-2" style={{ borderColor: theme }} />
    </div>
  );
};
