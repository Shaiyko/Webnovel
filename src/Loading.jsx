import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const LoadingComponent = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
      <Typography variant="h6" style={{ marginTop: '16px',color:"black" }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingComponent;
