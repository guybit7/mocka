import { Button } from '@mui/material';
import './topbar.scss';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@me/auth';

export async function logout() {
  const url = `http://localhost:3000/api/auth/logout`;

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

export function Topbar() {
  const { user } = useContext(AuthContext) as any;

  const navigate = useNavigate();

  const { mutate: logoutHandler } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      navigate('./login');
    },
  });

  const handleLogout = () => {
    logoutHandler();
  };

  return (
    <div className="topbar-container">
      <div className="topbar-start">
        <div>
          <span style={{ color: 'green' }}> {user.fullName}</span>
        </div>

        {/* <Button variant="outlined" onClick={groupsHandler}>
          Groups
        </Button> */}
      </div>

      <div className="topbar-actions">
        {/* <Button variant="outlined" onClick={settingsHandler}>
          Settings
        </Button> */}
      </div>
      <div>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Topbar;
