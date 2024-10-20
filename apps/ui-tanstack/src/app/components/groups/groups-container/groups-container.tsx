import styles from './groups-container.module.scss';
import { Outlet } from 'react-router-dom';
import GroupsHeader from '../groups-header/groups-header';

export function GroupsContainer() {
  return (
    <div className={styles['module-container']}>
      <GroupsHeader></GroupsHeader>
      <div className={styles['module-outlet-container']}>
        <Outlet />
      </div>
    </div>
  );
}

export default GroupsContainer;
