import { Outlet } from 'react-router-dom';
import './shell.scss';

export function Shell() {
  return (
    <div className="shell-container">
      <Outlet />
    </div>
  );
}

export default Shell;
