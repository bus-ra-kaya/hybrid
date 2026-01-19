import { useState, useEffect, useRef} from 'react';
import Card from './Card';

type Post = {
  id: number,
  username: string,
  avatarUrl: string,
  content: string,
  createdAt: string,
  updatedAt: string,
  likes: number,
  comments: number
}

export default function PostFeed(){

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  const isFetchingRef = useRef(false);

  const fetchPosts = async () => {
    if(isFetchingRef.current) return;
    isFetchingRef.current = true;
    setIsLoading(true);

    try{
      const res = await fetch(
      `http://localhost:8000/posts?offset=${offset}`);

      const data = await res.json();

      setPosts(prev => [...prev, ...data.data]);
      setHasNextPage(data.hasNextPage);
      setOffset(prev => prev + 10);

    }catch(err){
      console.error(err);
    }
    finally{
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  },[])

  return(
    <>
    {posts.map(p => {
      return(
          <Card key={p.id} username={p.username} avatar={p.avatarUrl} text={p.content} date={p.createdAt}comments={p.comments} likes={p.likes}/>
            )
      })}

    {isLoading && <p>Loading...</p> }

    {hasNextPage && (
      <button onClick={fetchPosts} disabled={isLoading}>
        {isLoading ? "Loading..." : "Display More"}
      </button>
    )}
    
    </>
  )
}