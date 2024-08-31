import React, { useEffect, useRef, useState } from "react";

import { Box, Button, Slider, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ViewContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [dataNameEP, setNameEP] = useState("");
  const [dataIdep, setIdEp] = useState("");
  const [id_novel, setIdnovel] = useState("");

  const [fontSize, setFontSize] = useState(16);
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [fontFamily, setFontFamily] = useState(
    "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@100..900&display=swap');"
  );

  const handleNextPage = () => {
    navigate(`/novel/${id_novel}/${parseInt(dataIdep) + 1}`);
  };

  const handlePreviousPage = () => {
    if (parseInt(dataIdep) > 1) {
      navigate(`/novel/${id}/${parseInt(dataIdep) - 1}`);
    }
  };
  useEffect(() => {
    handleGetmaxID();
  }, []);


  const handleGetmaxID = () => {
    axios
      .get(`http://localhost:5000/view/ep_novelep/${id}`)
      .then((response) => {
        const data = response.data[0];
        setIdnovel(data.id_novel);
        setIdEp(data.id);
        setContent(data.content);
        setNameEP(data.name_episode);
        console.log("N", data.name_episode);
      })
      .catch((error) => {
        console.error("Error:", error);
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
      }}
    >
      <Box display={"flex"} justifyContent={"center"}>
        <Typography>Chapter {dataNameEP}</Typography>
      </Box>
      <Typography   sx={{
          border: "1px solid #ccc",
          minHeight: "100px",
          padding: "10px",
          maxWidth: "100%",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          backgroundColor: backgroundColor,
          color: "black",
          marginTop: "10px",
          fontSize: fontSize,
          fontFamily: fontFamily,
        }}>{content}</Typography>
      <Box><Box display={"flex"} justifyContent={"space-between"} mt={2}>
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
      </Box></Box>
    </Box>
  );
};

export default ViewContent;
