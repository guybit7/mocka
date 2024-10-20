import { Outlet } from 'react-router-dom';
import styles from './mocks-container.module.scss';
import MocksHeader from '../mocks-header/mocks-header';

export function MocksContainer() {
  return (
    <div className={styles['module-container']}>
      <MocksHeader></MocksHeader>
      <div className={styles['module-outlet-container']}>
        <Outlet />
      </div>
    </div>
  );
}

export default MocksContainer;
