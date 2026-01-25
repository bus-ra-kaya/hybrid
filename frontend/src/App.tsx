import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Landing from './components/Landing';
import './styles/Feed.css'
import'./App.css';

export default function App(){

  const [view, setView] = useState<'guest' | 'loggedIn'>('guest');


  return(
    <div className='page'>
      <main className='main'>
        {view === 'guest'
        ? <Landing />
        :  <Dashboard />}
      </main>
      <footer className='footer'>
         <Footer/>
      </footer>
    </div>
  )
}