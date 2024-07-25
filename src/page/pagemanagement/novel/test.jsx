import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function NovelPage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Item>
            <Typography variant="h4">กลืนแสง</Typography>
            <Typography variant="body1">ผู้เขียน: ซันเชสเซอร์ ซามูไร</Typography>
            <Typography variant="body1">หมวดหมู่: เดินทางข้ามเวลาและอวกาศ</Typography>
            <Typography variant="body1">3.8059 ล้านคำ |. ข้อความเต็ม</Typography>
            <Typography variant="body1">อัปเดต: 28-11-2022</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>เริ่มอ่าน</Button>
            <Button variant="contained" sx={{ mt: 2, ml: 2 }}>เพิ่มลงในชั้นวางหนังสือ</Button>
          </Item>
          <Item>
            <Typography variant="h5">ฉลาก</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>หลงใหล</Button>
            <Button variant="contained" sx={{ mt: 2, ml: 2 }}>การเดินทางข้ามเวลา</Button>
            <Button variant="contained" sx={{ mt: 2, ml: 2 }}>การต่อสู้เพื่ออำนาจ</Button>
          </Item>
          <Item>
            <Typography variant="h5">สารบัญ</Typography>
            <Typography variant="body1">คำพูดสุดท้าย</Typography>
            <Typography variant="body1">คำลงท้าย</Typography>
            <Typography variant="body1">1709 หมู่บ้านที่ถูกเผาไหม้ (ตอนจบ)</Typography>
            <Typography variant="body1">1708 คำถาม</Typography>
            <Typography variant="body1">1707 ความมั่นใจ</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <Typography variant="h5">การแนะนำ</Typography>
            <Typography variant="body1">28-11-2022</Typography>
            <Typography variant="body1">28-11-2022</Typography>
            <Typography variant="body1">28-11-2022</Typography>
            <Typography variant="body1">28-11-2022</Typography>
            <Typography variant="body1">28-11-2022</Typography>
            <Button variant="contained" sx={{ mt: 2 }}>แคตตาล็อกที่สมบูรณ์</Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}