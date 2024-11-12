import { RouterProvider, createHashRouter } from 'react-router-dom';
import { appRoutes } from './app-routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@me/common';

const appRouter = createHashRouter(appRoutes);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
    </QueryClientProvider>
  );
}

export default App;
/*

    <div>
      <span> Hello! </span>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
*/
