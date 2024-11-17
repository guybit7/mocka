import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import styles from './spaces-list.module.scss';
import SpaceItem from '../space-item/space-item';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosClient, queryClient } from '@ui-tanstack/common';

export function SpacesList() {
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>();

  let content = <p> Hello </p>;

  const { mutate: deleteSingleSpace } = useMutation({
    mutationFn: ({ row }) => axiosClient.delete(`/api/space/${row._id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spaces', 'search'], exact: true });
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['spaces', 'search'],
    queryFn: ({ signal, queryKey }) => {
      let url = '/api/space/getAll';

      if (searchTerm) {
        url += '?search=' + searchTerm;
      }

      return axiosClient.get(`${url}`, { signal });
    },
    enabled: true,
  });

  useEffect(() => {
    setSearchTerm('');
  }, []);

  const handleDeleteSpace = (row: any) => {
    deleteSingleSpace({ row });
  };

  if (data) {
    content = data?.map((row: any, index: number) => {
      return <SpaceItem key={row._id} row={row} onDelete={handleDeleteSpace}></SpaceItem>;
    });
  }

  if (data === undefined || data?.length === 0) {
    content = <div>Not found spaces</div>;
  }

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    content = <div>Error!</div>;
  }

  return (
    <div className={styles['spaces-list-container']}>
      <div className={styles['spaces-list-wrapper']}>{content}</div>
      <Outlet />
    </div>
  );
}

export default SpacesList;
