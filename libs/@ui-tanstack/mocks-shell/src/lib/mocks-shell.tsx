import { Outlet } from 'react-router-dom';
import './mocks-shell.scss';

export function MocksShell() {
  return (
    <div>
      <h1>Shell Component</h1>
      <Outlet />
    </div>
  );
}

export default MocksShell;
