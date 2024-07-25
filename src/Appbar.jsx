import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from '@mui/material';
import TemporaryDrawer from './memu';
import { blue, deepOrange, red } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import SearchInput from './page/pagemanagement/Search/Search';

export default function Appbar() {
  const [datacolor, setcolor] = useState(null);
  const [dataloged, setlogged] = useState(null);
  const [searchFocus, setSearchFocus] = useState(false);
  const [showAppBar, setShowAppBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const controlAppBar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        setShowAppBar(false);
      } else { // if scroll up show the navbar
        setShowAppBar(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlAppBar);

      return () => {
        window.removeEventListener('scroll', controlAppBar);
      };
    }
  }, [lastScrollY]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      if (loggedInUser.status === 'user') {
        setcolor({ bgcolor: deepOrange[500], marginLeft: 2 });
        setlogged(JSON.parse(localStorage.getItem('userP')));
      } else if (loggedInUser.status === 'admin') {
        setcolor({ bgcolor: blue[500], marginLeft: 2 });
        setlogged(JSON.parse(localStorage.getItem('admin')));
      } else if (loggedInUser.status === 'author') {
        setcolor({ bgcolor: red[500], marginLeft: 2 });
        setlogged(JSON.parse(localStorage.getItem('author')));
      }
    }
  }, []);

  return (
    <>
      <AppBar position="fixed" sx={{ transition: 'top 0.3s', top: showAppBar ? '0' : '-80px' }}>
        <Toolbar>
          <TemporaryDrawer />
          <Box sx={{ flexGrow: 1, display: isSmallScreen && searchFocus ? 'none' : { xs: 'flex', md: 'flex' } }}>
            <Button href="/" sx={{ my: 2, color: 'white', display: 'block' }}>
              <Typography variant="h6">Dex Novel</Typography>
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, maxWidth: isSmallScreen ? '600px' : 'auto', ml: isSmallScreen ? 2 : 0 ,display:"flex",justifyContent:"end"}}>
            <SearchInput setSearchFocus={setSearchFocus} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 2 ,justifyContent:"end"}}>
            {dataloged ? (
              <Avatar sx={datacolor}>{dataloged.user_name.charAt(0)}</Avatar>
            ) : (
              <Typography></Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Add a Toolbar here to give the content correct offset */}
    </>
  );
}
