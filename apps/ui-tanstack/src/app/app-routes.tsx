import { Navigate, RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Shell = lazy(() => import('./components/shell/shell'));
const SettingsContainer = lazy(() => import('./components/settings-container/settings-container'));
const MocksContainer = lazy(() => import('./components/mocks-container/mocks-container'));
const MocksList = lazy(() => import('./components/mocks-list/mocks-list'));

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Shell />
      </Suspense>
    ),
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
        path: 'mocks',
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
          },
        ],
      },
    ],
  },
];
