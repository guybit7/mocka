import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export async function fetchMocks({ signal, searchTerm }) {
  console.log(signal);
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

export async function fetchMock({ signal, id }) {
  let url = `http://localhost:3000/mock/${id}`;

  const response = await fetch(url, { signal: signal });
  if (!response.ok) {
    const error: any = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}

export async function createMock({ formData }) {
  console.log(formData);
  let url = `http://localhost:3000/mock`;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const error: any = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}
