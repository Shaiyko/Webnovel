import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Tabs,
  Tab,
  Box,
  Container,
  Pagination,
  Link,
  Grid,
  Divider,
  Skeleton,
} from "@mui/material";
import { Stack, styled } from "@mui/system";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import LoadingComponent from "../../Loading";
import { apinovel } from "../../URL_API/Apinovels";

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
const Linknovel = styled(Link)({
  textDecoration: "none",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "inherit",
  "&:hover": {
    textDecoration: "none",
    color: "blue",
  },
  fontWeight: "bold",
});
function Category() {
  const location = useLocation();
  const [show404, setShow404] = useState(false);
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page")) || 1;
  const itemsPerPage = 20;
  const { id } = useParams(); // Get the category ID from the URL
  const [dataTag, setTagnovel] = useState([]);
  const [dataType, setType2] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [hasNovels, setHasNovels] = useState(true);
  const [nametype, setTypename] = useState("");
  const formatDateTime = (datatime) => {
    const date = new Date(datatime);
    return date.toLocaleString(); // Display date and time
  };
  useEffect(() => {
    // Fetch category types on component mount
    handleGetType();
  }, []);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    const selectedCategory = dataType[newValue];
    // Update URL with the selected category ID
    window.location.href = `/novel-category/${selectedCategory.id}`;
  };

  useEffect(() => {
    // Extract category ID from URL and set the selected tab accordingly
    const categoryId = parseInt(location.pathname.split("/").pop());
    if (!isNaN(categoryId)) {
      setSelectedTab(dataType.findIndex((cat) => cat.id === categoryId));
    } else {
      setSelectedTab(0);
    }
  }, [location.pathname, dataType]);

  useEffect(() => {
    // Fetch novels when the selected tab or dataType changes
    if (dataType[selectedTab]) {
      NovelAllGet(dataType[selectedTab].id);
    }
  }, [selectedTab, dataType]);

  const handleGetType = () => {
    setShow404(true);
    axios
      .get(`${apinovel}/typenovel`)
      .then((response) => {
        const newData = response.data.map((item) => ({
          id: item.id_type,
          label: item.name_type,
        }));

        setType2(newData);
        setShow404(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const NovelAllGet = (categoryId) => {
    let url = `${apinovel}/novelallviewep`;
    if (categoryId !== 0) {
      url = `${apinovel}/novelallvieweptype/${categoryId}`;
    }

    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        const data2 = response.data[0];
        if (Array.isArray(data) && data.length > 0) {
          const filteredData = data.filter((novel) => novel.uploadeN === "Yes");
          setHasNovels(true);
          setTagnovel(filteredData);
        } else {
          setTagnovel([]);
          setHasNovels(false);
        }
        setTypename(data2.name_type);
      })
      .catch((error) => {
        console.log("error", error);
        setTagnovel([]);
        setHasNovels(false);
      });
  };
  const handlePageChange = (event, value) => {
    window.location.href = `?page=${value}`;
  };

  const displayData = dataTag.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box>
      <Container>
        <Card>
          <Grid mt={3} xs={12} md={12}>
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
                  boxShadow: 3,
                  border: "1px solid lightBlue",
                  backgroundColor: "#e0f7fa",
                }}
              >
                {dataType.map((category, index) => (
                  <Tab key={category.id} label={category.label} />
                ))}
              </Tabs>
            </Container>
          </Grid>
          {id == 0 ? (
            <Typography
              mt={2}
              paddingLeft={2}
              color={"primary"}
              variant="h6"
              fontWeight="bold"
            >{`Novel category "All category" `}</Typography>
          ) : (
            <Typography
              mt={2}
              paddingLeft={2}
              color={"primary"}
              variant="h6"
              fontWeight="bold"
            >{`Novel category "${nametype}" `}</Typography>
          )}

          <Divider />
          <Grid xs={12} md={12}>
            {!hasNovels ? (
              <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                Not Novel
              </Typography>
            ) : (
              <Card sx={{ p: 2 }}>
                <Grid container spacing={2}>
            {show404
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
              </Card>
            )}
          </Grid>
          <Card>
          {dataTag.length >= 20 && (<Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
              mb: 2,
            }}
          >
            <Pagination
              count={Math.ceil(dataTag.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Box>)}
          </Card>
        </Card>
      </Container>
    </Box>
  );
}

export default Category;
