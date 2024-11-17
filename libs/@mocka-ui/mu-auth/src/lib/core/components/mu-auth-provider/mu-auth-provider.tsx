import './mu-auth-provider.scss';
import { createContext, useState, useEffect } from 'react';
import { MuAuthProviderProps } from '../../types';
import { muAxiosClient } from '../../api';

export const MuAuthContext = createContext({});

export function MuAuthProvider({ children }: MuAuthProviderProps) {
  const [user, setUser] = useState({} as any);

  useEffect(() => {
    console.log('effect auth');
    const checkAuth = async () => {
      try {
        const response = await muAxiosClient.get('/api/auth/currentUser');
        setUser(response.data);
      } catch (error) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  return <MuAuthContext.Provider value={{ user }}>{children}</MuAuthContext.Provider>;
}

export default MuAuthProvider;
