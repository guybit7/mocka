import { LazyLoadMeta } from '@mockoto-ui-common/types';
import { MuTable } from '@mockoto-ui-common/ui-components';
import { muAxiosClient } from '@mu/mu-auth';
import { Button, IconButton } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { usersTableHeaders } from './users-table-config';
import './users-table.scss';
import { User } from '../interfaces/user';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
export function UsersTable() {
  const [lazyLoadMeta, setLazyLoadMeta] = useState<LazyLoadMeta>({});
  const navigate = useNavigate();
  const handleLazyLoadMetaChange = (meta: LazyLoadMeta) => {
    console.log('Lazy Load Meta:', meta);
    setLazyLoadMeta(meta);

    // Handle fetching filtered/sorted data based on this meta
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: ({ signal }) => {
      const url = '/api/user/getAll';
      return muAxiosClient.get<any, any>(url, { signal });
    },
    enabled: true, // Only run query if activeSpace is set
    refetchOnWindowFocus: true, // Optional: Prevents refetch when window is focused
  });

  const handleAddUser = () => {
    navigate('./NEW');
  };

  const onRowClick = (row: User) => {
    navigate(`./${row._id}`);
  };

  useEffect(() => {
    console.log('new search!');
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <MuTable
        dataSource={data}
        key={'users-data'}
        headers={usersTableHeaders}
        id={'users'}
        onLazyLoadMetaChange={handleLazyLoadMetaChange}
        onRowClick={onRowClick}
        order={'desc'}
        orderBy={''}
        rowCount={0}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <AddCircleOutlineIcon onClick={handleAddUser} />
        </div>
      </MuTable>
      <Outlet />
    </>
  );
}

export default UsersTable;
