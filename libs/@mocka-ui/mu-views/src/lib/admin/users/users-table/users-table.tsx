import { MuTable } from '@mockoto-ui-common/ui-components';
import { LazyLoadMeta } from '@mockoto-ui-common/types';
import { muAxiosClient } from '@mu/mu-auth';
import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { usersTableHeaders } from './users-table-config';
import './users-table.scss';

export function UsersTable() {
  const [lazyLoadMeta, setLazyLoadMeta] = useState<LazyLoadMeta>({});
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
    alert('hew');
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <MuTable
      dataSource={data}
      key={'users-data'}
      headers={usersTableHeaders}
      id={'users'}
      onLazyLoadMetaChange={handleLazyLoadMetaChange}
      order={'desc'}
      orderBy={''}
      rowCount={0}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button variant="contained" onClick={handleAddUser}>
          Add User
        </Button>
        <Button variant="contained" onClick={handleAddUser}>
          Delete
        </Button>
      </div>
    </MuTable>
  );
}

export default UsersTable;
