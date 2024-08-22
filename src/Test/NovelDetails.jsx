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
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
const labels = ["easy", "funny", "Battle of wits", "IQ Online"];
const updates = [
  { title: "Ms. Madam is a gentle woman", date: "2024-07-25" },
  { title: "Candle in the Snow: Full of Rhymes, Look", date: "2024-07-25" },
  {
    title: "Some people seek the Peach Blossom Land, others laugh at Zhishuang",
    date: "2024-07-25",
  },
  {
    title: "Please give me a monthly ticket in the middle of the month! or2",
    date: "2024-07-23",
  },
  { title: "The guest watering the orchid", date: "2024-07-23" },
];

const rankings = [
  "Who asked him to play Yu-Gi-Oh!",
  "The Phantom Thief of Hearts",
  "Evil Dragon: The baby dragon...",
  "Zongman: The Master is not...",
  "Douluo: Dragon Pattern Stick",
  "Don't confiscate my citizens...",
  "Douluo: Reincarnation of the...",
  "Zhutian: Invincible from the...",
  "Pirates' Legend Family",
  "Fights Break Sphere: His con...",
  "Food Wars: Starting in an I...",
  "Douluo Dalu: The Eye of Tr...",
  "Fights Break Sphere: Bind...",
  "I have accomplished nothi...",
  "Start with martial arts and...",
];

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
const NovelDetails = () => {
  const [expanded, setExpanded] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [visibleChapters, setVisibleChapters] = useState(5); // Number of visible chapters

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  const id_novel = 6;
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
    window.location.href = `/selecttag/${id_taek}`;
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
        "http://localhost:5000/create/reading",
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
          "http://localhost:5000/update/reading",
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
      .get(`http://localhost:5000/novelall2/${id_novel}`)
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
      .get(`http://localhost:5000/view/ep_novel/${id_novel}`)
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
      .get(`http://localhost:5000/view/togetherjoin/${id_novel}`)
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
  };

  const handleLoadMoreChapters = () => {
    window.location.href = `/novel/${id_novel}/directory`;
  };

  return (
    <Container>
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid xs={12} md={8}>
            <Grid item xs={12} md={12}>
              <Card>
                <CardContent>
                  <Box mb={2}>
                    <Breadcrumbs aria-label="breadcrumb">
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
                  </Box>
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
                        <Linknovel href={`/author/${idauthoe}`}>
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
                            borderRight: "2px solid black",
                            paddingRight: 1,
                          }}
                        >
                          Category:
                          <Linknovel href={`/selecttype/${idtype}`}>
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
              <Box sx={{ mb: 2, mt: 4 }}>
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
              <Box mt={4}>
                <Card>
                  <CardContent>
                    <Typography
                      borderBottom={"2px solid blue"}
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
                            {index < updates.length - 1 && <Divider />}
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
                  borderBottom={"2px solid blue"}
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

export default NovelDetails;
