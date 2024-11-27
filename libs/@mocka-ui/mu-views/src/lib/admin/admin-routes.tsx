import { Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import AdminContainer from './admin-container/admin-container';
import SpacesContainer from './spaces/spaces-container/spaces-container';
import SpacesList from './spaces/spaces-list/spaces-list';
import SpaceForm from './spaces/space-form/space-form';
import UsersContainer from './users/users-container/users-container';
import UsersTable from './users/users-table/users-table';

export const adminRoutes: RouteObject[] = [
  {
    path: 'admin',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminContainer />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="spaces" replace />,
      },
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
      {
        path: 'users',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UsersContainer />
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
                <UsersTable />
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
];
