import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Stack, styled } from "@mui/system";
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

export default function SearchTag() {
  const { searchTag } = useParams();
  const [tag, setTag] = useState([]);
  const [penname, setAuthorname] = useState("");
  const formatDateTime = (datatime) => {
    const date = new Date(datatime);
    return date.toLocaleString(); // Display date and time
  };
  //
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page")) || 1;
  const itemsPerPage = 20;
  const [loading, setLoading] = useState(false);
  const handlePageChange = (event, value) => {
    window.location.href = `?page=${value}`;
  };

  const displayData = tag.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  //
  const fetchNovels = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${apinovel}/novelallvieweptag/${searchTag}`
      );
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        const filteredData = data.filter((novel) => novel.uploadeN === "Yes");
        setTag(filteredData);
        setLoading(false)
      } else {
        console.log("No user data found");
        setLoading(false)
      }
      setAuthorname(response.data[0].name_taek);
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
            <Typography>Search Tag: {`"${penname}"`}</Typography>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Grid container spacing={2}>
            {loading
              ? Array.from(new Array(itemsPerPage)).map((_, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      sx={{
                        backgroundColor: "#f5f5f5",
                        height: { xs: 170, md: 200 },
                      }}
                    >
                      <CardContent sx={{ display: "flex" }}>
                        <Grid item xs={3} md={3}>
                          <Skeleton variant="rectangular" height={140} />
                        </Grid>
                        <Grid marginLeft={2} item xs={9} md={9}>
                          <Stack spacing={1}>
                            <Skeleton variant="rectangular" height={10} />
                            <Skeleton variant="rectangular" height={100} />
                            <Skeleton variant="rectangular" />
                          </Stack>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : displayData.map((item, index) => (
                  <Grid item xs={12} sm={6} key={item.id}>
                    <Card
                      sx={{
                        backgroundColor: "#f5f5f5",
                        height: { xs: 170, md: 200 },
                      }}
                    >
                      <CardContent sx={{ display: "flex" }}>
                        <Grid item xs={4} md={3}>
                          <Card sx={{ backgroundColor: "black" }}>
                            <Linknovel target="_blank" href={`/novel/${item.id_novel}`}>
                              <CardMedia
                                component="img"
                                sx={{
                                  width: { xs: "100%", md: "100%" },
                                  height: { xs: 130, md: 170 },
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
                          <Box sx={{display:{md:"none"}}}>
                            <Typography variant="caption" component="p" noWrap>
                              {" "}
                              Update {formatDateTime(item.updateep)} 
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid marginLeft={2} item xs={8} md={9}>
                          <Typography variant="h6" component="div">
                            <Linknovel target="_blank" href={`/novel/${item.id_novel}`}>
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
                              {item.statusN}
                            </Typography>
                          </Typography>
                          <CustomButtonB>{item.description}</CustomButtonB>
                          <Box display="flex" alignItems="center">
                            <Typography
                              variant="caption"
                              mt={1}
                              sx={{
                                backgroundColor: "white",
                                paddingRight: 1,
                                whiteSpace: "nowrap", // Prevent wrapping
                                flexShrink: 0, // Prevent shrinking
                              }}
                            >
                              Latest Chapter :
                            </Typography>
                            <Typography
                              variant="caption"
                              component="p"
                              noWrap
                              mt={1}
                              sx={{
                                whiteSpace: "nowrap", // Prevent wrapping
                                overflow: "hidden", // Hide overflow text if necessary
                                textOverflow: "ellipsis", // Add ellipsis if text is too long
                              }}
                            >
                              {item.name_episode}
                            </Typography>
                          </Box>
                          <Box sx={{display:{xs:"none",md:"block"}}} mt={2}>
                            <Typography variant="caption" component="p" noWrap>
                              {" "}
                              Latest Update {formatDateTime(item.updateep)}
                            </Typography>
                          </Box>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
          </Grid>
          </Box>
          {tag.length >= 20 && (<Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
              mb: 2,
            }}
          >
            <Pagination
              count={Math.ceil(tag.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Box>)}
        </CardContent>
      </Card>
    </>
  );
}
