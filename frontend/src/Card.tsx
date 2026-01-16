import Avatar from './Avatar';
import {Heart, MessagesSquare } from "lucide-react";
import { getRelativeDate } from './utils/relativeTime';

type CardProps = {
  text: string,
  date: string,
  likes: number,
  comments: number,
  avatar: string,
  username: string
}

export default function Card({text, date, likes, comments, avatar, username}:CardProps){

  const parsedDate = new Date(date);

  return(
    <div className='card'>
      <div className='card__header'>
        <Avatar src={avatar} name={username} size="sm" />
        {username}
        <span className='card__date'>{getRelativeDate(parsedDate)}</span>
      </div>
      {text}
      <div className='card__footer'>
        <Heart/>{likes}
        <MessagesSquare/>{comments}  
      </div>
    </div>
  )
}