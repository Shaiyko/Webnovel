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

  const isSmallScreen = useMediaQuery('(max-width:600px)');

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
    <Box>
      <AppBar component="nav" sx={{height:"58px"}}>
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
    </Box>
  );
}
