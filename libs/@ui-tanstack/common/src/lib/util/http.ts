import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export async function fetchMocks({ signal, searchTerm }) {
  console.log(signal)
  let url = 'http://localhost:3000/mock/getAll';

  if (searchTerm) {
    url += '?search=' + searchTerm;
  }

  const response = await fetch(url, { signal: signal });
  if (!response.ok) {
    const error: any = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}
