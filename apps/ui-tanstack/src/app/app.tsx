import { mocksShellRoutes } from '@ui-tanstack/mocks-shell';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

const appRoutes = [
  {
    path: '/',
    element: <Navigate to="/shell"  />,
  },
  ...mocksShellRoutes
];

const appRouter = createBrowserRouter(appRoutes);


export function App() {
  return <RouterProvider router={appRouter} />
}

export default App;
