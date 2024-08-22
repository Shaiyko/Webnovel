import React from 'react';
import { Container, Box, Typography, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'primary.main',
        color: 'white',
        mt: 'auto',
        position: 'relative',
        bottom: 0,
        marginTop:10
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are a leading website in providing novel solutions for readers and authors alike.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Links
            </Typography>
            <Box>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
            </Box>
            <Box>
              <Link href="/novel-category/0" color="inherit" underline="hover">
              Novel Categories
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: Dexprojectkk@gmail.com
            </Typography>
            <Typography variant="body2">
              Phone: (+856) 20 98 039 196
            </Typography>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="inherit">
            &copy; {new Date().getFullYear()} Novel Website. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
