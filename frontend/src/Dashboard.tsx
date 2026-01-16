import Avatar from './Avatar';
import {Menu} from "lucide-react";
import Card from './Card';
import { useEffect, useState } from 'react';

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

export default function Dashboard(){

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/posts")
        .then(res => res.json())
        .then(data => {console.log(data)
            setPosts(data)})
    },[])

    return (
        <>
        <nav className='dashboard__nav'>
            
        <Avatar size="sm"/>
        <Menu />

        </nav>
        <main>
        {posts.map(p => {
            return(
                <Card key={p.id} username={p.username} avatar={p.avatarUrl} text={p.content} date={p.createdAt}
                comments={p.comments} likes={p.likes}/>
            )
        })}
        </main>
        </>
    )
}