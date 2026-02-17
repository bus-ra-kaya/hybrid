import Avatar from "./Avatar";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export default function AvatarUpload(){

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  return(
    <div className='avatar-upload-container'>

      <div className="avatar-wrapper">

        <div className="avatar-preview">
            <Avatar size='lg' />
        </div>

      </div>
      
    </div>
  )
};