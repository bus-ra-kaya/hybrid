
import {createContext, useContext, useEffect, useState} from "react";

type User = {
  id: string;
  username: string;
  avatarUrl?: string;
}

type UserContextValue = {
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({children}: {children: React.ReactNode}){
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {


    //add fetching function

    setLoading(false);
  }, []);

return (
  <UserContext.Provider value={{user, loading}}>
    {children}
    </UserContext.Provider>
)}

export function useUser(){
  const context = useContext(UserContext);
  if(context === undefined){
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}