import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  ButtonBase,
  CardActionArea,
  Container,
  Divider,
  Button,
  Pagination,
} from "@mui/material";
import { styled } from "@mui/system";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";
import Slidernovel from "./Slidernovel";
import { blueGrey } from "@mui/material/colors";
import { useLocation } from "react-router-dom";

const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const CustomLink = styled(ButtonBase)({
  color: "black",
});

const CustomButtonB = styled(Typography)({
  color: "black",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontSize: "14px",
});

const chapter1 = {
  margin: "0 8px",
  whiteSpace: "pre-line",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "45%",
};
const chapter2 = {
  margin: "0 8px",
  whiteSpace: "pre-line",
  width: "30%",
};
const chapter3 = {
  display: "flex",
  margin: "0 8px",
  whiteSpace: "pre-line",
  width: "25%",
};

function Pagenovel() {
  const [dataTag, setTagnovel] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page")) || 1;
  const itemsPerPage = 20;

  useEffect(() => {
    NovelAllGet();
  }, []);

  const NovelAllGet = () => {
    axios
      .get("http://localhost:5000/novelallviewep")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          const filteredData = data.filter((novel) => novel.uploadeN === "Yes");
          setTagnovel(filteredData);
        } else {
          console.log("No user data found");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handlePageChange = (event, value) => {
    window.location.href = `?page=${value}`;
  };

  const displayData = dataTag.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ bgcolor: "white" }}>
      <Container>
        <Slidernovel dataTag={dataTag} />
      </Container>
      <Box p={2} bgcolor={blueGrey[50]} sx={{ width: "85%", marginLeft: "5%" }}>
        <Box backgroundColor={blueGrey[200]}>
          <Button>Novels</Button>
        </Box>
        <Grid container spacing={3} style={{ marginTop: 0 }}>
          {displayData.map((novel, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <StyledCard>
                <CardActionArea href={`/novel/${novel.id_novel}`}>
                  <CardMedia
                    component="img"
                    alt={novel.name_novel}
                    height="150"
                    image={novel.image_novel}
                    title={novel.name_novel}
                  />
                  <Typography sx={{marginLeft:"20px"}} gutterBottom variant="h5" component="div">
                    {novel.name_novel}
                  </Typography>
                  <Divider />
                </CardActionArea>
                <CardContent style={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px", // เพิ่มระยะห่างของข้อมูล
                    }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ width: "50%" }}
                    >
                      <ButtonBase href={`/author/${novel.id_author}`}>
                        {novel.penname}
                      </ButtonBase>
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h7"
                      component="div"
                      style={{ width: "30%" }}
                    >
                      <CustomLink href={`/selecttype/${novel.id_type}`}>
                        {novel.name_type}
                      </CustomLink>
                    </Typography>
                    <Typography
                      sx={{ margin: "0 8px" }}
                      style={{ width: "20%" }}
                    >
                      Status: {novel.statusN}
                    </Typography>
                  </Box>
                  <Divider />
                  <Typography variant="h7">Introduction</Typography>
                  <CustomButtonB>{novel.description}</CustomButtonB>
                </CardContent>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid #ccc", // เพิ่มเส้นแบ่งระหว่างข้อมูล
                    paddingTop: "8px",
                    maxWidth: "100%", // เพิ่มระยะห่างด้านบน
                  }}
                >
                  <Typography sx={chapter1}>
                    Chapter {novel.id_episode_novel}: {novel.name_episode}
                  </Typography>
                  <Typography sx={chapter2}>
                    {`${new Date(novel.updateep).toLocaleDateString()}`}
                  </Typography>
                  <Typography sx={chapter3}>
                    <MenuBookIcon />
                    <Typography color={"red"}>{novel.epall} </Typography>
                    Chapters
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <Pagination
            count={Math.ceil(dataTag.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Pagenovel;
