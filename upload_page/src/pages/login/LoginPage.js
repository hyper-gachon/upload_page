import * as React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import instance from '../../shared/Request'
import Navbar from '../../component/Bar';


function AuthLinks() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3, mb: 2 }}>
      <Link component={RouterLink} to="/register" color="inherit" style={{ marginRight: '10px' }}>
        회원가입
      </Link>
    </Typography>
  );
}

function login(email, password) {
  return instance.post('/api/users/login', {
    userId: email,
    password: password
  }).then(function (response) {
    if (response.data.code === 200 && response.data.isSuccess) {
      // 로그인 성공 시 JWT 토큰을 저장합니다.
      localStorage.setItem('accessToken', response.data.result.accessToken);
      return response.data; // 성공한 경우 응답 객체 반환
    } else {
      // 서버에서 오류 메시지를 반환한 경우
      console.error('로그인 오류:', response.data.message);
      throw new Error(response.data.message);
    }
  }).catch(function (error) {
    // 서버 요청 실패 또는 로그인에 실패한 경우
    console.error('로그인 오류:', error);
    throw error;
  });
}

export default function LoginPage() {
  const [loginError] = React.useState(null); // 로그인 오류 메시지 상태

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await login(data.get('email'), data.get('password'));
      alert('로그인 성공!');
      window.location.href = '/mypage';
    } catch (error) {
      alert('로그인에 실패했습니다.');
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar/>
      <Typography component="h1" variant="h4" align="center" marginTop={6} style={{ fontWeight: 'bold' }}>
        Login :)
      </Typography>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, backgroundColor: "#FFFDFD" }}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={3} alignItems="center" marginTop={1}>
              <Grid item xs={12} sm={4} align="center">
                이메일
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  hiddenLabel
                  required
                  id="email"
                  name="email"
                  autoComplete="email"
                  variant="filled"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} align="center">
                비밀번호
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  hiddenLabel
                  id="password"
                  type="password"
                  variant="filled"
                  size="small"
                  name="password"
                  fullWidth
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            {loginError && (
              <Typography color="error">
                {loginError}
              </Typography>
            )}
            <Button
              variant="contained"
              type="submit"
              sx={{
                padding: '0.4rem 4rem',
                backgroundColor: '#073763',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#073763',
                },
                marginTop: 4,
              }}
            >
              로그인
            </Button>
            <AuthLinks />
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}