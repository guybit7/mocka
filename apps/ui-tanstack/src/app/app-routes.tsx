import { Navigate, RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Login from './components/auth/login/login';
import ProtectedRoute from './components/auth/protected-route/protected-route';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@ui-tanstack/common';
import AuthProvider from './components/auth/auth-provider/auth-provider';
import Register from './components/auth/register/register';
import GroupsContainer from './components/groups/groups-container/groups-container';
import GroupsList from './components/groups/groups-list/groups-list';
import GroupModal from './components/groups/group-modal/group-modal';
import AdminContainer from './components/admin/admin-container/admin-container';
import SpacesContainer from './components/admin/spaces/spaces-container/spaces-container';
import SpacesList from './components/admin/spaces/spaces-list/spaces-list';
import SpaceForm from './components/admin/spaces/space-form/space-form';
import MockModal from './components/mocks/mock-modal/mock-modal';

const Shell = lazy(() => import('./components/shell/shell'));
const SettingsContainer = lazy(() => import('./components/settings-container/settings-container'));
const MocksContainer = lazy(() => import('./components/mocks/mocks-container/mocks-container'));
const MocksList = lazy(() => import('./components/mocks/mocks-list/mocks-list'));

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
        path: 'settings',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SettingsContainer />
          </Suspense>
        ),
      },
      {
        path: 'groups',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GroupsContainer />
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
                <GroupsList />
              </Suspense>
            ),
            children: [
              {
                path: ':id',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <GroupModal />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: 'mocks/:spaceId/:groupId',
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
      {
        path: 'admin',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminContainer />
          </Suspense>
        ),
        children: [
          {
            path: 'spaces',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <SpacesContainer />
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
                    <SpacesList />
                  </Suspense>
                ),
                children: [
                  {
                    path: ':id',
                    element: (
                      <Suspense fallback={<div>Loading...</div>}>
                        <SpaceForm />
                      </Suspense>
                    ),
                  },
                ],
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
