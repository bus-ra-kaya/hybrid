import { useReducer, useMemo, useCallback } from "react";
import { UserContext } from './UserContext';
import type { User, UserState, UserAction } from './UserContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function userReducer(state: UserState, action: UserAction){
  switch(action.type){
    case('LOGIN_START'):
    case('REGISTER_START'):
      return {...state, isLoading: true, error: null};
    case('LOGIN_SUCCESS'):
    case ('REGISTER_SUCCESS'):
      return {user: action.payload, isLoading: false, error: null};
    case('LOGIN_FAILURE'):
    case('REGISTER_FAILURE'):
      return {user: null, isLoading: false, error: action.payload};
    case 'LOGOUT':
      return {user: null, isLoading: false, error: null};
    case 'UPDATE_USER':
      return state.user
      ? { ...state, user: {...state.user, ...action.payload}}
      : state;
    case 'CLEAR_ERROR':
      return { ...state, error: null};
    default:
      return state;
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
    isLoading: false,
    error: null,
  });

  const login = useCallback(async (credentials: { email: string; password: string}) => {
    dispatch({type: 'LOGIN_START'});
    try{
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials),
      });

      if(!response.ok){
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.token);
      dispatch({type: 'LOGIN_SUCCESS', payload: data.user});
    } catch(err){
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: err instanceof Error ? err.message : 'Login failed'
      });
    }
  }, []);

  const register = useCallback(async (data: {email: string; username: string; password: string;}) => {
    dispatch({type: 'REGISTER_START'});
    try{
      const response = await fetch (`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data),
      });

      if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const responseData = await response.json();
      localStorage.setItem('accessToken',responseData.token);
      dispatch({type: 'REGISTER_SUCCESS', payload: responseData.user});
    } catch (err){
      dispatch({
        type: 'REGISTER_FAILURE',
        payload: err instanceof Error ? err.message : 'Registration failed'
      });
      throw err;
    }

  }, []);

  // do I need to create an endpoint for logout?

  const logout = useCallback(async () => {
    try {
      // await fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'POST'});
      localStorage.removeItem('accessToken');
      dispatch({type: 'LOGOUT'});
    } catch (err){
      console.error('Logout failed:', err);
      localStorage.removeItem('accessToken');
      dispatch({type: 'LOGOUT'});
    }
  },[]);

  const updateUser = useCallback((updates: Partial<User>) => {
    dispatch({type: 'UPDATE_USER', payload: updates});
  },[]);

  const clearError = useCallback(() => {
    dispatch({type: 'CLEAR_ERROR'});
  }, []);

  const value = useMemo(
    () => ({
      user: state.user,
      isLoading: state.isLoading,
      error: state.error,
      login,
      register,
      logout,
      updateUser,
      clearError,
    }),
    [state, login, register, logout, updateUser, clearError]
  );
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}