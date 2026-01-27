import { useState } from 'react';
import Dashboard from './components/Dashboard';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Landing from './components/Landing';
import'./App.css';

type User = {
  id: true,
  username: true,
  avatarUrl: true,
}

export default function App(){

  const [user, setUser] = useState<null | User>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);

  return(
    <div className='page'>
      <main className='main'>
        {!user && !authMode && (
          <Landing 
            onLoginClick={() => setAuthMode('login')} 
            onRegisterClick={() => setAuthMode('register')}/>
        )}
        {!user && authMode === 'login' && (
          <LoginForm 
            onSuccess={(u: User) => {setUser(u); setAuthMode(null);}}
            onSwitchToRegister={() => setAuthMode('register')} />
        )}
        {!user && authMode === 'register' && (
          <RegisterForm 
            onSuccess={(u: User) => {setUser(u); setAuthMode(null);}}
            onSwitchToLogin={() => setAuthMode('login')}/>
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