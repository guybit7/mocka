import { lazy, Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const MocksContainer = lazy(() => import('./mocks-container/mocks-container'));
const MocksTable = lazy(() => import('./mocks-table/mocks-table'));
const Mock = lazy(() => import('./mock/mock'));

export const mocksRoutes: RouteObject[] = [
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
            <MocksTable />
          </Suspense>
        ),
        children: [
          {
            path: ':id',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Mock />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];
