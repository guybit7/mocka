import { useContext, useEffect, useState } from 'react';
import styles from './topbar.module.scss';
import { AuthContext } from '../auth/auth-provider/auth-provider';
import { Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@ui-tanstack/common';

export function Topbar() {
  const { user } = useContext(AuthContext) as any;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
  };

  const MocksHandler = () => {
    navigate('./main');
  };

  const groupsHandler = () => {
    navigate('./groups');
  };

  useEffect(() => {
    console.log(user);
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSpaces = () => {
    navigate('./admin/spaces');
    handleClose();
  };

  return (
    <div className={styles['topbar-container']}>
      <div>
        <span> {user.fullName}</span>
      </div>
      <div className={styles['topbar-actions']}>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Dashboard
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleSpaces}>Spaces</MenuItem>
            <MenuItem onClick={handleClose}>Users</MenuItem>
            {/* <MenuItem onClick={handleClose}></MenuItem> */}
          </Menu>
        </div>
        <Button variant="outlined" onClick={settingsHandler}>
          Settings
        </Button>
        <Button variant="outlined" onClick={groupsHandler}>
          Groups
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
