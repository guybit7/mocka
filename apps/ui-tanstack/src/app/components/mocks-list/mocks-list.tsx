import { useQuery } from '@tanstack/react-query';
import './mocks-list.scss';
import { fetchMocks } from '@ui-tanstack/common';
import { useState } from 'react';
import MockItem from '../mock-item/mock-item';

export function MocksList() {
  const [searchTerm, setSearchTerm] = useState();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', { searchTerm: searchTerm }],
    queryFn: ({ signal, queryKey }) => fetchMocks({ signal, ...queryKey[1] }),
    enabled: true, //searchTerm !== undefined
  });
  return (
    <>
      <h1>List container</h1>
      <ul className="events-list">
        {data &&
          data.map((mock: any, index: number) => (
            <li key={mock.id}>
              <MockItem data={mock} xxx={index}></MockItem>
            </li>
          ))}
      </ul>
    </>
  );
}

export default MocksList;
