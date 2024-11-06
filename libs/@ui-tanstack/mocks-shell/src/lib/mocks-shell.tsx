import { Link, Outlet, useNavigate } from 'react-router-dom';
import './mocks-shell.scss';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@ui-tanstack/common';

export function MocksShell() {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate(`mocks`);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="shell-container">
        <div className="flex flex-col">
          <div id="title">
            <span className="text-green-700 text-2xl">Welcome To Mock</span>
          </div>
          <div className="flex" id="menu-container">
            <button onClick={navigateHandler} className="link">
              Mocks list
            </button>
            <Link to="mocks" className="link">
              mocks
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default MocksShell;
