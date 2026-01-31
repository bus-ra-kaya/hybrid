import PostFeed from './Feed/PostFeed';
import NewPost from './Feed/NewPost';
import UserDropdown from './UserDropdown';
import {Search, House, PenTool, MessageCircle} from 'lucide-react';
import s from '../styles/Dashboard.module.css';
import { useState } from 'react';

type DashboardProps = {
  onLogout: () => void
}

export default function Dashboard({onLogout}:DashboardProps){

  const [view, setView] = useState< 'feed' | 'newpost'>('feed');
  return (
    <div className={s.dashboard}>
      <div className={s.header}>
        <span>Hybrid</span>
        <div className={s.headerActions}>
					<Search/>
          <UserDropdown onLogout={onLogout}/>
        </div>
      </div>
      <div className={s.sidebarLeft}>
            <button onClick={() => setView("feed")}> 
							<House/> Home
						</button>
            <button onClick={() => setView("newpost")}>
							<PenTool/> Post
						</button>
						<button>
							<MessageCircle/> Messages
						</button>
      </div>
      <main className={s.mainContent}>
      {view === "feed" 
      ? <PostFeed/>
      : <NewPost />
      }
      </main>
    </div>
    )
}