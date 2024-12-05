import { useEffect, useState } from 'react';
import './groups-table.scss';
import { LazyLoadMeta } from '@mockoto-ui-common/types';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { muAxiosClient } from '@mu/mu-auth';
import { MuTable, MuTableActionEvent } from '@mockoto-ui-common/ui-components';
import { Box, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { groupsTableHeaders } from './groups-table-config';
import { MuFormSelect } from '@mockoto-ui-common/design-system';
import { useForm } from 'react-hook-form';

interface GroupsTableAction {
  space: any;
}

const defaultValues = {
  space: null,
};

export function GroupsTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { control, getValues, setValue, watch } = useForm<GroupsTableAction>({
    defaultValues: defaultValues,
    mode: 'all',
  });

  const watchedSpace = watch('space');

  const [lazyLoadMeta, setLazyLoadMeta] = useState<LazyLoadMeta>({});
  const navigate = useNavigate();
  const handleLazyLoadMetaChange = (meta: LazyLoadMeta) => {
    console.log('Lazy Load Meta:', meta);
    setLazyLoadMeta(meta);
  };

  const { data: summarySpaces } = useQuery({
    queryKey: ['groups-summary-spaces'],
    queryFn: ({ signal }) => muAxiosClient.get<any, any>(`/api/space/summary/getAll`, { signal }),
    enabled: true,
  });

  const { data: groups, refetch: refetchGroups } = useQuery({
    queryKey: ['groups', { id: watchedSpace?._id }],
    queryFn: ({ signal }) => muAxiosClient.get<any, any>(`/api/group/getAll/${watchedSpace?._id}`, { signal }),
    enabled: watchedSpace != null,
  });

  const handleAddSpace = () => {
    const currentQueryParams = new URLSearchParams(window.location.search);
    navigate('./NEW?' + currentQueryParams.toString());
  };

  const onRowClick = (row: any) => {
    const currentQueryParams = new URLSearchParams(window.location.search);
    navigate(`./${row._id}?` + currentQueryParams.toString());
  };

  useEffect(() => {
    const spaceIdFromUrl = searchParams.get('space');
    if (spaceIdFromUrl) {
      const selectedSpace = summarySpaces?.find((space: any) => space._id === spaceIdFromUrl);
      if (selectedSpace) {
        setValue('space', selectedSpace);
      }
    } else if (summarySpaces?.length) {
      setValue('space', summarySpaces[0]);
    }
  }, [summarySpaces, setValue]);

  useEffect(() => {
    if (watchedSpace) {
      refetchGroups(watchedSpace?._id);
      setSearchParams({ space: watchedSpace?._id });
    }
  }, [watchedSpace]);

  const handlerActionClick = (muTableActionEvent: MuTableActionEvent) => {
    // mocks/671804a0ad4c48e7578ff0ff/6718191770b53f9f2ebd64bf/list
    navigate(`/mocks/${watchedSpace._id}/${muTableActionEvent.row._id}/list`);
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error: {error.message}</div>;
  return (
    <>
      <MuTable
        dataSource={groups || []}
        key={'users-data'}
        headers={groupsTableHeaders}
        id={'users'}
        onLazyLoadMetaChange={handleLazyLoadMetaChange}
        onRowClick={onRowClick}
        order={'desc'}
        orderBy={''}
        rowCount={0}
        onActionClick={handlerActionClick}
      >
        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Box sx={{ width: '15rem' }}>
            <MuFormSelect
              id="space"
              label="Select Space"
              name="space"
              optionValue="_id"
              optionLabel="name"
              options={summarySpaces}
              control={control}
              rules={{}}
            />
          </Box>
          <Tooltip title="Add New Group" arrow sx={{ cursor: 'pointer' }}>
            <AddCircleOutlineIcon onClick={handleAddSpace} className="action-icon" />
          </Tooltip>
        </Box>
      </MuTable>
      <Outlet />
    </>
  );
}

export default GroupsTable;
