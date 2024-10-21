import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import styles from './groups-list.module.scss';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteGroup, fetchGroups } from '../util/http';
import GroupItem from '../group-item/group-item';
import { queryClient } from '@ui-tanstack/common';
import { useGroupContext } from '../groups-container/groups-container';

export function GroupsList() {
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>();
  const { activeSpace } = useGroupContext();

  let content = <p> Hello </p>;

  const { mutate: deleteSigleGroup } = useMutation({
    mutationFn: ({ row }) => deleteGroup({ row }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups', 'search'], exact: true });
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['groups', 'search'],
    queryFn: ({ signal, queryKey }) => {
      const activeSpaceId = activeSpace?._id;
      return fetchGroups({ signal, searchTerm, activeSpaceId });
    },
    enabled: searchTerm !== undefined && activeSpace !== null,
  });

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location.search, searchParams]);

  const handleDeleteGroup = (row: any) => {
    deleteSigleGroup({ row });
  };

  if (data) {
    content = data?.map((row: any, index: number) => {
      return <GroupItem key={row._id} row={row} onDelete={handleDeleteGroup}></GroupItem>;
    });
  }

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    content = <div>Error!</div>;
  }
  return (
    <div className={styles['container']}>
      {content}
      <Outlet />
    </div>
  );
}

export default GroupsList;
