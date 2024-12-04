/* eslint-disable @nx/enforce-module-boundaries */
import { MuCollapsibleListItem } from '@mockoto-ui-common/design-system';
import { MuAuthContext, PUBLIC_CLIENT_APPLICATION } from '@mu/mu-auth';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import DashboardIcon from '@mui/icons-material/Dashboard'; // Admin-specific icon
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import * as React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './mu-shell.scss';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export async function logout() {
  const url = `http://localhost:3000/api/auth/sso/logout`;

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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function MuShell() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const { user }: any = React.useContext(MuAuthContext);

  const { mutate: logoutHandler } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      navigate('./login');
    },
  });

  const navigate = useNavigate();

  const navigationItems = [{ text: 'Groups', path: '/groups', icon: <DashboardIcon /> }];

  const nestedNavigationItems = [
    {
      label: 'Admin',
      icon: <AdminPanelSettingsIcon />,
      items: [
        {
          label: 'Spaces',
          icon: <CorporateFareIcon />,
          path: '/admin/spaces',
        },
        {
          label: 'Users',
          icon: <PeopleIcon />,
          path: '/admin/users',
        },
      ],
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onLogout = async () => {
    try {
      await PUBLIC_CLIENT_APPLICATION.logoutPopup().then(() => {
        logoutHandler();
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const onClickNestedItem = (item: any) => {
    navigate(item.path);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: 'flex', justifyContent: open ? 'flex-end' : 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <Typography variant="h6" noWrap component="div">
              {user.email}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {nestedNavigationItems.map((item, index) => (
            <MuCollapsibleListItem
              key={index}
              label={item.label}
              icon={item.icon}
              subItems={item.items}
              onClickNestedItem={item => onClickNestedItem(item)}
              iconCollapsed={<ExpandMore />}
              iconExpanded={<ExpandLess />}
            />
          ))}
          {navigationItems.map((item, index) => {
            return (
              <NavLink
                to={item.path} // The path for the navigation
                key={index} // Key for each NavLink
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  width: '100%',
                  display: 'flex',
                  backgroundColor: isActive ? 'rgba(0, 123, 255, 0.2)' : 'transparent', // Highlight active item
                  color: isActive ? '#007bff' : 'inherit', // Change text color on active
                })}
              >
                <ListItemButton sx={{}} onClick={() => navigate(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </NavLink>
            );
          })}
          <ListItem key={'logout'} disablePadding>
            <ListItemButton
              onClick={() => {
                onLogout();
              }}
            >
              <ListItemIcon>{<LogoutIcon />}</ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main
        open={open}
        sx={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '0.5rem' }}
      >
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
