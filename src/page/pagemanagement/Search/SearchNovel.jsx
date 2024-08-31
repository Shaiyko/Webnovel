import {
  Box,
  ButtonBase,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios"; // ใช้ axios สำหรับเรียก API

const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
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
const CustomLink = styled(ButtonBase)({
  color: "black",
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

export default function SearchNovel() {
  const { searchN } = useParams();
  const [novels, setNovels] = useState([]);

  useEffect(() => {
    // เรียก API เมื่อ searchN เปลี่ยนแปลง
    const fetchNovels = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/novelallvieweps`,
          {
            params: { name_novel: searchN },
          }
        );
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          const filteredData = data.filter((novel) => novel.uploadeN === "Yes");

          setNovels(filteredData);
        } else {
          console.log("No user data found");
        }
      } catch (error) {
        console.error("Error fetching novels:", error);
      }
    };

    fetchNovels();
  }, [searchN]);

  return (
    <>
      <Card sx={{ minWidth: 275, mb: 1 }}>
        <CardContent>
          <Box>
            <Typography>Search Novel: {`"${searchN}"`}</Typography>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Grid container spacing={3} style={{ marginTop: "10px" }}>
              {novels &&
                novels.map((novel, index) => (
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
                      </CardActionArea>
                      <CardContent style={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="div">
                          <CustomLink href={`/novel/${novel.id_novel}`}>
                            {novel.name_novel}
                          </CustomLink>
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "8px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            style={{ width: "50%" }}
                          >
                            <ButtonBase
                              target="_blank"
                              href={`/author/${novel.id_author}`}
                            >
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
                          <Typography sx={{ margin: "0 8px" }}>
                            Status: {novel.statusN}
                          </Typography>
                        </Box>
                        <Divider />
                        <Typography variant="h7">Introduction :</Typography>
                        <CustomButtonB>{novel.description}</CustomButtonB>
                      </CardContent>
                      <CardContent
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          borderTop: "1px solid #ccc",
                          paddingTop: "8px",
                          maxWidth: "100%",
                        }}
                      >
                        <Typography sx={chapter1}>
                          Chapter: {novel.epall} chapters
                        </Typography>
                        <Typography sx={chapter2}>
                          Update time:{" "}
                          {new Date(novel.updatetime).toLocaleDateString()}
                        </Typography>
                        <Typography sx={chapter3}>
                          <MenuBookIcon />
                          {novel.epall} Chapters
                        </Typography>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
