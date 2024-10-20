import { Outlet } from 'react-router-dom';
import styles from './admin-container.module.scss';

export function AdminContainer() {
  return (
    <div className={styles['admin-container']}>
      <Outlet />
    </div>
  );
}

export default AdminContainer;
