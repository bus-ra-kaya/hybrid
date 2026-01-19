import Avatar from './Avatar';
import {Menu, Search} from "lucide-react";
import PostFeed from './PostFeed';

export default function Dashboard(){


    return (
        <div className='page'>
            <div className='topbar'>
                <span className="logo">Hybrid</span>
                 <Search/>

            </div>
        <div className='left-sidebar'>
                <Menu />
            <Avatar size="sm"/>
            <button>Home</button>
            <button>Messages</button>
            <button>Post</button>
        </div>
         <main>
        <PostFeed />
        </main>
        </div>
    )
}