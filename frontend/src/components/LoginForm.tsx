import { useState } from 'react';
import s from '../styles/Auth.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type FormData = {
  email:string;
  password: string;
}

type User = {
  id: true,
  username: true,
  avatarUrl: true,
}

type AuthFormProps = {
  onSuccess: (u: User) => void;
  onSwitchToRegister: () => void;
}

export default function AuthForm({onSuccess, onSwitchToRegister}: AuthFormProps){

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  }

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try{
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.error || 'Something went wrong');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setSuccess(data.message);
      setFormData({email: '', password: ''});

      onSuccess(data.user);

    } catch (err) {
      if (err instanceof Error){
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter'){
      handleSubmit();
    }
  };
    
 return(
  <>
    <div className={s.authContainer}>
      <div className={s.authCard}>
        <div className={s.authHeader}>
          <h1>Sign In</h1>
        </div>
        <div className={s.authForm}>

          <div className={s.formGroup}>
            <label htmlFor='email'>Email</label>
            <input 
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              required />
          </div>

          <div className={s.formGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type='password'
              id='password'
              name='password' 
              value={formData.password}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              required />
          </div>

          {error && (
            <div className={`${s.alert} ${s.alertError}`}>
                {error}
            </div>
          )}
          {success && (
            <div className={`${s.alert} ${s.alertSuccess}`}>
                {success}
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading}>
            {loading? 'Processing...' : 'Login'}
          </button>

        </div>
      </div>
    </div>

    <button type="button" onClick={onSwitchToRegister}>
      Don’t have an account? Register
    </button>
  </>
);
}