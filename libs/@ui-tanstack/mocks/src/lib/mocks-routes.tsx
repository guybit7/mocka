import { Navigate, Outlet } from 'react-router-dom';
import MocksList from './components/mocks-list';

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
        element: <MocksList />,
      },
    ],
  },
];
export default mocksRoutes;
