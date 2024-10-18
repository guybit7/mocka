import './shell.scss';
import { Outlet } from 'react-router-dom';
import Topbar from '../topbar/topbar';

export function Shell() {
  return (
    <div className="shell-container">
      <Topbar></Topbar>
      <Outlet />
    </div>
  );
}

export default Shell;
