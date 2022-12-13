import React from 'react';
import { useRouter } from 'next/router';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Container from '@atoms/GridContainer';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Item from '@components/atoms/GridItem';

const TopBar = ({ label, navigate, open, handleDrawerOpen, ...props }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <AppBar position="fixed" open={open} {...props}>
      <Toolbar>
        <Container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Item>
            <Container sx={{ alignItems: 'center' }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerOpen}
                sx={{
                  mr: 2,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              {navigate && (
                <IconButton onClick={handleBack} sx={{ mr: 1 }} color="inherit">
                  <KeyboardBackspaceIcon sx={{ fontSize: 24 }} />
                </IconButton>
              )}
              <Typography variant="h5">{label}</Typography>
            </Container>
          </Item>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
