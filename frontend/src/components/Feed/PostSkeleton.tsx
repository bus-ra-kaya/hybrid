export const PostSkeleton = () => {
return (
    <article 
      className='post post__skeleton'
      aria-busy="true"
      aria-label="Loading posts"
    >
      <div className='post__header'>
        <div className='post__avatar skeleton'></div>
        <span className='post__username skeleton'></span>
        <time className='post__date skeleton'></time>
      </div>
      <p className='post__content skeleton'></p>
      
      <div className='post__actions'>
        <button className='skeleton' disabled aria-label="Like button loading"></button>
        <button className='skeleton' disabled aria-label="Comments button loading"></button>
      </div>
    </article>
  );
};