import { useState } from 'react';
import { useUser } from './contexts/UserContext';
import Dashboard from './components/Dashboard';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Landing from './components/Landing';
import'./App.css';

export default function App(){

  const {user} = useUser();
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
            onSwitchToRegister={() => setAuthMode('register')} />
        )}
        {!user && authMode === 'register' && (
          <RegisterForm 
            onSwitchToLogin={() => setAuthMode('login')}/>
        )}
        {user && (
          <Dashboard onLogout={() => setAuthMode(null)} />
        )}
      </main>
      <footer className='footer'>
         <Footer/>
      </footer>
    </div>
  )
}