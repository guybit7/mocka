import { Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import Mock from './mock/mock';
import MocksContainer from './mocks-container/mocks-container';
import MocksTable from './mocks-table/mocks-table';

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
