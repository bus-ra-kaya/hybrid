import Avatar from './Avatar';
import {Search, House, PenTool, MessageCircle} from "lucide-react";
import PostFeed from './Feed/PostFeed';

export default function Dashboard(){

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
            <button> 
							<House/> Home
						</button>
            <button>
							<PenTool/> Post
						</button>
						<button>
							<MessageCircle/> Messages
						</button>
      </div>
      <PostFeed />
    </div>
    )
}