import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Directory from "./Directory";
import Swal from "sweetalert2";

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

export default function ViewNovels() {
  const [expanded, setExpanded] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [visibleChapters, setVisibleChapters] = useState(5); // Number of visible chapters

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  const { id_novel } = useParams();
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

  const handleIdType = (id_type) => {
    window.location.href = `/selecttype/${id_type}`;
  };

  const handleIDAuthor = (id_author) => {
    window.location.href = `/author/${id_author}`;
  };
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    UserGet();
    UserGetChapter();
    handleGetUpdate2();
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
      const response = await axios.post("http://localhost:5000/create/reading", {
        id_user: userId,
        id_novel: id_novel,
        score: 1
      });
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
    if(userId){
      
      try {
        const response = await axios.put("http://localhost:5000/update/reading", {
          id_user: userId,
          id_novel: id_novel,
          bookmark: dataname
        });
        console.log("Reading entry created:", response.data);
      } catch (error) {
        if (error.response && error.response.status === 409) {
          console.error("Entry already exists");
          Swal.fire("Entry already exists");
        } else {
          console.error("Error creating reading entry:", error);
        }
      }
    }else{
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

  const handleLoadMoreChapters = () => {
    window.location.href = `/novel/${id_novel}/directory`
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "100%",
        p: 2,
        "@media (max-width: 600px)": {
          p: 0,
        },
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Card>
          <Grid mb={1} container spacing={2}>
            <Grid display={"flex"} justifyContent={"center"} item xs={4} md={4}>
              <CardMedia
                component="img"
                sx={{
                  height: {
                    xs: 200, // height for extra small devices
                    sm: 300, // height for small devices and up
                    md: 400, // height for medium devices and up
                  },
                  width: {
                    xs: 150, // height for extra small devices
                    sm: 200, // height for small devices and up
                    md: 250, // height for medium devices and up
                  },
                  objectFit: "cover",
                }}
                image={
                  dataimage
                    ? dataimage
                    : `https://drive.google.com/thumbnail?id=1p_xAKSNXylMpPPKdeB30KWe8BtYjdHJd`
                }
                alt="Novel Image"
              />
            </Grid>
            <Grid item xs={8} md={8}>
              <Box sx={{ p: 2, marginTop: -2 }}>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography variant="h6" fontWeight="bold">
                    {dataname}
                  </Typography>
                  <IconButton
                    href={`/suggestionreport/${id_novel}`}
                    color="error"
                  >
                    <WarningAmberIcon />
                  </IconButton>
                </Box>
                <Typography color="text.secondary" mt={1}>
                  Author:{" "}
                  <Button onClick={() => handleIDAuthor(idauthoe)}>
                    {dataauthor}
                  </Button>
                </Typography>
                <Typography color="text.secondary" mt={1}>
                  Type Novel:{" "}
                  <Button onClick={() => handleIdType(idtype)}>
                    {dataType}
                  </Button>
                </Typography>
                <Typography mt={1}>Status: {datastatus}</Typography>
                <Typography mt={1} mb={1}>
                  Update Time: {formatDateTime(datatime)}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <Box>
                    <Button
                    onClick={handleLoadMoreChapters}
                      sx={{ backgroundColor: "blue" }}
                      variant="contained"
                    >
                      Read
                    </Button>
                  </Box>
                  <Box>
                    <Button
                     onClick={handleLoadBookshelf}
                      sx={{ backgroundColor: "blue" }}
                      variant="contained"
                    >
                      Add to Bookshelf
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Card>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold">
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
                <Tab
                  key={index}
                  label={category.name_taek}
                  onClick={() => handleClickIdTag(category.id_taek)}
                />
              ))}
            </Tabs>
          </Box>
        </Card>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Card>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold">
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
      </Box>
      <Box sx={{ mb: 2 }}>
        <Card>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Chapter
            </Typography>
            <Divider />
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {chapters.map((row, index) => (
                    <TableRow key={index}>
                      <Button
                        href={`/novel/${id_novel}/${row.id}`}
                        sx={{
                          width: "100%",
                          textTransform: "initial",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <TableCell>
                          Chapter {row.id_episode_novel} : {row.name_episode}
                        </TableCell>
                        <TableCell align="right">
                          {formatDateTimeEP(row.updatetime)}
                        </TableCell>
                      </Button>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={handleLoadMoreChapters}
                sx={{ backgroundColor: "blue" }}
              >
                Load More Chapters
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
