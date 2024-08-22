import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";
import axios from "axios"; // ใช้ axios สำหรับเรียก API
import { apinovel } from "../../URL_API/Apinovels";

const Linknovel = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "none",
    color: "blue",
  },
  fontWeight: "bold",
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

export default function Bookshelf() {
  const [novels, setNovels] = useState([]);
  const formatDateTime = (datatime) => {
    const date = new Date(datatime);
    return date.toLocaleString(); // Display date and time
  };
  useEffect(() => {
    // เรียก API เมื่อ searchN เปลี่ยนแปลง
    const loggedInUserP = JSON.parse(localStorage.getItem("userP"));
    const id_user = loggedInUserP.id_user;
    const fetchNovels = async () => {
      try {
        const response = await axios.get(
          `${apinovel}/novelbookshelf/${id_user}`
        );
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          const filteredData = data.filter((novel) => novel.uplode === "Yes");

          setNovels(filteredData);
        } else {
          console.log("No user data found");
        }
      } catch (error) {
        console.error("Error fetching novels:", error);
      }
    };

    fetchNovels();
  }, []);

  return (
    <>
      <Card sx={{ minWidth: 275, mb: 1 }}>
        <CardContent>
          <Box>
            <Typography>Bookshelf</Typography>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Grid container spacing={2}>
              {novels.map((item, index) => (
                <Grid item xs={12} sm={6} key={item.id}>
                  <Card
                    sx={{
                      backgroundColor: "#f5f5f5",
                      height: { xs: 170, md: 200, },
                    }}
                  >
                    <CardContent sx={{ display: "flex" }}>
                      <Grid item xs={4} md={4}>
                        <Card sx={{ backgroundColor: "black" }}>
                          <Linknovel href={`/novel/${item.id_novel}`}>
                            <CardMedia
                              component="img"
                              sx={{
                                width: { xs: "100%", md: "100%" },
                                height: { xs: 150, md: 180 },
                                overflow: "hidden",
                              }}
                              image={
                                item.image_novel
                                  ? item.image_novel
                                  : `https://drive.google.com/thumbnail?id=1p_xAKSNXylMpPPKdeB30KWe8BtYjdHJd`
                              }
                              alt="Novel cover"
                            />
                          </Linknovel>
                        </Card>
                      </Grid>
                      <Grid marginLeft={2} item xs={8} md={8}>
                        <Typography variant="h6" component="div">
                          <Linknovel href={`/novel/${item.id_novel}`}>
                            {index + 1}. {item.name_novel}
                          </Linknovel>
                        </Typography>
                        <Typography
                          mt={1}
                          mb={1}
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                          variant="body2"
                          color="textSecondary"
                        >
                          <Typography
                            variant="body2"
                            paddingRight={1}
                            sx={{ borderRight: "1px solid grey" }}
                          >
                            {item.penname}
                          </Typography>
                          <Typography
                            variant="body2"
                            paddingRight={1}
                            paddingLeft={1}
                            sx={{ borderRight: "1px solid grey" }}
                          >
                            {item.name_type}
                          </Typography>
                          <Typography variant="body2" paddingLeft={1}>
                            {item.status}
                          </Typography>
                        </Typography>
                        <CustomButtonB>{item.description}</CustomButtonB>

                        <Typography mt={2} variant="caption" component="p" noWrap>
                          {" "}
                          {formatDateTime(item.latest_createdate)}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
