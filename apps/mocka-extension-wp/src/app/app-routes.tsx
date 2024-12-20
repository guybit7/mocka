import { AuthProvider, Login, ProtectedRoute } from '@me/auth';
import { SharedStateProvider, Shell } from '@me/common';
import { Capture, Dashboard, Summary } from '@me/views';
import { Suspense } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

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
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: '',
        element: (
          <SharedStateProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </SharedStateProvider>
        ),
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'captures',
            element: <Capture />,
          },
          {
            path: 'summary',
            element: <Summary />,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: <Suspense>{<Login />}</Suspense>,
  },
];
