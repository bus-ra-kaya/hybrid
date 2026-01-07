import Avatar from './Avatar';
import { getRelativeDate } from './utils/relativeTime';

type CardProps = {
  text: string,
  date: Date,
  likes: number,
  comments: number,
}

export default function Card({text, date, likes, comments}:CardProps){

  return(
    <div className='card'>
      <div className='card__header'>
        <Avatar />
        <span className='card__date'>{getRelativeDate(date)}</span>
      </div>
      {text}
      <div className='card__footer'>
        {likes}
        {comments}  
      </div>
    </div>
  )
}