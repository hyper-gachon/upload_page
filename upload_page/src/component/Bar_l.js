// Navbar_l.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../Logo.png';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Navbar_l = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Add code to delete the access token
    // For example, if using local storage:
    localStorage.removeItem('accessToken');
    // Navigate to the login page
    navigate('/');
    // You may also need to dispatch an action to update your authentication state
  };

  return (
    <React.Fragment>
      <AppBar
        position="absolute"
        color='inherit'
        elevation={0}
        sx={{
          position: 'relative',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <RouterLink to="/mypage">
            <img src={Logo} alt="Your Logo" style={{ maxWidth: '200px' }} />
          </RouterLink>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Button sx={{ color: 'black' }} onClick={handleLogout}>
              Logout
            </Button>
            <RouterLink to="/upload">
              <Button
                variant="contained"
                sx={{
                  padding: '0.3rem 1.5rem',
                  backgroundColor: '#073763',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#073763',
                  },
                }}
              >
                Upload
              </Button>
            </RouterLink>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar_l;
