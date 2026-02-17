import PostFeed from './Feed/PostFeed';
import NewPost from './Feed/NewPost';
import UserDropdown from './UserDropdown';
import UserProfile from './Profile';
import {Search, House, PenTool, MessageCircle} from 'lucide-react';
import s from '../styles/Dashboard.module.css';
import { useState } from 'react';

type DashboardProps = {
  onLogout: () => void
}

export default function Dashboard({onLogout}:DashboardProps){

  const [view, setView] = useState< 'feed' | 'newPost' | 'profile'>('feed');

  const onProfileClick = () => {
    setView('profile');
  }

  return (
    <div className={s.dashboard}>
      <div className={s.header}>
        <span>Hybrid</span>
        <div className={s.headerActions}>
					<Search/>
          <UserDropdown onLogout={onLogout} onProfileClick={onProfileClick}/>
        </div>
      </div>
      <div className={s.sidebarLeft}>
            <button onClick={() => setView("feed")}> 
							<House/> Home
						</button>
            <button onClick={() => setView("newPost")}>
							<PenTool/> Post
						</button>
						<button>
							<MessageCircle/> Messages
						</button>
      </div>
      <main className={s.mainContent}>
      {view === "feed" && ( <PostFeed />)}
      {view === "newPost" && ( <NewPost />)}
      {view === "profile" && ( <UserProfile />)}
      </main>
    </div>
    )
}