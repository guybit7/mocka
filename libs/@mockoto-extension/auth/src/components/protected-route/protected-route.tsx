import { useContext, useEffect } from 'react';
import './protected-route.scss';
import { AuthContext } from '../auth-provider/auth-provider';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ element: Component, ...rest }: any) {
  const { user }: any = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
  }, []);

  if (!user) {
    console.log('navigate to login');
    return <Navigate to="/login" />;
  }

  return Component;
}

export default ProtectedRoute;
