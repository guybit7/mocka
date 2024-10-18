import { Navigate, RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MockModal from './components/mock-modal/mock-modal';
import Login from './components/auth/login/login';
import ProtectedRoute from './components/auth/protected-route/protected-route';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@ui-tanstack/common';
import AuthProvider from './components/auth/auth-provider/auth-provider';
import Register from './components/auth/register/register';

const Shell = lazy(() => import('./components/shell/shell'));
const SettingsContainer = lazy(() => import('./components/settings-container/settings-container'));
const MocksContainer = lazy(() => import('./components/mocks-container/mocks-container'));
const MocksList = lazy(() => import('./components/mocks-list/mocks-list'));

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          <ProtectedRoute element={<Shell/>}/>
        </AuthProvider>
      </Suspense>
    ),
    loader: async () => {
      console.log("loader!!");
      return null;
    },
    children: [
      {
        path: 'settings',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SettingsContainer />
          </Suspense>
        ),
      },
      {
        path: 'main',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MocksContainer />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="list" replace />,
          },
          {
            path: 'list',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <MocksList />
              </Suspense>
            ),
            children: [
              {
                path: ':id',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <MockModal />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: (
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <Login />
        </QueryClientProvider>
      </Suspense>
    ),
  },
  {
    path: 'register',
    element: (
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <Register />
        </QueryClientProvider>
      </Suspense>
    ),
  },
];
