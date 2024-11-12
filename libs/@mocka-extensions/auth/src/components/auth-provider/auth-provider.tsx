import './auth-provider.scss';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState({} as any);

  useEffect(() => {
    console.log('effect auth');
    const checkAuth = async () => {
      try {
        const response: any = await fetch('http://localhost:3000/api/auth/currentUser', {
          method: 'GET', // HTTP method
          headers: {
            'Content-Type': 'application/json', // Send data as JSON
          },
        });
        if (!response.ok) {
          // Handle HTTP errors (e.g., 401, 404, etc.)
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON response
        console.log('**************');
        console.log(data);
        setUser(data.data); // Assuming `data` contains the user info
      } catch (error) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
