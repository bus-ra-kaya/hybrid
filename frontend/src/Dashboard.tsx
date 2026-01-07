import Avatar from './Avatar';
import {Menu} from "lucide-react";
import Card from './Card';



export default function Dashboard(){

    return (
        <>
        <nav className='dashboard__nav'>
            
        <Avatar size="sm"/>
        <Menu />

        </nav>
        <main>
        <Card  text="This is the first card I'm working on"
        date={new Date()} likes={4} comments={0}/>
        </main>
        </>
    )
}