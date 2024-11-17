import { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { MuAuthProvider, MuLogin, muQueryClient, MyProtectedRoute } from '@mu/mu-auth';

const MuShell = lazy(() => import('@mu/mu-views').then(module => ({ default: module.MuShell })));
//
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
  {
    path: 'register',
    element: (
      <Suspense>
        <QueryClientProvider client={muQueryClient}>
          <div>TODO REGISTER</div>
        </QueryClientProvider>
      </Suspense>
    ),
  },
];
