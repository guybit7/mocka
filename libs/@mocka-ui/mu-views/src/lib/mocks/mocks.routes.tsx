import { Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import MocksContainer from './mocks-container/mocks-container';
import MocksList from './mocks-list/mocks-list';
import MockModal from './mock-modal/mock-modal';

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
];
