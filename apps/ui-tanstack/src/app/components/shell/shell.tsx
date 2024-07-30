import './shell.scss';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from '@ui-tanstack/common';
import { Link, Outlet, useNavigate } from "react-router-dom";

export function Shell() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="shell-container">
        <div className='flex flex-col'>
          <div id="title">
              <Link to=''><span className="text-green-700 text-2xl">Welcome </span></Link>

            
          </div>
          <div className='flex' id="menu-container">
              <Link to='mocks' className='link'>Mocks Container</Link>
              <Link to='settings' className='link'>Settings</Link>
          </div>
        </div>
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default Shell;
