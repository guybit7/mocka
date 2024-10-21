import { Outlet } from 'react-router-dom';
import styles from './spaces-container.module.scss';
import SpacesHeader from '../spaces-header/spaces-header';

export function SpacesContainer() {
  return (
    <div className={styles['module-container']}>
      <SpacesHeader />
      <div className={styles['module-outlet-container']}>
        <Outlet />
      </div>
    </div>
  );
}

export default SpacesContainer;
