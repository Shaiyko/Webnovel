// eslint-disable-next-line no-unused-vars
import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItemText,
  Divider,
  Box,
  ListItemButton,
  Grid,
  Card,
  Link,
  Breadcrumbs,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apinovel } from "../../URL_API/Apinovels";

const Directory = () => {
  const { id_novel } = useParams();
  const [dataname, setNameN] = useState("");
  const [dataselectchapter, setSelectedChapter] = useState([]);
  const [datanameep, setNameEP] = useState("");
  const [dataep, setEp] = useState(""); // Use consistent naming conventions
  const [userId, setUserId] = useState(null);
  const [dataType, setType] = useState("");
  const [idtype, setIDType] = useState("");
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser && loggedInUser.status === "user") {
      const loggedInUserP = JSON.parse(localStorage.getItem("userP"));
      setUserId(loggedInUserP.id_user);
    }
  }, []);

  useEffect(() => {
    UserGet();
    UserGetChapter();
    if (userId) {
      Bookmark();
    }
  }, [userId]);

  const Bookmark = async () => {
    try {
      const response = await axios.get(
        `${apinovel}/readings?id_user=${userId}&id_novel=${id_novel}`
      );
      const data = response.data[0];
      setEp(data.episode);

      if (data.episode) {
        const episodeResponse = await axios.get(
          `${apinovel}/view/ep_novelep/${data.episode}`
        );
        const episodeData = episodeResponse.data[0];
        setNameEP(episodeData.name_episode);
      }
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
  };

  const UserGet = async () => {
    try {
      const response = await axios.get(`${apinovel}/novelall2/${id_novel}`);
      const data2 = response.data[0];
      setNameN(data2.name_novel);
      setType(data2.name_type);
      setIDType(data2.id_type);
    } catch (error) {
      console.log("Error fetching novel data:", error);
    }
  };

  const UserGetChapter = async () => {
    try {
      const response = await axios.get(`${apinovel}/view/ep_novel/${id_novel}`);
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        setSelectedChapter(data);
      } else {
        console.log("No chapter data found");
      }
    } catch (error) {
      console.log("Error fetching chapter data:", error);
    }
  };

  return (
    <Box my={4}>
      <Container maxWidth="sm,xs,lx">
        <Card>
          <Box paddingLeft={2} mt={2} mb={2}>
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
              <Typography
                underline="hover"
                color="textSecondary"
                href={`/novel/${id_novel}`}
                aria-current="page"
              >
                {dataname}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Divider />
          {userId ? (
            <Box>
              <Typography
                sx={{
                  backgroundColor: "#f5f5f5",
                  color: "blue",
                  borderLeft: "3px solid blue",
                  m: 1,
                  paddingLeft: 2,
                }}
                variant="h5"
                gutterBottom
              >
                Bookshelf
              </Typography>
              <Divider />
              {datanameep ? (
                <Fragment>
                  <ListItemButton
                    fullWidth
                    href={`/novel/${id_novel}/${dataep}`}
                  >
                    <ListItemText primary={datanameep} />
                  </ListItemButton>
                  <Divider />
                </Fragment>
              ) : (
                <Fragment>
                  <ListItemButton fullWidth>
                    <ListItemText primary={datanameep} />
                  </ListItemButton>
                  <Divider />
                </Fragment>
              )}
            </Box>
          ) : (
            <Typography fullWidth></Typography>
          )}

          <Box>
            <Typography
              sx={{
                backgroundColor: "#f5f5f5",
                color: "blue",
                borderLeft: "3px solid blue",
                m: 1,
                paddingLeft: 2,
              }}
              variant="h6"
              gutterBottom
            >
              List of Chapters
            </Typography>
            <Divider />
            <List component="nav" aria-label="chapters">
              <Grid container spacing={2} alignItems="center">
                {dataselectchapter.map((chapter, index) => (
                  <Fragment key={index}>
                    <Grid item xs={12} sm={6}>
                      <ListItemButton
                        fullWidth
                        href={`/novel/${id_novel}/${chapter.id}`}
                      >
                        <ListItemText primary={chapter.name_episode} />
                      </ListItemButton>
                      <Divider />
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
            </List>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Directory;
