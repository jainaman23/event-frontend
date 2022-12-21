import React from 'react';
import { styled } from '@mui/material/styles';
import TopHeaderBar from '@molecules/TopHeaderBar';
import Box from '@mui/material/Box';
// import { ReactComponent as LOGO } from '@assets/images/logo.svg';

const drawerWidth = 0;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(TopHeaderBar)(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  justifyContent: 'center',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Main = styled(Box)(({ theme, open }) => {
  return {
    whiteSpace: 'nowrap',
    // ...(open && {
    //   ...openedMixin(theme),
    // }),
    ...(!open && {
      ...closedMixin(theme),
    }),
  };
});

function Header({ children, label, navigate }) {
  const [open, setOpen] = React.useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar label={label} navigate={navigate} open={open} handleDrawerOpen={handleDrawerOpen} />
      <Main
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: '100vh',
        }}
      >
        <DrawerHeader />
        {children}
        <DrawerHeader />
      </Main>
    </Box>
  );
}

export default Header;
