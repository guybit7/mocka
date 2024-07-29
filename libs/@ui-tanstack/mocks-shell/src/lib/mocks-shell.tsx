import { Outlet } from 'react-router-dom';
import './mocks-shell.scss';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@ui-tanstack/common';

export function MocksShell() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="shell-container">
        <span className="text-green-700 text-2xl">Welcome To Mock</span>
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default MocksShell;
