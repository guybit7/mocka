import { Navigate } from 'react-router-dom';
import React, { lazy } from 'react';

const MocksShell = lazy(() => import('./mocks-shell'));
// const Mocks = lazy(()=> import('@ui-tanstack/mocks'));

export const mocksShellRoutes: any = [
  {
    path: '/shell',
    element: <MocksShell />,
    children: [
      {
        path: '',
        element: <Navigate to="mocks" replace />,
      },
      // {
      //   path: 'mocks',
      //   component: () => import('@ui-tanstack/mocks').then(r => r.Mocks)
      // },
      // {
      //   path: '/mocks',
      //   element: <Mocks/>
      // }
    ],
  },
];
const Component = mocksShellRoutes.map((r: any) => lazy(r.component))
export default mocksShellRoutes;
