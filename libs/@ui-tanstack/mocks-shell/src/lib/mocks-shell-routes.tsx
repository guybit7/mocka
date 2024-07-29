import { Navigate } from 'react-router-dom';
import React, { lazy } from 'react';
import { mocksRoutes } from '@ui-tanstack/mocks';


const MocksShell = lazy(() => import('./mocks-shell'));
const Mocks = lazy(()=> import('@ui-tanstack/mocks').then(module => ({ default: module.Mocks })))

export const mocksShellRoutes: any = [
  {
    path: '/shell',
    element: <MocksShell />,
    children: [
      {
        path: '',
        element: <Navigate to="mocks" replace />,
      },
      {
        path: 'mocks',
        element: <Mocks />,
        children: mocksRoutes
      },
    ],
  },
];
export default mocksShellRoutes;
