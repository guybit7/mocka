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
  delete formData._id;
  console.log(JSON.stringify(formData));
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

export async function updateMock({ formData }) {
  console.log(formData);
  let url = `http://localhost:3000/mock`;

  const response = await fetch(url, {
    method: 'PUT',
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

export async function deleteMock({ row }) {
  console.log(row);
  let url = `http://localhost:3000/mock/${row._id}`;

  const response = await fetch(url, {
    method: 'DELETE',
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

export async function deleteMocks({ selected }) {
  console.log(selected);
  let url = `http://localhost:3000/mock`;

  const response = await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify({ id: selected }),
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

//////////// GROPS
export async function createGroup({ formData }) {
  delete formData._id;
  console.log(JSON.stringify(formData));
  const url = `http://localhost:3000/group`;

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

/////////// AUTH
export async function logout() {
  let url = `http://localhost:3000/auth/logout`;

  const response = await fetch(url, {
    method: 'POST',
    body: null,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!response.ok) {
    const error: any = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}
