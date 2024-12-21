import { Outlet } from 'react-router-dom';
import './admin-container.scss';

export function AdminContainer() {
  return (
    <div className="admin-container">
      <Outlet />
    </div>
  );
}

export default AdminContainer;
