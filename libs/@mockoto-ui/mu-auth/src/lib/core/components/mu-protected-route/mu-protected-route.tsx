import { useContext, useEffect } from 'react';
import './mu-protected-route.scss';
import { Navigate } from 'react-router-dom';
import { MuAuthContext } from '../mu-auth-provider/mu-auth-provider';

export function MyProtectedRoute({ element: Component, ...rest }: any) {
  const { user }: any = useContext(MuAuthContext);

  useEffect(() => {
    console.log(user);
  }, []);

  if (!user) {
    console.log('navigate to login');
    return <Navigate to="/login" />;
  }

  return Component;
}

export default MyProtectedRoute;
