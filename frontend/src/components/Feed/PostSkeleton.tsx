import s from '../../styles/Feed.module.css';

export const PostSkeleton = () => {
  return (
    <article
      className={`${s.post} ${s.postSkeleton}`}
      aria-busy="true"
      aria-label="Loading posts"
    >
    <div className={s.postHeader}>
      <div className={`${s.postAvatar} ${s.skeleton}`}></div>
      <span className={`${s.postUsername} ${s.skeleton}`}></span>
      <time className={`${s.postDate} ${s.skeleton}`}></time>
    </div>

    <p className={`${s.postContent} ${s.skeleton}`}></p>

    <div className={s.postActions}>
      <button
        className={s.skeleton}
        disabled
        aria-label="Like button loading"/>
      <button
        className={s.skeleton}
        disabled
        aria-label="Comments button loading"/>
    </div>
    </article>
  );
};
