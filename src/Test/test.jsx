import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function SearchInput({ setSearchFocus }) {
  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState('');

  const handleFocus = () => {
    setFocus(true);
    setSearchFocus(true);
  };

  const handleBlur = () => {
    if (search === '') {
      setFocus(false);
      setSearchFocus(false);
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClear = () => {
    setSearch('');
    setSearchFocus(false);
  };

  return (
    <Box sx={{ width: focus ? '100%' : 'auto', transition: 'width 0.3s' }}>
      {focus ? (
        <TextField
        sx={{backgroundColor:"white"}}
          value={search}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon  />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClear}>
                  <CloseIcon  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
          autoFocus
          fullWidth
        />
      ) : (
        <IconButton onClick={handleFocus}>
          <SearchIcon sx={{color:"white"}} />
        </IconButton>
      )}
    </Box>
  );
}

export default SearchInput;
