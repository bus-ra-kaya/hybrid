import AvatarUpload from "./AvatarUpload";
import { useUser } from "../contexts/UserContext";
import { PencilLine } from 'lucide-react';
import s from '../styles/Profile.module.css';


// find a way to switch between when the profile is shown and when it is being updated

export default function UserProfile(){

  const { user } = useUser();

  return(
    <div className={s.profileContainer}>
      <AvatarUpload /> 
      <div className={s.infoContainer}>
        <div className={s.header}>
          <div className={s.headerTop}>
            <span className={s.username}>{user?.username}</span>
            <button>
              <PencilLine />
            </button>
          </div>
          <span className={s.status}>Yawn</span>
        </div>
       <div className={s.meta}>
          <span>Joined 2 weeks ago</span>
          <span>Played 10 games total </span>
          <span>2 posts</span>
       </div>
      
      </div>
    </div>
  )
}