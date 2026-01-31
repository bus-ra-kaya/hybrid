import { createContext, useContext } from 'react';

type User = {
  id: string;
  username: string;
  avatarUrl?: string;
}

export type UserState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// not entirely sure how the actions work, need to go over them

export type UserAction = 
| {type: 'LOGIN_START'}
| {type: 'LOGIN_SUCCESS'; payload: User }
| {type: 'LOGIN_FAILURE'; payload: string }
| {type: 'REGISTER_START'}
| {type: 'REGISTER_SUCCESS', payload: User }
| {type: 'REGISTER_FAILURE', payload: string}
| {type: 'LOGOUT'}
| {type: 'UPDATE_USER'; payload: Partial<User>}
| {type: 'CLEAR_ERROR'};

type UserContextValue = {
  user: User | null;
  isLoading:boolean;
  error: string | null;
  login: (credentials: {email: string; password: string}) => Promise<void>;
  register: (data: {username: string; email: string; password: string; }) => Promise<void>;
  logout:() => Promise<void>;
  updateUser: (updates: Partial<User>)=> void;
  clearError: () => void;
}

export const UserContext = createContext<UserContextValue | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

export type { User, UserContextValue };