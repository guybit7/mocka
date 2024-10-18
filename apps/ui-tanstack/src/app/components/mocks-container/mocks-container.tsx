import { Outlet } from 'react-router-dom';
import './mocks-container.scss';

export function MocksContainer() {
  return (
    <div className="module-container">
      <Outlet />
    </div>
  );
}

export default MocksContainer;
