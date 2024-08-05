import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { appRoutes } from './app-routes';

const appRouter = createBrowserRouter(appRoutes);

export function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
