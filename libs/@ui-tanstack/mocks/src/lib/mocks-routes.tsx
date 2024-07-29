import { Navigate, Outlet } from 'react-router-dom';
import React, { lazy } from 'react';
import MocksList from './components/mocks-list';

// const MocksShell = lazy(() => import('./mocks-shell'));
// const Mocks = lazy(()=> import('@ui-tanstack/mocks').then(module => ({ default: module.Mocks })))

export const mocksRoutes: any = [
  {
    path: '',
    element: <Outlet />,
    children: [
      {
        index: true, 
        element: <Navigate to="list" replace />, // Redirect to 'list'
      },
      {
        path: 'list',
        element: <MocksList/>,
      },
    ],
  },
];
export default mocksRoutes;
