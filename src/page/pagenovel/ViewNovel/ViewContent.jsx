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

const ViewContent = () => {
  const { id_novel, id } = useParams();
  const [dataname, setNameN] = useState("");
  const [databook, setbookmark] = useState("");
  const [dataep, setep] = useState("");
  const [content, setContent] = useState("");
  const [dataNameEP, setNameEP] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [show404, setShow404] = useState(false);

  const [fontSize, setFontSize] = useState(22);
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [fontFamily] = useState(
    "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@100..900&display=swap');"
  );
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenSettings = (event) => setAnchorEl(event.currentTarget);
  const handleCloseSettings = () => setAnchorEl(null);

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
  }, [id_novel]);

  useEffect(() => {
    handleGetmaxID();
    fetchEpisodes();
    UserGet();
    Bookmark();
  }, []);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser && loggedInUser.status === "user") {
      const loggedInUserP = JSON.parse(localStorage.getItem("userP"));
      setUserId(loggedInUserP.id_user);
    }
  }, []);
  const UserGet = () => {
    axios
      .get(`http://localhost:5000/novelall2/${id_novel}`)
      .then((response) => {
        const data2 = response.data[0];
        setNameN(data2.name_novel);
      })
      .catch((error) => console.log("error", error));
  };
  const handleGetmaxID = () => {
    axios
      .get(`http://localhost:5000/view/ep_novelep/${id}`)
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
      .get(`http://localhost:5000/view/ep_novel/${id_novel}`)
      .then((response) => {
        setEpisodes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching episodes:", error);
      });
  };
  const Bookmark = () => {
    axios
      .get(
        `http://localhost:5000/readings?id_user=${userId}&id_novel=${id_novel}`
      )
      .then((response) => {
        const data = response.data[0];
        setbookmark(data.bookmark);
        setep(data.episodes);
      })
      .catch((error) => {
        console.error("Error fetching episodes:", error);
      });
  };
  const handleBookmark = async () => {
    if (userId) {
      try {
        const response = await axios.put(
          "http://localhost:5000/update/reading",
          {
            id_user: userId,
            id_novel: id_novel,
            bookmark: dataname,
          }
        );
        console.log("Reading entry created:", response.data);
      } catch (error) {
        if (error.response && error.response.status === 409) {
          console.error("Entry already exists Bookmark");
          try {
            const response = await axios.put(
              "http://localhost:5000/update/readingepisode",
              {
                id_user: userId,
                id_novel: id_novel,
                bookmark: databook,
                episode: id,
              }
            );
            console.log("Reading entry created:", response.data);
            if (response.data) {
              Swal.fire("The location is saved");
            }
          } catch (error) {
            if (error.response && error.response.status === 409) {
              console.error("Entry already exists");
              Swal.fire("Entry already exists");
            } else {
              console.error("Error creating reading entry:", error);
            }
          }
        } else {
          console.error("Error creating reading entry:", error);
        }
      }
    } else {
      Swal.fire("Only users");
    }
  };
  if (show404) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Box
          sx={{
            boxShadow: 2,
            width: 250,
            textAlign: "center",
          }}
        >
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
        fontSize: {
          xs: fontSize - 4,
          sm: fontSize,
          md: fontSize + 2,
          lg: fontSize + 4,
        },
        backgroundColor: backgroundColor,
        color: "black",
        fontFamily: fontFamily,
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
      <Typography
        sx={{
          border: "1px solid #ccc",
          minHeight: "auto",
          p: 2,
          maxWidth: "100%",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          backgroundColor: backgroundColor,
          color: "black",
          marginTop: "10px",
          fontSize: {
            xs: fontSize - 4,
            sm: fontSize,
            md: fontSize + 2,
            lg: fontSize + 4,
          },
          fontFamily: fontFamily,
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Box display={"flex"} justifyContent={"space-between"} mt={2}>
        <Button variant="contained" onClick={handlePreviousPage}>
          Previous Chapter
        </Button>
        {userId ? (
          <Button variant="contained" onClick={handleBookmark}>
            Bookmark
          </Button>
        ) : (
          <Typography fullWidth></Typography>
        )}

        <Button variant="contained" onClick={handleDirectory}>
          Directory
        </Button>
        <Button variant="contained" onClick={handleNextPage}>
          Next Chapter
        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseSettings}
      >
        <Box sx={{ p: 2 }}>
          <Typography mb={1}>Font Size</Typography>
          <Slider
            min={14}
            max={35}
            value={fontSize}
            onChange={(e, newValue) => setFontSize(newValue)}
            sx={{ mb: 1 }}
          />
          <Typography>Current Size: {fontSize}px</Typography>

          <Typography mt={2} mb={1}>
            Background Color
          </Typography>
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            onClick={() => setBackgroundColor("white")}
          >
            White
          </Button>
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            onClick={() => setBackgroundColor("lightgray")}
          >
            Light Gray
          </Button>
          <Button
            variant="contained"
            onClick={() => setBackgroundColor("black")}
          >
            Black
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default ViewContent;
