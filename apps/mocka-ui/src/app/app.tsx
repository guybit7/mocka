import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import CssBaseline from '@mui/material/CssBaseline';
import { appRoutes } from './app-routes';
import { muQueryClient } from '@mu/mu-auth';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';

const appRouter = createBrowserRouter(appRoutes);

// Create theme for light and dark modes
const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Dark mode
    primary: {
      main: '#1976d2', // Primary color for dark mode
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light', // Light mode
    primary: {
      main: '#3f51b5', // Primary color for light mode
    },
  },
});

export function App() {
  const [themeMode, setThemeMode] = React.useState<'light' | 'dark'>('light');

  // Dynamically switch between dark and light theme
  const theme = themeMode === 'dark' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={muQueryClient}>
        <RouterProvider router={appRouter} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
