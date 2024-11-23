import './groups-list.scss';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import GroupItem from '../group-item/group-item';
import { useGroupContext } from '../groups-container/groups-container';
import { muAxiosClient, muQueryClient } from '@mu/mu-auth';

export function GroupsList() {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { activeSpace } = useGroupContext();
  const navigate = useNavigate();

  let content = <p> Please select space and group </p>;

  const { mutate: deleteSigleGroup } = useMutation({
    mutationFn: ({ row }) => muAxiosClient.delete(`/api/group/${row._id}`),
    onSuccess: () => {
      muQueryClient.invalidateQueries({ queryKey: ['groups', searchTerm], exact: true });
    },
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['groups', searchTerm],
    queryFn: ({ signal, queryKey }) => {
      const activeSpaceId = activeSpace?._id;
      let url = `/api/group/getAll/${activeSpaceId}`;
      if (searchTerm) {
        url += '?search=' + searchTerm;
      }
      return muAxiosClient.get(`${url}`);
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
    <div className="container">
      {content}
      <Outlet />
    </div>
  );
}

export default GroupsList;