import { MuAuthProvider, muQueryClient, MyProtectedRoute } from '@mu/mu-auth';
import { adminRoutes, groupsRoutes, mocksRoutes } from '@mu/mu-views'; //change to lazy
import { QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const MuShell = lazy(() => import('@mu/mu-views').then(module => ({ default: module.MuShell })));
const MuLogin = lazy(() => import('@mu/mu-auth').then(module => ({ default: module.MuLogin })));

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <MuAuthProvider>
          <MyProtectedRoute element={<MuShell />} />
        </MuAuthProvider>
      </Suspense>
    ),
    loader: async () => {
      console.log('loader!!');
      return null;
    },
    children: [
      {
        index: true,
        element: <Navigate to="admin" replace />,
      },
      ...adminRoutes,
      ...groupsRoutes,
      ...mocksRoutes,
    ],
  },
  {
    path: 'login',
    element: (
      <Suspense>
        <QueryClientProvider client={muQueryClient}>
          <MuLogin />
        </QueryClientProvider>
      </Suspense>
    ),
  },
];
