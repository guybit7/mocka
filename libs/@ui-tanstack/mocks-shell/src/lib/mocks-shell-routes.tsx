import { Navigate, RouteObject } from 'react-router-dom';
import React, { lazy } from 'react';
import { mocksRoutes } from '@ui-tanstack/mocks';
// import { ErrorPage } from '@ui-tanstack/common';
import { Suspense } from 'react';


const MocksShell = lazy(() => import('./mocks-shell'));
// const Mocks = lazy(()=> import('@ui-tanstack/mocks').then(module => ({ default: module.Mocks })))

export const mocksShellRoutes: RouteObject[] = [
  {
    path: 'shell',
    element: <Suspense fallback={<div>Loading...</div>}>
        <MocksShell />,
      </Suspense>,
    // errorElement: <ErrorPage/>,
    children: [
      // {
      //   path: '',
      //   element: <Navigate to="mocks" replace />,
      // },
      // {
      //   path: 'mocks',
      //   element: <Suspense fallback={<div>Loading...</div>}><Mocks /></Suspense>,
      //   children: mocksRoutes,
      // },
    ],
  },
];
export default mocksShellRoutes;
