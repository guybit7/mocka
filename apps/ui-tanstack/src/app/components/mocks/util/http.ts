export async function createMock({ formData }) {
  delete formData._id;
  console.log(JSON.stringify(formData));
  const url = `http://localhost:3000/api/mock`;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const error: any = new Error('An error occurred while fetching the mocks');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}

export async function updateMock({ formData }) {
  const url = `http://localhost:3000/api/mock`;

  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const error: any = new Error('An error occurred while updating the mock');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}

export async function fetchMocks({ signal, groupId, searchTerm }) {
  let url = `http://localhost:3000/api/mock/getAll?groupId=${groupId}`;

  if (searchTerm) {
    url += '?search=' + searchTerm;
  }

  const response = await fetch(url, { signal: signal });
  if (!response.ok) {
    const error: any = new Error('An error occurred while fetching the mocks');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}

export async function deleteMock({ row }) {
  const url = `http://localhost:3000/api/mock/${row._id}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const error: any = new Error('An error occurred while fetching the mocks');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}

export async function fetchMock({ signal, id }) {
  console.log(signal);
  const url = `http://localhost:3000/api/mock/${id}`;

  const response = await fetch(url, { signal: signal });
  if (!response.ok) {
    const error: any = new Error('An error occurred while fetching the mock');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}
