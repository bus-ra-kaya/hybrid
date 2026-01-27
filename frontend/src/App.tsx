import { useState } from 'react';
import Dashboard from './components/Dashboard';
import AuthForm from './components/AuthForm';
import Footer from './components/Footer';
import Landing from './components/Landing';
import'./App.css';

export default function App(){

  const [user, setUser] = useState<null | {name: string}>(null);
  const [showAuth, setShowAuth] = useState(false);

  return(
    <div className='page'>
      <main className='main'>
        {!user && !showAuth && (
          <Landing onLoginClick={() => setShowAuth(true)} />
        )}
        {!user && showAuth && (
          <AuthForm onSuccess={(u) => {setUser(u); setShowAuth(false)}} />
        )}
        {user && (
          <Dashboard user={user} onLogout={() => setUser(null)} />
        )}
      </main>
      <footer className='footer'>
         <Footer/>
      </footer>
    </div>
  )
}