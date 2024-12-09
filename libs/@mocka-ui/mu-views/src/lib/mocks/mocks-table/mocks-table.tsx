import { LazyLoadMeta } from '@mockoto-ui-common/types';
import { MuTable, MuTableActionEvent } from '@mockoto-ui-common/ui-components';
import { muAxiosClient } from '@mu/mu-auth';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Tooltip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { mocksTableHeaders } from './mocks-table-config';
import './mocks-table.scss';

export function MocksTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();

  const [lazyLoadMeta, setLazyLoadMeta] = useState<LazyLoadMeta>({});
  const handleLazyLoadMetaChange = (meta: LazyLoadMeta) => {
    console.log('Lazy Load Meta:', meta);
    setLazyLoadMeta(meta);
  };

  const { data: mocks } = useQuery({
    queryKey: ['mocks'],
    queryFn: ({ signal }) => muAxiosClient.get<any, any>(`/api/mock/getAll/${groupId}`, { signal }),
    enabled: true,
  });

  const handleAddMock = () => {
    const currentQueryParams = new URLSearchParams(window.location.search);
    navigate('./NEW?' + currentQueryParams.toString());
  };

  const onRowClick = (row: any) => {
    const currentQueryParams = new URLSearchParams(window.location.search);
    navigate(`./${row._id}?` + currentQueryParams.toString());
  };

  //  useEffect(() => {
  //  const spaceIdFromUrl = searchParams.get('space');
  //  if (spaceIdFromUrl) {
  //    const selectedSpace = summarySpaces?.find((space: any) => space._id === spaceIdFromUrl);
  //    if (selectedSpace) {
  //      setValue('space', selectedSpace);
  //    }
  //  } else if (summarySpaces?.length) {
  //    setValue('space', summarySpaces[0]);
  //  }
  //  }, [summarySpaces, setValue]);

  //  useEffect(() => {
  //    if (watchedSpace) {
  //      refetchGroups(watchedSpace?._id);
  //      setSearchParams({ space: watchedSpace?._id });
  //    }
  //  }, [watchedSpace]);

  const handlerActionClick = (muTableActionEvent: MuTableActionEvent) => {
    switch (muTableActionEvent.id) {
      case 'MOCK_LINK':
        window.open(`http://localhost:3000/${groupId}/${muTableActionEvent.row.name}`, '_blank'); // Open in a new tab
        break;
    }

    //  navigate(`/mocks/${watchedSpace._id}/${muTableActionEvent.row._id}/list`);
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error: {error.message}</div>;
  return (
    <>
      <MuTable
        dataSource={mocks || []}
        key={'users-data'}
        headers={mocksTableHeaders}
        id={'users'}
        onLazyLoadMetaChange={handleLazyLoadMetaChange}
        onRowClick={onRowClick}
        order={'desc'}
        orderBy={''}
        rowCount={0}
        onActionClick={handlerActionClick}
      >
        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Tooltip title="Add New Mock" arrow sx={{ cursor: 'pointer' }}>
            <AddCircleOutlineIcon onClick={handleAddMock} className="action-icon" />
          </Tooltip>
        </Box>
      </MuTable>
      <Outlet />
    </>
  );
}

export default MocksTable;
