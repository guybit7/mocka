import { RouterProvider, createHashRouter } from 'react-router-dom';
import { appRoutes } from './app-routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@me/common';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const appRouter = createHashRouter(appRoutes);

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
