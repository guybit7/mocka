import { createContext, useEffect, useState } from 'react';
import './auth-provider.scss';

export const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState({} as any);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response: any = await fetch('http://localhost:3000/api/auth/currentUser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
