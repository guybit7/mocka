import { Outlet, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './mocks-list.scss';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import MockItem from '../mock-item/mock-item';
import { muAxiosClient, muQueryClient } from '@mu/mu-auth';

export function MocksList() {
  const location = useLocation();
  const { groupId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  let content = <p> Welcome to mocks list</p>;

  const { mutate: deleteSingleMock } = useMutation({
    mutationFn: ({ row }) => muAxiosClient.delete(`/api/mock/${row._id}`),
    onSuccess: () => {
      muQueryClient.invalidateQueries({ queryKey: ['mocks'], exact: false });
    },
  });

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['mocks', searchTerm],
    queryFn: ({ signal, queryKey }) => {
      return muAxiosClient.get(`/api/mock/getAll?groupId=${groupId}`, { signal });
    },
    enabled: true,
  });

  const getSearchTerm = (params: URLSearchParams) => params.get('search') ?? '';

  useEffect(() => {
    setSearchTerm(getSearchTerm(searchParams));
  }, [searchParams]);

  const deleteMockItem = (row: any) => {
    deleteSingleMock({ row });
  };

  const handleDeleteMock = (row: any) => {
    deleteSingleMock({ row });
  };

  const handleSelectMock = (row: any) => {
    navigate(`./Edit`);
  };

  if (data) {
    content = data?.map((row: any, index: number) => {
      return <MockItem key={row._id} row={row} onDelete={handleDeleteMock} onSelect={handleSelectMock}></MockItem>;
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

export default MocksList;
