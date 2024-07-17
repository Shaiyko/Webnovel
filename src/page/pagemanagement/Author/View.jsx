// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Modal,
  Button
} from '@mui/material';
import axios from 'axios';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

// eslint-disable-next-line react/prop-types
export default function Viewauthor({ selected,setSelected}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      setSelected([]);
    };
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (selected && selected.length > 0) {
      axios
        .get(`http://localhost:5000/view/author/${selected[0]}`)
        .then(response => {
          setAdminData(response.data[0]);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
  }, [selected]);

  return (
    <>
    <Button onClick={handleOpen}>
        <RemoveRedEyeIcon  color="info" />
      </Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="admin-details-modal-title"
      aria-describedby="admin-details-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">Error: {error.message}</Typography>
        ) : adminData ? (
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={adminData.avatar || 'default_avatar_url_here'}
              alt="Admin Avatar"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {adminData.realname}( {adminData.penname})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Gender:</strong> {adminData.gender}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Date of Birth:</strong> {adminData.date_of_birth}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Contact_channels:</strong><a href= {adminData.contact_channels}> {adminData.contact_channels}</a>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Address:</strong> {adminData.address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Username:</strong> {adminData.user_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Gmail:</strong> {adminData.gmail}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography>No admin data found.</Typography>
        )}
        <Button onClick={handleClose} variant="contained" color="primary" sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
    </>
  );
}
