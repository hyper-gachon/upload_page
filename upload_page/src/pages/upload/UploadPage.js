import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Kakao from './Kakao';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import instance from "../../shared/Request";
import { format } from 'date-fns';
import Navbar_l from '../../component/Bar_l';


function upload(Title, Content, StartDate, EndDate, latitude, longitude) {
  const accessToken = localStorage.getItem('accessToken');

  return instance.post('/api/advertises', {
    title: Title,
    content: Content,
    startDate: StartDate,
    endDate: EndDate,
    latitude,
    longitude
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then(function (response) {

    console.log('Upload Response:', response.data); // 콘솔에 응답 출력

    if (response.data.code === 200 && response.data.isSuccess) {
      return response.data; // 성공한 경우 응답 객체 반환
    } else {
      // 서버에서 오류 메시지를 반환한 경우
      console.error('업로드 오류:', response.data.message);
      throw new Error(response.data.message);
    }
  }).catch(function (error) {
    // 서버 요청 실패 또는 업로드에 실패한 경우
    console.error('업로드 오류:', error);
    throw error;
  });
}


export default function UploadPage() {
  const [open, setOpen] = useState(true);
  const [mapPosition, setMapPosition] = useState({ latitude: 0, longitude: 0 });

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  useEffect(() => {
    // 로컬 스토리지에서 JWT 토큰 가져오기
    const token = localStorage.getItem('accessToken');
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const formattedStartDate = selectedStartDate
      ? format(new Date(selectedStartDate), 'yyyy-MM-dd')
      : '';

    const formattedEndDate = selectedEndDate
      ? format(new Date(selectedEndDate), 'yyyy-MM-dd')
      : '';

    const data = {
      title: event.currentTarget.Title.value,
      content: event.currentTarget.Content.value,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      latitude: mapPosition.latitude,
      longitude: mapPosition.longitude,
    };

    try {
      await upload(
        data.title,
        data.content,
        data.startDate,
        data.endDate,
        data.latitude,
        data.longitude
      );
      console.log(data.title);
      alert('업로드 성공!');
      window.location.href = '/mypage';
    } catch (error) {
      alert('업로드에 실패했습니다.');
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <Navbar_l />
      <Typography component="h1" variant="h4" align="center" marginTop={6} style={{ fontWeight: 'bold' }}>
        Upload
      </Typography>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Container component="main" maxWidth="sm" sx={{ marginTop: 8, mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="Title"
                      name="Title"
                      label="Title"
                      fullWidth
                      autoComplete="given-title"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="Content"
                      name="Content"
                      label="Content"
                      fullWidth
                      autoComplete="Explanation"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          required
                          id="StartDate"
                          name="StartDate"
                          label="시작 날짜"
                          value={selectedStartDate}
                          onChange={(date) => setSelectedStartDate(date)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          required
                          id="EndDate"
                          name="EndDate"
                          label="끝 날짜"
                          value={selectedEndDate}
                          onChange={(date) => setSelectedEndDate(date)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid container sx={{ m: 3, alignItems: 'center', justifyContent: 'center' }}>
                    <Kakao onLocationChange={(lat, lng) => {
                      console.log('Received location:', lat, lng);
                      setMapPosition({ latitude: lat, longitude: lng });
                    }} />
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ display: 'block', margin: '0 auto' , backgroundColor: '#073763'}}
                  >
                    Upload
                  </Button>
                </Grid>
              </Box>
            </Paper>
          </Container>
        </Box>
    </React.Fragment>
  );
}
