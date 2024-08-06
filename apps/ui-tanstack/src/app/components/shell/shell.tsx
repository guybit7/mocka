import { Button } from '@mui/material';
import './shell.scss';
import { QueryClientProvider, useMutation } from "@tanstack/react-query";
import { logout, queryClient } from '@ui-tanstack/common';
import { Link, Outlet, useNavigate } from "react-router-dom";

export function Shell() {

  const navigate = useNavigate();

  const { mutate: logoutHandler } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      navigate('./login');
      
    },
  });

  const handleLogout = () => {
    logoutHandler();
  }

  return (
    
      <div className="shell-container">
        <div className='flex gap-4 items-center'>
          <div id="title">
              <Link to=''><span className="text-green-700 text-2xl">Welcome </span></Link>  
          </div>
          <div className='flex' id="menu-container">
              <Link to='mocks' className='link'>Mocks Container</Link>
              <Link to='settings' className='link'>Settings</Link>
              <Button variant='outlined' onClick={handleLogout}>Logout</Button>
          </div>
        </div>
        <div className='flex-1'>
          <Outlet />
        </div>
      </div>
  );
}

export default Shell;
