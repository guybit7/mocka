import { axiosClient } from '@ui-tanstack/common';
import './auth-provider.scss';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState({} as any);

  useEffect(() => {
    console.log('effect auth');
    const checkAuth = async () => {
      try {
        const response = await axiosClient.get('/api/auth/currentUser');
        setUser(response.data.data);
      } catch (error) {
        setUser(null);
      } finally {
      }
    };
    checkAuth();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
