import { useContext, useEffect } from 'react';
import styles from './topbar.module.scss';
import { AuthContext } from '../auth/auth-provider/auth-provider';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@ui-tanstack/common';

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

  const settingsHandler = () => {
    navigate('./settings');
  }

  const MocksHandler = () => {
    navigate('./main');
  }

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className={styles['topbar-container']}>
      <div>
        <span> {user.fullName}</span>
      </div>
      <div className={styles['topbar-actions']}>
        <Button variant="outlined" onClick={settingsHandler}>
          Settings
        </Button>
        <Button variant="outlined" onClick={MocksHandler}>
          Mocks List
        </Button>
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
