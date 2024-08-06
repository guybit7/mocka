import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { appRoutes } from './app-routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@ui-tanstack/common';

const appRouter = createBrowserRouter(appRoutes);

export function App() {
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={appRouter} />
  </QueryClientProvider>;
}

export default App;
