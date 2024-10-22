import axios from 'axios';
import './auth-provider.scss';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState({} as any);

  useEffect(() => {
    console.log('effect auth');
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/currentUser', {
          baseURL: 'http://localhost:3000',
          withCredentials: true,
        });
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
