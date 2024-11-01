//////////// GROPS
export async function createGroup({ formData }) {
  delete formData._id;
  console.log(JSON.stringify(formData));
  const url = `http://localhost:3000/api/group`;

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

export async function updateGroup({ formData }) {
  const url = `http://localhost:3000/api/group`;

  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const error: any = new Error('An error occurred while updating the group');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}

export async function fetchGroups({ signal, searchTerm, activeSpaceId }) {
  let url = `http://localhost:3000/api/group/getAll/${activeSpaceId}`;

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

export async function deleteGroup({ row }) {
  const url = `http://localhost:3000/api/group/${row._id}`;

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

export async function fetchGroup({ signal, id }) {
  console.log(signal);
  const url = `http://localhost:3000/api/group/${id}`;

  const response = await fetch(url, { signal: signal });
  if (!response.ok) {
    const error: any = new Error('An error occurred while fetching the group');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}

export async function fetchSummarySpaces({ signal }) {
  console.log(signal);
  const url = `http://localhost:3000/api/space/summary/getAll`;

  const response = await fetch(url, {
    signal: signal,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!response.ok) {
    const error: any = new Error('An error occurred while fetching the summary spaces list');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}
