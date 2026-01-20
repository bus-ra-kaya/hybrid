import Avatar from '../Avatar';
import {Heart, MessagesSquare } from "lucide-react";
import { getRelativeDate } from '../../utils/relativeTime';

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
    <article className='post'>
      <div className='post__header'>
        <Avatar src={avatar} name={username} size="sm" />
        <span className='post__username'>{username}</span>
        <time className='post__date' dateTime={parsedDate.toISOString()}>
          {getRelativeDate(parsedDate)}
        </time>
      </div>
      <p className='post__content'>{text}</p>
      <div className='post__actions'>
        <button aria-label={`Like post by ${username}`}>
          <Heart/>{likes}
        </button>
        <button aria-label={`View ${comments} comments on post by ${username}`}>
          <MessagesSquare/>{comments} 
        </button> 
      </div>
    </article>
  )
}