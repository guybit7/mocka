export async function signin({ formData }) {
  let url = `http://localhost:3000/auth/login`;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(formData),
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
