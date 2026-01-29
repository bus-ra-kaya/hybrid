import { createContext, useContext } from 'react';

type User = {
  id: string;
  username: string;
  avatarUrl?: string;
}

type UserContextValue = {
  user: User | null;
  setUser: (user: User) => void;
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