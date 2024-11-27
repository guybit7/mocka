import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import './users-table.scss';
import { User } from '../interfaces/user';
import { muAxiosClient } from '@mu/mu-auth';

export function UsersTable() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: ({ signal }) => {
      const url = '/api/user/getAll';
      return muAxiosClient.get<any, any>(url, { signal });
    },
    enabled: true, // Only run query if activeSpace is set
    refetchOnWindowFocus: false, // Optional: Prevents refetch when window is focused
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  console.log(data);
  return (
    <div>
      <h1>Users Table</h1>

      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.map((user: User) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.fullName}</td>
                <td>
                  {/* <button onClick={() => deleteUserMutation(user._id)} disabled={isDeleting}>
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button> */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
