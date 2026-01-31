import { useState } from 'react'; 
import { useUser } from '../contexts/UserContext';
import s from '../styles/Auth.module.css';

type FormData = {
  email:string;
  username: string;
  password: string;
  confirmPassword: string;
}

type AuthFormProps = {
  onSwitchToLogin: () => void;
}

// combine the RegisterForm and LoginForm so that it branches after an email check

export default function AuthForm({onSwitchToLogin}: AuthFormProps){

  const { register, isLoading, error: authError } = useUser();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
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

    if(formData.password !== formData.confirmPassword){
      setValidationError('Passwords do not match');
      return;
    }

    if(formData.password.length <8){
      setValidationError('Password must be at least 8 characters long');
      return;
    }
    try {
      await register({
        email: formData.email,
        username: formData.username,
        password: formData.password,
      })

      setSuccess('Registratiion successful!');
      setFormData({email: '', username: '', password: '', confirmPassword: ''});

    } catch (err) {
      if (err instanceof Error){
        setValidationError(err.message);
      }
  }};
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
            {isLoading ? 'Processing...' : 'Sign up'}
          </button>

        </div>
      </div>
    </div>

    <button type="button" onClick={onSwitchToLogin}>
    Already have an account? Login
  </button>
  </>
)};