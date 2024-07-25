import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CssBaseline,
  IconButton,
  CardActionArea,
  CardMedia,
  Divider,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import { styled } from "@mui/system";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { blueGrey } from '@mui/material/colors';

const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const theme = createTheme();

function Slidernovel() {
  const [novels, setNovels] = useState([]);
  const [index, setIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2.5); // Initial value for medium screens
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const itemWidth = 300; // Set the width of each item in pixels
  const containerRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/novelallviewepslider")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          const filteredData = data.filter((novel) => novel.uploadeN === "Yes");
          setNovels(filteredData);
        } else {
          console.log("No user data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching novels:", error);
      });
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setItemsPerPage(0.8);
      } else if (width < 1200) {
        setItemsPerPage(2.5);
      } else {
        setItemsPerPage(3.5);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  const maxIndex = Math.max(0, novels.length - itemsPerPage);

  const handleNext = () => {
    setIndex((prevIndex) => {
      const newIndex = Math.min(prevIndex + 1, maxIndex);
      return newIndex;
    });
  };

  const handlePrevious = () => {
    setIndex((prevIndex) => {
      const newIndex = Math.max(prevIndex - 1, 0);
      return newIndex;
    });
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX - touchEndX;
    if (Math.abs(deltaX) > 50) {
      // Adjust sensitivity as needed
      if (deltaX > 0 && index < maxIndex) {
        handleNext();
      } else if (deltaX < 0 && index > 0) {
        handlePrevious();
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box bgcolor={blueGrey[50]} sx={{ padding: "10px", position: "relative",mb:1 }}>
        <Typography backgroundColor={blueGrey[200] } variant="h4" gutterBottom>
          Novel New
        </Typography>
        <Box
          ref={containerRef}
          sx={{
            display: "flex",
            overflow: "hidden",
            width: "100%",
            position: "relative",
            touchAction: "none", // Disable default touch actions for better control
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              transition: "transform 0.5s ease-out",
              transform: `translateX(-${index * itemWidth}px)`,
              width: `${novels.length * itemWidth}px`,
            }}
          >
            {novels.map((novel) => (
              <Card
                key={novel.id_novel}
                sx={{
                  width: `${itemWidth}px`,
                  margin: "0 10px",
                  flexShrink: 0,
                }}
              >
                <CardContent>
                  <StyledCard>
                    <CardActionArea href={`/novel/${novel.id_novel}`}>
                      <CardMedia
                        component="img"
                        alt={novel.name_novel}
                        height="150"
                        image={novel.image_novel}
                        title={novel.name_novel}
                      />
                      <Typography variant="h5" component="div">
                        {novel.name_novel}
                      </Typography>
                    </CardActionArea>
                    <Divider />
                    <Box
                      sx={{ display: "flex", justifyContent: "space-around" }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {novel.penname}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        |
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {novel.name_type}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box
                      sx={{ display: "flex", justifyContent: "space-around" }}
                    >
                      <Typography p={1} variant="body2" color="text.secondary">
                        {`${new Date(
                          novel.updateep
                        ).toLocaleDateString()}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        |
                      </Typography>
                      <Typography
                        sx={{ display: "flex" }}
                        variant="body2"
                        color="text.secondary"
                      >
                        <MenuBookIcon />
                        <Typography variant="body2" color={"red"}>
                          {novel.epall}{" "}
                        </Typography>
                        Chapters
                      </Typography>
                    </Box>
                  </StyledCard>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
        <IconButton
          onClick={handlePrevious}
          sx={{
            position: "absolute",
            top: "50%",
            left: "-20px",
            zIndex: 1000,
            transform: "translateY(-50%)",
            visibility: index === 0 ? "hidden" : "visible", // Hide if at the start
          }}
        >
          <ArrowBackIosNewIcon
            sx={{ color: "white", backgroundColor: "gray" }}
          />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: "-20px",
            zIndex: 1000,
            transform: "translateY(-50%)",
            visibility: index === maxIndex ? "hidden" : "visible", // Hide if at the end
          }}
        >
          <ArrowForwardIosIcon
            sx={{ color: "white", backgroundColor: "gray" }}
          />
        </IconButton>
      </Box>
    </ThemeProvider>
  );
}

export default Slidernovel;
