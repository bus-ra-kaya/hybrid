import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import s from '../styles/Auth.module.css';

type FormData = {
  email:string;
  password: string;
}

type AuthFormProps = {
  onSwitchToRegister: () => void;
}

export default function AuthForm({onSwitchToRegister}: AuthFormProps){

  const { login, isLoading, error: authError} = useUser();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [validationError, setValidationError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setValidationError('');
    setSuccess('');
  }

  const handleSubmit = async () => {
    setValidationError('');
    setSuccess('');

    try{
      await login({
        email: formData.email,
        password: formData.password,
      })

      setSuccess('Login successful!');
      setFormData({email: '', password: ''});

    } catch (err) {
      if (err instanceof Error){
        setValidationError(err.message);
      }};
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter'){
      handleSubmit();
    }
  };
  
  const displayError = validationError || authError;
    
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

          {displayError && (
            <div className={`${s.alert} ${s.alertError}`}>
                {displayError}
            </div>
          )}
          {success && (
            <div className={`${s.alert} ${s.alertSuccess}`}>
                {success}
            </div>
          )}

          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading? 'Processing...' : 'Login'}
          </button>

        </div>
      </div>
    </div>

    <button type="button" onClick={onSwitchToRegister}>
      Don’t have an account? Register
    </button>
  </>
)};