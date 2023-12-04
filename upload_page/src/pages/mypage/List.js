import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import instance from "../../shared/Request";
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Kakao from '../upload/Kakao';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { format } from 'date-fns'; // date-fns 라이브러리 추가

export default function Lists() {
  const [rows, setRows] = useState([]); // 광고 정보를 저장할 상태
  const [open, setOpen] = useState(false); // 다이얼로그 상태
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [titleToDelete, setTitleToDelete] = useState('');
  const [editOpen, setEditOpen] = useState(false); // 수정 대화 상자 상태
  const [editAd, setEditAd] = useState({}); // 수정할 광고의 정보
  const [mapPosition, setMapPosition] = useState({ latitude: 0, longitude: 0 }); // 추가: 좌표 정보 상태

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const response = await instance.get('/api/advertises', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.data.code === 200 && response.data.isSuccess) {
          const adData = response.data.result;
          setRows(adData);
        } else {
          console.error('불러오기 오류:', response.data.message);
        }
      } catch (error) {
        console.error('불러오기 오류:', error);
      }
    };

    fetchAdData();
  }, [accessToken]);

  const handleClickOpen = (postId, title) => {
    setPostIdToDelete(postId);
    setTitleToDelete(title);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPostIdToDelete(null);
    setTitleToDelete('');
  };

  const handleDelete = async () => {
    const inputTitle = document.getElementById("delete-title-input").value;
    if (inputTitle === titleToDelete) {
      try {
        const response = await instance.delete(`/api/advertises/${postIdToDelete}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.data.code === 200 && response.data.isSuccess) {
          setRows(rows.filter(row => row.postId !== postIdToDelete));
        } else {
          console.error('삭제 오류:', response.data.message);
        }
      } catch (error) {
        console.error('삭제 오류:', error);
      }
      handleClose();
    } else {
      alert("제목이 일치하지 않습니다.");
    }
  };

  const handleEditOpen = (ad) => {
    setEditAd(ad);
    setEditOpen(true);
    setMapPosition({ latitude: ad.latitude, longitude: ad.longitude });
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const parseDateStringToDate = (dateString) => {
    // 예시: '2023-12-31'
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate) ? null : parsedDate;
  };

  const handleEditSave = async () => {

    try {
      // 여기에 수정 로직을 구현합니다.
      const response = await instance.patch(`/api/advertises`, {
        title: document.getElementById("Title").value,
        content: document.getElementById("Content").value,
        latitude: mapPosition.latitude,
        longitude: mapPosition.longitude
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data.code === 200 && response.data.isSuccess) {
        // 수정 후 상태 업데이트
        const updatedAdData = rows.map((row) =>
          row.postId === editAd.postId ? { ...row, title: response.data.result.title, content: response.data.result.content } : row
        );
        setRows(updatedAdData);
      } else {
        console.error('수정 오류:', response.data.message);
      }
    } catch (error) {
      console.error('수정 오류:', error);
    }

    handleEditClose();
  };

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.postId}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.content}</TableCell>
              <TableCell>{row.startDate}</TableCell>
              <TableCell>{row.endDate}</TableCell>
              <TableCell>
                <button onClick={() => handleEditOpen(row)}>Edit</button>
              </TableCell>
              <TableCell>
                <button onClick={() => handleClickOpen(row.postId, row.title)}>Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>삭제 확인</DialogTitle>
        <DialogContent>
          <DialogContentText>
            삭제하려면 제목 '{titleToDelete}'을 입력하세요.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="delete-title-input"
            hiddenLabel
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleDelete}>삭제</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>광고 수정</DialogTitle>
        <DialogContent>
          <Grid item xs={12}>
            <TextField
              required
              id="Title"
              name="Title"
              label="Title"
              fullWidth
              defaultValue={editAd.title}
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
              defaultValue={editAd.content}
              autoComplete="Explanation"
              variant="standard"
            />
          </Grid>

          <Grid container sx={{ m: 3, alignItems: 'center', justifyContent: 'center' }}>
            <Kakao onLocationChange={(lat, lng) => {
              setMapPosition({ latitude: lat, longitude: lng });
            }} />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>취소</Button>
          <Button onClick={handleEditSave}>저장</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
