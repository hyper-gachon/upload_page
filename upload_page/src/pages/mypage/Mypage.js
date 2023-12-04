import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Navbar_l from '../../component/Bar_l';
import Lists from './List';
import Typography from '@mui/material/Typography'


export default function Mypage() {

  return (
    <React.Fragment>
      <Navbar_l />
      <Typography component="h1" variant="h4" align="center" marginTop={6} style={{ fontWeight: 'bold' }}>
        Mypage
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* List */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Lists />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </React.Fragment>
  );
}