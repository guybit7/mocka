import { Outlet } from 'react-router-dom';
import styles from './spaces-list.module.scss';
import SpaceItem from '../space-item/space-item';

export function SpacesList() {
  return (
    <div className={styles['spaces-list-container']}>
      <div className={styles['spaces-list-wrapper']}>
        <SpaceItem />
      </div>
      <div className={styles['spaces-edit-container']}>
        <Outlet />
      </div>
    </div>
  );
}

export default SpacesList;
