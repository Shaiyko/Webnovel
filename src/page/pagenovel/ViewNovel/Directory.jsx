import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  ListItemButton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const Directory = () => {
  const { id_novel } = useParams();
  const [dataname, setNameN] = useState("");
  const [dataselectchapter, setSelectedChapter] = useState([]);
  const [datanameep, setNameEP] = useState("");
  const [dataep, setEp] = useState(""); // Use consistent naming conventions
  const [userId, setUserId] = useState(null);

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
        `http://localhost:5000/readings?id_user=${userId}&id_novel=${id_novel}`
      );
      const data = response.data[0];
      setEp(data.episode);

      if (data.episode) {
        const episodeResponse = await axios.get(
          `http://localhost:5000/view/ep_novelep/${data.episode}`
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
      const response = await axios.get(`http://localhost:5000/novelall2/${id_novel}`);
      const data2 = response.data[0];
      setNameN(data2.name_novel);
    } catch (error) {
      console.log("Error fetching novel data:", error);
    }
  };

  const UserGetChapter = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/view/ep_novel/${id_novel}`);
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
    <Container maxWidth="sm,xs,lx">
      <Box my={4}>
        <Typography
          sx={{ backgroundColor: "#e0e0e0", color: "blue" }}
          variant="h5"
          gutterBottom
        >
          <ListItemButton href={`/novel/${id_novel}`}>
            {dataname}
          </ListItemButton>
        </Typography>
        <Divider />
          {userId ? (
        <Box>
            <Typography
            sx={{ backgroundColor: "#eeeeee", color: "blue" }}
            variant="h5"
            gutterBottom
          >
            Bookshelf
          </Typography>
          <Divider />
          <Fragment>
            <ListItemButton fullWidth href={`/novel/${id_novel}/${dataep}`}>
              <ListItemText primary={datanameep} />
            </ListItemButton>
            <Divider />
          </Fragment>
        </Box>
          ) : (
              <Typography fullWidth></Typography>
            )}

        <Box>
          <Typography
            sx={{ backgroundColor: "#eeeeee", color: "blue" }}
            variant="h6"
            gutterBottom
          >
            List of Chapters
          </Typography>
          <Divider />
          <List component="nav" aria-label="chapters">
            {dataselectchapter.map((chapter, index) => (
              <Fragment key={index}>
                <ListItemButton
                  fullWidth
                  href={`/novel/${id_novel}/${chapter.id}`}
                >
                  <ListItemText primary={chapter.name_episode} />
                </ListItemButton>
                <Divider />
              </Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default Directory;
