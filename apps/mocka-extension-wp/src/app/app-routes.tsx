import { RouteObject } from 'react-router-dom';
import { Suspense } from 'react';
import Login from './auth/login/login';

export const appRoutes: RouteObject[] = [
  {
    path: 'login',
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
];
