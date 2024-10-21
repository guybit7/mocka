import styles from './groups-container.module.scss';
import { Outlet } from 'react-router-dom';
import GroupsHeader from '../groups-header/groups-header';
import { useQuery } from '@tanstack/react-query';
import { fetchSummarySpaces } from '../util/http';

export function GroupsContainer() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['spaces', 'summary'],
    queryFn: ({ signal }) => fetchSummarySpaces({ signal }),
    enabled: true, // This will trigger the fetch on component mount
  });

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
