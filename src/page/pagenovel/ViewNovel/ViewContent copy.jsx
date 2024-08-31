import React, { useEffect, useState } from "react";
import { Box, Button, Slider, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ViewContent = () => {
  const navigate = useNavigate();
  const { novelId, episodeId } = useParams(); // ดึงพารามิเตอร์ novelId และ episodeId จาก URL
  const [content, setContent] = useState("");
  const [dataNameEP, setNameEP] = useState("");
  const [dataIdep, setIdEp] = useState("");
  const [id_novel, setIdnovel] = useState("");
  const [episodes, setEpisodes] = useState([]);

  const [fontSize, setFontSize] = useState(22);
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [fontFamily, setFontFamily] = useState(
    "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@100..900&display=swap');"
  );

  const handleNextPage = () => {
    const currentIndex = episodes.findIndex(ep => ep.id === parseInt(episodeId));
    if (currentIndex >= 0 && currentIndex < episodes.length - 1) {
      navigate(`/novel/${novelId}/${episodes[currentIndex + 1].id}`);
    }
  };

  const handlePreviousPage = () => {
    const currentIndex = episodes.findIndex(ep => ep.id === parseInt(episodeId));
    if (currentIndex > 0) {
      navigate(`/novel/${novelId}/${episodes[currentIndex - 1].id}`);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, [novelId]);

  useEffect(() => {
    handleGetmaxID();
  }, [episodeId]);

  const fetchEpisodes = () => {
    axios
      .get(`http://localhost:5000/view/episodes/${novelId}`)
      .then((response) => {
        setEpisodes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching episodes:", error);
      });
  };

  const handleGetmaxID = () => {
    axios
      .get(`http://localhost:5000/view/ep_novelep/${episodeId}`)
      .then((response) => {
        const data = response.data[0];
        if (data.id_novel === parseInt(novelId)) {
          setIdnovel(data.id_novel);
          setIdEp(data.id);
          setContent(data.content);
          setNameEP(data.name_episode);
        } else {
          navigate("/404");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        navigate("/404");
      });
  };

  return (
    <Box
      sx={{
        "@media (min-width:1200px)": {
          width: "100%",
          fontSize: fontSize,
        },
        "@media (max-width:600px)": {
          width: "100%",
          fontSize: fontSize,
        },
        "@media (min-width:600px) and (max-width:1200px)": {
          width: "100%",
          fontSize: fontSize,
        },
        backgroundColor: backgroundColor,
        color: "black",
        padding: "20px"
      }}
    >
      <Box display={"flex"} justifyContent={"center"}>
        <Typography>Chapter {dataNameEP}</Typography>
      </Box>
      <Box
        sx={{
          border: "1px solid #ccc",
          minHeight: "100px",
          padding: "10px",
          maxWidth: "100%",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          backgroundColor: backgroundColor,
          color: "black",
          marginTop: "10px",
          fontSize: `${fontSize}px`,
        }}
      >
        {content}
      </Box>
      <Box display={"flex"} justifyContent={"space-between"} mt={2}>
        <Button variant="contained" onClick={handlePreviousPage}>
          Previous Chapter
        </Button>
        <Button variant="contained" onClick={handleNextPage}>
          Next Chapter
        </Button>
      </Box>
      <Box mt={2}>
        <Typography>Font Size</Typography>
        <Slider
          min={14}
          max={35}
          value={fontSize}
          onChange={(e, newValue) => setFontSize(newValue)}
        />
      </Box>
      <Box mt={2}>
        <Typography>Background Color</Typography>
        <Button variant="contained" onClick={() => setBackgroundColor("white")}>
          White
        </Button>
        <Button
          variant="contained"
          onClick={() => setBackgroundColor("lightgray")}
        >
          Light Gray
        </Button>
        <Button variant="contained" onClick={() => setBackgroundColor("black")}>
          Black
        </Button>
      </Box>
    </Box>
  );
};

export default ViewContent;
