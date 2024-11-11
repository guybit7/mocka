import './shell.scss';
import { Outlet } from 'react-router-dom';

export function Shell() {
  return (
    <div className="shell-container">
      <Outlet />
    </div>
  );
}

export default Shell;
