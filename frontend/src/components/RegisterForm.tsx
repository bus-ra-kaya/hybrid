import { useState } from 'react';
import s from '../styles/Auth.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type FormData = {
  email:string;
  username: string;
  password: string;
  confirmPassword: string;
}

type User = {
  id: number,
  username: string,
  avatarUrl?: string,
}

type AuthFormProps = {
  onSuccess: (u: User) => void;
  onSwitchToLogin: () => void;
}

export default function AuthForm({onSuccess, onSwitchToLogin}: AuthFormProps){

  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
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

    if(formData.password !== formData.confirmPassword){
      setError('Passwords do not match');
      return;
    }

    if(formData.password.length <8){
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try{
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
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
      setFormData({email: '', username: '', password: '', confirmPassword: ''});

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
          <h1>Create Account</h1>
        </div>
        <div className={s.authForm}>

          <div className={s.formGroup}>
            <label htmlFor='username'>Username</label>
            <input 
              type='text'
              id= 'username'
              name='username'
              value={formData.username}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              required/>
          </div>

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
              <small>• Must be at least 8 characters</small>
          </div>

          <div className={s.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type='password'
              id='confirmPassword'
              name='confirmPassword' 
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              required />
              {formData.confirmPassword && formData.confirmPassword !== formData.password && (
                <small>Passwords do not match</small>
              )}
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
            {loading? 'Processing...' : 'Sign up'}
          </button>

        </div>
      </div>
    </div>

    <button type="button" onClick={onSwitchToLogin}>
    Already have an account? Login
  </button>
  </>
);
}