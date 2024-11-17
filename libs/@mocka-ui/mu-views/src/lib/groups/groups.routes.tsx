import { Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import GroupsContainer from './groups-container/groups-container';
import GroupsList from './groups-list/groups-list';
import GroupModal from './group-modal/group-modal';

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
];
