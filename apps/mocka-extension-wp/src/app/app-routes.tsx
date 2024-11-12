import { RouteObject } from 'react-router-dom';
import { Suspense } from 'react';
import { AuthProvider, Login, ProtectedRoute } from '@me/auth';
import { Shell } from '@me/common';
import { Dashboard } from '@me/views';

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          <ProtectedRoute element={<Shell />} />
        </AuthProvider>
      </Suspense>
    ),
    loader: async () => {
      console.log('loader!!');
      return null;
    },
    children: [
      {
        path: '/',
        element: <Suspense fallback={<div>Loading...</div>}>{<Dashboard />}</Suspense>,
      },
    ],
  },
  {
    path: 'login',
    element: <Suspense>{<Login />}</Suspense>,
  },
];
