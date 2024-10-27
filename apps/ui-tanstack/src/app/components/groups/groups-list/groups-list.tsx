import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './groups-list.module.scss';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteGroup, fetchGroups } from '../util/http';
import GroupItem from '../group-item/group-item';
import { queryClient } from '@ui-tanstack/common';
import { useGroupContext } from '../groups-container/groups-container';

export function GroupsList() {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { activeSpace } = useGroupContext();
  const navigate = useNavigate();

  let content = <p> Please select space and group </p>;

  const { mutate: deleteSigleGroup } = useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups', searchTerm], exact: true });
    },
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['groups', searchTerm],
    queryFn: ({ signal, queryKey }) => {
      const activeSpaceId = activeSpace?._id;
      return fetchGroups({ signal, searchTerm, activeSpaceId });
    },
    enabled: activeSpace !== null,
  });

  const getSearchTerm = (params: URLSearchParams) => params.get('search') ?? '';

  useEffect(() => {
    setSearchTerm(getSearchTerm(searchParams));
  }, [searchParams]);

  useEffect(() => {
    if (activeSpace?._id && searchTerm === '') {
      refetch();
    }
  }, [activeSpace?._id]);

  const handleDeleteGroup = (row: any) => {
    deleteSigleGroup({ row });
  };

  // mocks/:spaceId/:groupId
  const handleSelectGroup = (row: any) => {
    navigate(`../../mocks/${activeSpace?._id}/${row._id}`);
  };

  if (data) {
    content = data?.map((row: any, index: number) => {
      return <GroupItem key={row._id} row={row} onDelete={handleDeleteGroup} onSelect={handleSelectGroup}></GroupItem>;
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
