import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Tabs,
  Tab,
  Box,
  ButtonBase,
  CardActionArea,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";


const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const CustomLink = styled(ButtonBase)({
  color: "black",
});
const CustomButtonB = styled(ButtonBase)({
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
  width: "50%",
};
const chapter2 = {
  margin: "0 8px",
  whiteSpace: "pre-line",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "25%",
};
const chapter3 = {
  margin: "0 8px",
  whiteSpace: "pre-line",
  width: "25%",
};
const categories = [
  "ทุกหมวดหมู่",
  "นิยายโรแมนติก",
  "เวทมนตร์แฟนตาซี",
  "เวทมนตร์แฟนตาซี",
  "เวทมนตร์แฟนตาซี",
  "เวทมนตร์แฟนตาซี",
];

function Pagenovel() {
  const [dataTag, setTagnovel] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const onck = () => {};
  useEffect(() => {
    NovelAllGet();
  }, []);

  const NovelAllGet = () => {
    axios
      .get("http://localhost:5000/novelallview")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setTagnovel(data);
         
        } else {
          console.log("No user data found");
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <Box sx={{ bgcolor: "white"}}>
      <Container>

        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {categories.map((category, index) => (
            <Tab key={index} label={category} onClick={onck} />
          ))}
        </Tabs>
      </Container>
      <Box sx={{ p: 2, width: "85%", marginLeft: "5%" }}>
        <Grid container spacing={3} style={{ marginTop: "10px" }}>
          {dataTag.map((novel, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <StyledCard>
                <CardActionArea href="/novel">
                  <CardMedia
                    component="img"
                    alt={novel.name_novel}
                    height="150"
                    image={novel.image_novel}
                    title={novel.name_novel}
                  />
                </CardActionArea>
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    <CustomLink href="/novel">{novel.name_novel}</CustomLink>
                  </Typography>
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
                        <ButtonBase href={`/author/${novel.penname}`}>{novel.penname}</ButtonBase>
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h7"
                      component="div"
                      style={{ width: "30%" }}
                    >
                      <CustomLink href="/novel-category">
                        {novel.title}
                      </CustomLink>
                    </Typography>
                    <Typography
                      sx={{ margin: "0 8px" }}
                      style={{ width: "20%" }}
                    >
                      Status: {novel.status}
                    </Typography>
                  </Box>

                  <Typography variant="h7">Introduction</Typography>
                  <CustomButtonB href="/Content">
                    {novel.description}
                  </CustomButtonB>
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
                    <ButtonBase href="/Content">
                      Chapter: 1500 chapter
                    </ButtonBase>
                  </Typography>
                  <Typography sx={chapter2}>Update time: 12/2/2020</Typography>
                  <Typography sx={chapter3}>
                    <MenuBookIcon />
                    1000 Chapters
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Pagenovel;
