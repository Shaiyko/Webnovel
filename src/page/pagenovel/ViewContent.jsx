import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Slider,
  Typography,
  IconButton,
  Menu,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { apinovel } from "../../URL_API/Apinovels";

const ViewContent = () => {
  const { id_novel, id } = useParams();
  const [content, setContent] = useState("");
  const [dataNameEP, setNameEP] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [show404, setShow404] = useState(false);

  // State for font size and background color
  const [fontSize, setFontSize] = useState(22);
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenSettings = (event) => setAnchorEl(event.currentTarget);
  const handleCloseSettings = () => setAnchorEl(null);

  const handleFontSizeChange = (event, newValue) => {
    setFontSize(newValue);
    sessionStorage.setItem("fontSize", newValue);
  };

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color);
    sessionStorage.setItem("backgroundColor", color);
  };

  const handleNextPage = () => {
    const currentIndex = episodes.findIndex((ep) => ep.id === parseInt(id));
    if (currentIndex >= 0 && currentIndex < episodes.length - 1) {
      window.location.href = `/novel/${id_novel}/${
        episodes[currentIndex + 1].id
      }`;
    }
  };

  const handlePreviousPage = () => {
    const currentIndex = episodes.findIndex((ep) => ep.id === parseInt(id));
    if (currentIndex > 0) {
      window.location.href = `/novel/${id_novel}/${
        episodes[currentIndex - 1].id
      }`;
    }
  };

  const handleDirectory = () => {
    window.location.href = `/novel/${id_novel}/directory`;
  };

  useEffect(() => {
    fetchEpisodes();
    handleGetmaxID();
  }, [id_novel, id]);

  useEffect(() => {
    const savedFontSize = sessionStorage.getItem("fontSize");
    const savedBackgroundColor = sessionStorage.getItem("backgroundColor");

    if (savedFontSize) setFontSize(parseInt(savedFontSize, 10));
    if (savedBackgroundColor) setBackgroundColor(savedBackgroundColor);
  }, []);

  const handleGetmaxID = () => {
    axios
      .get(`${apinovel}/view/ep_novelep/${id}`)
      .then((response) => {
        const data = response.data[0];
        if (data.id_novel !== parseInt(id_novel)) {
          setShow404(true);
          return;
        }
        setContent(data.content);
        setNameEP(data.name_episode);
      })
      .catch((error) => {
        console.error("Error:", error);
        setShow404(true);
      });
  };

  const fetchEpisodes = () => {
    axios
      .get(`${apinovel}/view/ep_novel/${id_novel}`)
      .then((response) => {
        setEpisodes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching episodes:", error);
      });
  };

  if (show404) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box sx={{ boxShadow: 2, width: 250, textAlign: "center" }}>
          <Typography variant="h4">404 Not Found</Typography>
          <Typography variant="subtitle2">Content not Found</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        fontSize: `${fontSize}px`, // Apply font size dynamically
        backgroundColor: backgroundColor,
        color: "black",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mb={2}
      >
        <Typography variant="h5">Chapter {dataNameEP}</Typography>
        <IconButton
          size="large"
          color="inherit"
          onClick={handleOpenSettings}
          sx={{ ml: 2 }}
        >
          <SettingsIcon />
        </IconButton>
      </Box>

      <div
        style={{
          border: "1px solid #ccc",
          minHeight: "auto",
          padding: "10px",
          maxWidth: "100%",
          overflowY: "auto",
          overflowX: "hidden", // Prevent horizontal scroll
          whiteSpace: "pre-wrap",
          backgroundColor: backgroundColor,
          color: "black",
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <Box display={"flex"} justifyContent={"space-between"} mt={2} mb={2}>
        <Button variant="contained" onClick={handlePreviousPage}>
          Previous Chapter
        </Button>
        <Button variant="contained" onClick={handleDirectory}>
          Directory
        </Button>
        <Button variant="contained" onClick={handleNextPage}>
          Next Chapter
        </Button>
      </Box>

      {/* Settings Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseSettings}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Settings</Typography>
          <Typography variant="body1">Font Size</Typography>
          <Slider
            value={fontSize}
            min={12}
            max={44}
            step={1}
            onChange={handleFontSizeChange}
            aria-labelledby="font-size-slider"
            sx={{ mb: 2 }}
          />
          <Typography variant="body1">Background Color</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "white" }}
              onClick={() => handleBackgroundColorChange("white")}
            >
              White
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#f0f0f0" }}
              onClick={() => handleBackgroundColorChange("#f0f0f0")}
            >
              Light Gray
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#333" }}
              onClick={() => handleBackgroundColorChange("#333")}
            >
              Dark Gray
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#ffecb3" }}
              onClick={() => handleBackgroundColorChange("#ffecb3")}
            >
              Amber
            </Button>
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};

export default ViewContent;
