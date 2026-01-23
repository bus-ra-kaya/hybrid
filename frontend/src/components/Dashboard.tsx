import Avatar from './Avatar';
import PostFeed from './Feed/PostFeed';
import NewPost from './Feed/NewPost';
import {Search, House, PenTool, MessageCircle} from 'lucide-react';
import { useState } from 'react';


export default function Dashboard(){

  const [view, setView] = useState< "feed" | "newpost">("feed");

  return (
    <div className='page'>
      <div className='header'>
        <span>Hybrid</span>
        <div className='header__actions'>
					<Search/>
					<Avatar size="sm"/>
        </div>
      </div>
      <div className='sidebar__left'>
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
      <main className='main-content'>
      {view === "feed" 
      ? <PostFeed/>
      : <NewPost />
      }
      </main>
    </div>
    )
}