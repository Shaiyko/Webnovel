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
import { TextField } from '@mui/material';

// eslint-disable-next-line react/prop-types
export default function ViewSuggestions({ selected,setSelected}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      setSelected([]);
    };
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const formatDate = (createdate) => {
    const date = new Date(createdate);
    return date.toLocaleDateString("en-GB"); // Day/Month/Year format
  };
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (selected && selected.length > 0) {
      axios
        .get(`http://localhost:5000/reposrt/${selected[0]}`)
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
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              <strong>User:</strong>  {adminData.user_name}
              </Typography>
              <Typography gutterBottom variant="body2">
              <strong>Date:</strong>  {formatDate(adminData.date)}
              </Typography>
              <Typography variant="body2">
                <strong>Novel:</strong> {adminData.name_novel}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Type Suggestions:</strong> {adminData.typerepost}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Text Suggestions:</strong> <TextField disabled label={adminData.reason} />
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
