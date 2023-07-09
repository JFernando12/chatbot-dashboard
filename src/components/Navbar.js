import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import FlexBetween from './FlexBetween';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <AppBar
      sx={{
        position: 'static',
        background: '',
        boxShadow: '1',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Typography variant="h4" fontWeight="bold">
              THE DREAM GIFT
            </Typography>
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
