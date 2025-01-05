import { LayoutPrimary } from '@mockoto-ui-common/design-system';
import { Outlet } from 'react-router-dom';
import './admin-container.scss';

export function AdminContainer() {
  return <LayoutPrimary body={<Outlet />} />;
}

export default AdminContainer;
