import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";
import axios from "axios"; // ใช้ axios สำหรับเรียก API
import { apinovel } from "../URL_API/Apinovels";

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

export default function SearchType() {
  const { searchType } = useParams();
  const [tag, setTag] = useState([]);
  const [penname, setAuthorname] = useState("");
  const formatDateTime = (datatime) => {
    const date = new Date(datatime);
    return date.toLocaleString(); // Display date and time
  };
  const fetchNovels = async () => {
    try {
      const response = await axios.get(
        `${apinovel}/novelallvieweptype/${searchType}`
      );
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        const filteredData = data.filter((novel) => novel.uploadeN === "Yes");
        setTag(filteredData);
      } else {
        console.log("No user data found");
      }
      setAuthorname(response.data[0].name_type);
    } catch (error) {
      console.error("Error fetching novels:", error);
    }
  };
  useEffect(() => {
    fetchNovels();
  }, []);

  return (
    <>
      <Card sx={{ minWidth: 275, mb: 1 }}>
        <CardContent>
          <Box>
            <Typography>Search Type: {`"${penname}"`}</Typography>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Grid container spacing={2}>
              {tag.map((item, index) => (
                <Grid item xs={12} sm={6} key={item.id}>
                  <Card
                    sx={{
                      backgroundColor: "#f5f5f5",
                      height: { xs: 170, md: 200 },
                    }}
                  >
                    <CardContent sx={{ display: "flex" }}>
                      <Grid item xs={3} md={3}>
                        <Card sx={{ backgroundColor: "black" }}>
                          <Linknovel href={`/novel/${item.id_novel}`}>
                            <CardMedia
                              component="img"
                              sx={{
                                width: { xs: 70, md: "100%" },
                                height: { xs: 100, md: 170 },
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
                      <Grid marginLeft={2} item xs={9} md={9}>
                        <Typography variant="h6" component="div">
                          <Linknovel href={`/novel/${item.id_novel}`}>
                            {index + 1}. {item.name_novel}
                          </Linknovel>
                        </Typography>
                        <Typography
                          mt={2}
                          mb={1}
                          sx={{ display: "flex" }}
                          variant="body2"
                          color="textSecondary"
                        >
                          <Typography
                            paddingRight={1}
                            sx={{ borderRight: "1px solid grey" }}
                          >
                            {item.penname}
                          </Typography>
                          <Typography
                            paddingRight={1}
                            paddingLeft={1}
                            sx={{ borderRight: "1px solid grey" }}
                          >
                            {item.name_type}
                          </Typography>
                          <Typography paddingLeft={1}>
                            {item.statusN}
                          </Typography>
                        </Typography>
                        <CustomButtonB>{item.description}</CustomButtonB>
                        <Box display={"flex"}>
                          <Typography
                            variant="caption"
                            mt={1}
                            sx={{ backgroundColor: "white", paddingRight: 1 }}
                          >
                            Latest Chapter
                          </Typography>
                          <Typography
                            variant="caption"
                            component="p"
                            noWrap
                            mt={1}
                          >
                            {" "}
                            {item.name_episode}
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          component="p"
                          noWrap
                          mt={1}
                        >
                          {" "}
                          {formatDateTime(item.updatetime)}
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
