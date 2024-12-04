import { LazyLoadMeta } from '@mockoto-ui-common/types';
import { MuTable } from '@mockoto-ui-common/ui-components';
import { muAxiosClient } from '@mu/mu-auth';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { spacesTableHeaders } from './spaces-table-config';
import './spaces-table.scss';

export function SpacesTable() {
  const [lazyLoadMeta, setLazyLoadMeta] = useState<LazyLoadMeta>({});
  const navigate = useNavigate();
  const handleLazyLoadMetaChange = (meta: LazyLoadMeta) => {
    console.log('Lazy Load Meta:', meta);
    setLazyLoadMeta(meta);

    // Handle fetching filtered/sorted data based on this meta
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['spaces'],
    queryFn: ({ signal }) => {
      const url = '/api/space/getAll';
      return muAxiosClient.get<any, any>(url, { signal });
    },
    enabled: true,
    refetchOnWindowFocus: true,
  });

  const handleAddSpace = () => {
    navigate('./NEW');
  };

  const onRowClick = (row: any) => {
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
        headers={spacesTableHeaders}
        id={'users'}
        onLazyLoadMetaChange={handleLazyLoadMetaChange}
        onRowClick={onRowClick}
        order={'desc'}
        orderBy={''}
        rowCount={0}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <AddCircleOutlineIcon onClick={handleAddSpace} />
        </div>
      </MuTable>
      <Outlet />
    </>
  );
}

export default SpacesTable;
