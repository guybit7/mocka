//////////// SPACES
export async function createSpace({ formData }) {
  delete formData._id;
  console.log(JSON.stringify(formData));
  const url = `http://localhost:3000/space`;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const error: any = new Error('An error occurred while creating space');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}
export async function updateSpace({ formData }) {
  const url = `http://localhost:3000/space`;

  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const error: any = new Error('An error occurred while updating the space');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}

export async function fetchSpaces({ signal, searchTerm }) {
  console.log(signal);
  let url = 'http://localhost:3000/space/getAll';

  if (searchTerm) {
    url += '?search=' + searchTerm;
  }

  const response = await fetch(url, { signal: signal });
  if (!response.ok) {
    const error: any = new Error('An error occurred while fetching the spaces');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}

export async function deleteSpace({ row }) {
  const url = `http://localhost:3000/space/${row._id}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const error: any = new Error('An error occurred while deleting the space');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}

export async function fetchSpace({ signal, id }) {
  console.log(signal);
  const url = `http://localhost:3000/space/${id}`;

  const response = await fetch(url, { signal: signal });
  if (!response.ok) {
    const error: any = new Error('An error occurred while fetching the space');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}


