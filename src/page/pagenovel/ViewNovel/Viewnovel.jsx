import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardMedia,
  Grid,
  CardContent,
  Link,
  Breadcrumbs,
  Tab,
  Tabs,
  ListItemButton,
  Container,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { apinovel } from "../../../URL_API/Apinovels";
const Linknovel = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "none",
    color: "blue",
  },
});

const Description = styled(Typography)({
  color: "black",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontSize: "14px",
  cursor: "pointer",
});

const ExpandedDescription = styled(Box)({
  color: "black",
  maxWidth: "100%",
  fontSize: "14px",
  cursor: "pointer",
  maxHeight: "200px",
  overflowY: "auto",
});
const ViewNovels = () => {
  const [expanded, setExpanded] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [visibleChapters, setVisibleChapters] = useState(5); // Number of visible chapters

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  const {id_novel} = useParams();
  const [dataname, setNameN] = useState("");
  const [dataauthor, setAuthor] = useState("");
  const [dataType, setType] = useState("");
  const [dataimage, setImage] = useState("");
  const [datastatus, setStatus] = useState("");
  const [datadision, setDision] = useState("");
  const [idtype, setIDType] = useState("");
  const [idauthoe, setIDauthor] = useState("");
  const [dataselectTag, setSelectedTypes] = useState([]);
  const [datatime, setupdatetime] = useState("");
  const [rankingk, setNovels] = useState([]);
  const formatDateTime = (datatime) => {
    const date = new Date(datatime);
    return date.toLocaleString(); // Display date and time
  };

  const formatDateTimeEP = (datatimeEP) => {
    const date = new Date(datatimeEP);
    return date.toLocaleString(); // Display date and time
  };

  const handleClickIdTag = (id_taek) => {
    const url = `/selecttag/${id_taek}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    UserGet();
    UserGetChapter();
    handleGetUpdate2();
    handleGetRanking();
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser && loggedInUser.status === "user") {
      const loggedInUserP = JSON.parse(localStorage.getItem("userP"));
      setUserId(loggedInUserP.id_user);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      createReading();
    }
  }, [userId, id_novel]);

  const createReading = async () => {
    try {
      const response = await axios.post(
        `${apinovel}/create/reading`,
        {
          id_user: userId,
          id_novel: id_novel,
          score: 1,
        }
      );
      console.log("Reading entry created:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error("Entry already exists");
      } else {
        console.error("Error creating reading entry:", error);
      }
    }
  };
  const handleLoadBookshelf = async () => {
    if (userId) {
      try {
        const response = await axios.put(
          `${apinovel}/update/reading`,
          {
            id_user: userId,
            id_novel: id_novel,
            bookmark: dataname,
          }
        );
        console.log("Reading entry created:", response.data);
      } catch (error) {
        if (error.response && error.response.status === 409) {
          console.error("Entry already exists");
          Swal.fire("Entry already exists");
        } else {
          console.error("Error creating reading entry:", error);
        }
      }
    } else {
      Swal.fire("Only users");
    }
  };
  const UserGet = () => {
    axios
      .get(`${apinovel}/novelall2/${id_novel}`)
      .then((response) => {
        const data2 = response.data[0];
        setNameN(data2.name_novel);
        setAuthor(data2.penname);
        setStatus(data2.status);
        setType(data2.name_type);
        setImage(data2.image_novel);
        setDision(data2.description);
        setupdatetime(data2.updatetime);
        setIDauthor(data2.id_author);
        setIDType(data2.id_type);
      })
      .catch((error) => console.log("error", error));
  };

  const UserGetChapter = () => {
    axios
      .get(`${apinovel}/view/ep_novel/${id_novel}`)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setChapters(data.slice(0, visibleChapters));
        } else {
          console.log("No chapter data found");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleGetUpdate2 = () => {
    axios
      .get(`${apinovel}/view/togetherjoin/${id_novel}`)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setSelectedTypes(data);
        } else {
          console.log("No user data found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleGetRanking = () => {
    axios
      .get(`${apinovel}/novelallviewepslider`)
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
  };

  const handleLoadMoreChapters = () => {
    window.location.href = `/novel/${id_novel}/directory`;
  };

  return (
    <Container>
      <Box mt={4}>
        <Grid container spacing={1}>
          <Grid xs={12} md={8}>
            <Grid item xs={12} md={12}>
              <Card>
                <CardContent>
                <Grid   container spacing={2} mb={1} mt={1}>
                  <Grid xs={11} md={11} mb={1}>
                    <Breadcrumbs sx={{paddingLeft:1}} aria-label="breadcrumb">
                      <Link underline="hover" color="primary" href="/">
                        Home
                      </Link>
                      <Link
                        underline="hover"
                        color="primary"
                        href={`/novel-category/${idtype}`}
                      >
                        {dataType}
                      </Link>
                      <Link
                        underline="hover"
                        color="primary"
                        href={`/novel/${id_novel}`}
                        aria-current="page"
                      >
                        {dataname}
                      </Link>
                   
                    </Breadcrumbs>
                    <Divider />
                    </Grid>
                    <Grid  xs={1} md={1}>
                    <Tooltip title="Report">
                    <IconButton href={`/suggestionreport/${id_novel}`} color="error" sx={{paddingLeft:2}} ><ReportProblemIcon /></IconButton></Tooltip>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={4} md={3}>
                      <CardMedia
                        component="img"
                        sx={{
                          width: "100%",
                          height: { xs: 170, md: 250 },
                          overflow: "hidden",
                          boxShadow: 5,
                          border: 1,
                        }}
                        image={
                          dataimage
                            ? dataimage
                            : `https://drive.google.com/thumbnail?id=1p_xAKSNXylMpPPKdeB30KWe8BtYjdHJd`
                        }
                        alt="Novel cover"
                      />
                    </Grid>
                    <Grid item xs={8} md={9}>
                      <Typography color={"primary"} variant="h5" gutterBottom>
                        {dataname} 
                      </Typography>
                      <Typography
                        mt={3}
                      >
                        Author:
                        <Linknovel target="_blank" href={`/author/${idauthoe}`}>
                          {dataauthor}
                        </Linknovel>
                      </Typography>
                      <Typography
                        sx={{ display: "flex" }}
                        mb={2}
                        mt={2}
                        variant="subtitle1"
                        gutterBottom
                      >
                        <Typography
                          sx={{
                            borderRight: "1px solid grey",
                            paddingRight: 1,
                          }}
                        >
                          Category:
                          <Linknovel target="_blank" href={`/novel-category/${idtype}`}>
                            {dataType}
                          </Linknovel>
                        </Typography>
                        <Typography sx={{ paddingLeft: 1 }}>
                          {datastatus}
                        </Typography>
                      </Typography>

                      <Typography mt={1} mb={1}>
                        Update Time: {formatDateTime(datatime)}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      justifyContent={"space-around"}
                      mb={2}
                    >
                      <Box display="flex" alignItems="center">
                        <Button
                          onClick={handleLoadMoreChapters}
                          variant="contained"
                          color="primary"
                        >
                          Start reading
                        </Button>
                        <Button
                          onClick={handleLoadBookshelf}
                          variant="contained"
                          color="primary"
                          style={{ marginLeft: 8 }}
                        >
                          Add to bookshelf
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box sx={{ mb: 1, mt: 1 }}>
                <Card>
                  <Box sx={{ p: 2 }}>
                    <Typography
                      borderBottom={"1px solid blue"}
                      color={"primary"}
                      variant="h6"
                      fontWeight="bold"
                    >
                      Tag
                    </Typography>
                    <Divider />
                    <Tabs
                      centered
                      variant="scrollable"
                      scrollButtons="auto"
                      sx={{ mt: 1 }}
                    >
                      {dataselectTag.map((category, index) => (
                        <Chip
                          color="primary"
                          variant="outlined"
                          key={index}
                          label={category.name_taek}
                          onClick={() => handleClickIdTag(category.id_taek)}
                        />
                      ))}
                    </Tabs>
                  </Box>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card>
                <Box sx={{ p: 2 }}>
                  <Typography
                    borderBottom={"1px solid blue"}
                    color={"primary"}
                    variant="h6"
                    fontWeight="bold"
                  >
                    Description
                  </Typography>
                  <Divider />
                  {expanded ? (
                    <ExpandedDescription onClick={handleToggle}>
                      {datadision}
                    </ExpandedDescription>
                  ) : (
                    <Description onClick={handleToggle}>
                      {datadision}
                    </Description>
                  )}
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box mt={1}>
                <Card>
                  <CardContent>
                    <Typography
                      borderBottom={"1px solid blue"}
                      color={"primary"}
                      variant="h6"
                      gutterBottom
                    >
                      Recently Updated
                    </Typography>
                    <List>
                      {chapters.map((update, index) => (
                        <React.Fragment key={index}>
                          <ListItemButton
                            sx={{ borderBottom: "1px solid #616161" }}
                            href={`/novel/${id_novel}/${update.id}`}
                          >
                            <ListItem>
                              <ListItemText
                                primary={`Chapter ${update.name_episode}`}
                                secondary={formatDateTimeEP(update.updatetime)}
                              />
                            </ListItem>
                            {index < chapters.length - 1 && <Divider />}
                          </ListItemButton>
                        </React.Fragment>
                      ))}
                    </List>
                    <Box
                      sx={{ p: 2, display: "flex", justifyContent: "center" }}
                    >
                      <Button
                        variant="contained"
                        onClick={handleLoadMoreChapters}
                        sx={{ backgroundColor: "blue" }}
                      >
                        Complete catalogue
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography
                  borderBottom={"1px solid blue"}
                  color={"primary"}
                  variant="h6"
                  gutterBottom
                >
                  Ranking in Popularity
                </Typography>

                <List>
                  {rankingk.map((ranking, index) => (
                    <React.Fragment key={index}>
                      <ListItemButton
                        sx={{ borderBottom: "1px solid #616161" }}
                        href={`/novel/${id_novel}`}
                      >
                        <ListItem>
                          <ListItemText
                            primary={`${index + 1}. ${ranking.name_novel}`}
                          />
                          Popularity {ranking.scorereding}
                        </ListItem>
                        {index < rankingk.length - 1 && <Divider />}
                      </ListItemButton>
                    </React.Fragment>
                  ))}
                  <Divider />
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ViewNovels;
