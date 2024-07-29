import { useQuery } from '@tanstack/react-query';
import './mocks-list.scss';
import { fetchMocks } from '@ui-tanstack/common';
import { useState } from 'react';

export function MocksList() {
  const [searchTerm, setSearchTerm] = useState();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', { searchTerm: searchTerm }],
    queryFn: ({ signal, queryKey }) => fetchMocks({ signal, ...queryKey[1] }),
    enabled: true //searchTerm !== undefined
  });
  console.log(data)
  return (
    <>
    <h1>List container</h1>
    <ul className="events-list">
    {data && data.map((mock: any) => (
      <li key={mock.id}>
        <span>{mock.name}</span>
      </li>
    ))}
  </ul>
    </>
  );
}

export default MocksList;
