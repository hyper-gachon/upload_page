// Navbar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../Logo.png';

const Navbar = ({ isLoggedIn, handleLogout }) => {
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
                    <img src={Logo} alt="Your Logo" style={{ maxWidth: '200px' }} />
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default Navbar;
