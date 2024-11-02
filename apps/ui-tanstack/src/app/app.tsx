import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { appRoutes } from './app-routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@ui-tanstack/common';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';

const appRouter = createBrowserRouter(appRoutes);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
export function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={appRouter} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
