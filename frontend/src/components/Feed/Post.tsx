import Avatar from '../Avatar';
import {Heart, MessagesSquare } from "lucide-react";
import { getRelativeDate } from '../../utils/relativeTime';
import s from '../../styles/Feed.module.css';

type PostProps = {
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
    <article className={s.post}>
      <div className={s.postHeader}>
        <Avatar src={avatar} name={username} size="sm" />
        <span className={s.postUsername}>{username}</span>
        <time
          className={s.postDate}
          dateTime={parsedDate.toISOString()}
        >
          {getRelativeDate(parsedDate)}
        </time>
      </div>

      <p className={s.postContent}>{text}</p>

      <div className={s.postActions}>
        <button aria-label={`Like post by ${username}`}>
          <Heart />{likes}
        </button>
        <button aria-label={`View ${comments} comments on post by ${username}`}>
          <MessagesSquare />{comments}
        </button>
      </div>
    </article>

  )
}