// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function SearchInput({ setSearchFocus }) {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState("");

  const handleFocus = () => {
    setFocus(true);
    setSearchFocus(true);
  };
  const handleSearch = () => {
    if (search) {
      window.location.href = `/${search}`;
      setFocus(false);
    }
  };
  const handleBlur = () => {
    if (search === "") {
      setFocus(false);
      setSearchFocus(false);
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClear = () => {
    setSearch("");
    setSearchFocus(false);
  };

  return (
    <Box sx={{ width: focus ? "100%" : "auto", transition: "width 0.3s" }}>
      {focus ? (
        <TextField
          sx={{ backgroundColor: "white" }}
          value={search}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClear}>
                  <CloseIcon />
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
          <SearchIcon sx={{ color: "white" }} />
        </IconButton>
      )}
    </Box>
  );
}

export default SearchInput;
