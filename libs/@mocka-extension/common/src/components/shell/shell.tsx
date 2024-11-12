import { Outlet } from 'react-router-dom';
import './shell.scss';
import Topbar from '../topbar/topbar';

export function Shell() {
  return (
    <div className="shell-container">
      <Topbar />
      <Outlet />
    </div>
  );
}

export default Shell;
