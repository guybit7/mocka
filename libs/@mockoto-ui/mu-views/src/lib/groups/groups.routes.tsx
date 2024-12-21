import { Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import GroupsContainer from './groups-container/groups-container';
import GroupsTable from './groups-table/groups-table';
import Group from './group/group';

export const groupsRoutes: RouteObject[] = [
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
            <GroupsTable />
          </Suspense>
        ),
        children: [
          {
            path: ':id',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Group />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];
