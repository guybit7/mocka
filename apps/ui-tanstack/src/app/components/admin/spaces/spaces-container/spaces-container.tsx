import { Outlet } from 'react-router-dom';
import styles from './spaces-container.module.scss';

export function SpacesContainer() {
  return (
    <div className={styles['module-container']}>
      <div className={styles['module-outlet-container']}>
        <Outlet />
      </div>
    </div>
  );
}

export default SpacesContainer;
