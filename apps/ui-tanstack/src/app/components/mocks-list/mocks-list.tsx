import { useQuery } from '@tanstack/react-query';
import './mocks-list.scss';
import { fetchMocks } from '@ui-tanstack/common';
import { useRef, useState } from 'react';
import MockItem from '../mock-item/mock-item';

export function MocksList() {
  const [searchTerm, setSearchTerm] = useState<string>();
  const searchElement = useRef<HTMLInputElement>();
  let content = <p>Plesae enter a search term and to find items</p>;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', { searchTerm: searchTerm }],
    queryFn: ({ signal, queryKey }) => fetchMocks({ signal, ...queryKey[1] }),
    enabled: searchTerm !== undefined,
  });

  function handleSubmit(event: any) {
    event.preventDefault();
    setSearchTerm(searchElement.current?.value);
  }

  if (isError) {
    content = <p>Error</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data &&
          data.map((mock: any, index: number) => (
            <li key={`${mock.id$}-${index}`}>
              <MockItem data={mock} xxx={index}></MockItem>
            </li>
          ))}
      </ul>
    );
  }

  return (
    <>
      <div>
        <div id="search-container">
          <h2>Find item</h2>
          <form onSubmit={handleSubmit}>
            <input type="search" className="input" placeholder="Search item" ref={searchElement} />
            <button>Search</button>
          </form>
        </div>
      </div>

      <div id="list-container">{content}</div>
    </>
  );
}

export default MocksList;
