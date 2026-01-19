import Avatar from './Avatar';
import {Heart, MessagesSquare } from "lucide-react";
import { getRelativeDate } from '../utils/relativeTime';

interface PostProps {
  readonly text: string;
  readonly date: string;
  readonly likes: number;
  readonly comments: number;
  readonly avatar: string;
  readonly username: string;
}

export default function Post({text, date, likes, comments, avatar, username}:PostProps){

  const parsedDate = new Date(date);

  return(
    <div className='post'>
      <div className='post__header'>
        <Avatar src={avatar} name={username} size="sm" />
        <span className='post__username'>{username}</span>
        <span className='post__date'>{getRelativeDate(parsedDate)}</span>
      </div>
      <p className='post__content'>{text}</p>
      <div className='post__actions'>
        <button>
          <Heart/>{likes}
        </button>
        <button>
          <MessagesSquare/>{comments} 
        </button> 
      </div>
    </div>
  )
}