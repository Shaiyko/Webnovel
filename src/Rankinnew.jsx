import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";
import { apinovel } from "./URL_API/Apinovels";
const Linknovel = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "none",
    color: "blue",
  },
  fontWeight: "bold",
});
export default function Rankingnew() {
  // eslint-disable-next-line no-unused-vars
  const { id_novel } = useParams();
  const [rankingk, setNovels] = useState([]);
  useEffect(() => {
    handleGetRanking();
  }, []);
  const handleGetRanking = () => {
    axios
      .get(`${apinovel}/novelallvieweplastupdate`)
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
  const formatDateTime = (datatime) => {
    const date = new Date(datatime);
    return date.toLocaleString(); // Display date and time
  };
  return (
    <Box mt={2}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography
              borderBottom={"2px solid blue"}
              color={"primary"}
              variant="h6"
              gutterBottom
            >
              Last update
            </Typography>

            <List>
              {rankingk.map((ranking, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={5} sm={3} md={3}>
                        <ListItemText
                          sx={{
                            color: "blue",
                            textAlign: "left",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            width: "100%",
                          }}
                          primary={
                            <Linknovel
                              href={`/novel/${ranking.id_novel}`}
                              aria-label="left aligned"
                            >
                              {ranking.name_novel}
                            </Linknovel>
                          }
                        />
                      </Grid>
                      <Grid item xs={5} sm={3} md={3}>
                        <ListItemText
                          sx={{
                            color: "green",
                            textAlign: "left",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            width: "100%",
                          }}
                          primary={
                            <Linknovel
                              href={`/novel/${ranking.id_novel}/${ranking.idchater}`}
                              aria-label="left aligned"
                            >
                              {ranking.name_episode}
                            </Linknovel>
                          }
                        />
                      </Grid>
                      <Grid item xs={2} sm={2} md={2}>
                        <ListItemText
                          sx={{
                            textAlign: "left",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            width: "100%",
                          }}
                          primary={
                            <Linknovel
                              href={`/novel/${ranking.id_novel}`}
                              aria-label="left aligned"
                            >
                              {ranking.penname}
                            </Linknovel>
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        sm={2}
                        md={2}
                        sx={{ display: { xs: "none", sm: "block" } }}
                      >
                        <ListItemText
                          sx={{
                            textAlign: "left",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            width: "100%",
                          }}
                          primary={
                            <Linknovel
                              href={`/novel/${ranking.name_type}`}
                              aria-label="left aligned"
                            >
                              {ranking.name_type}
                            </Linknovel>
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        sm={2}
                        md={2}
                        sx={{ display: { xs: "none", sm: "block" } }}
                      >
                        <ListItemText
                          sx={{
                            textAlign: "left",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            width: "100%",
                          }}
                          primary={formatDateTime(ranking.updateep)}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  {index < rankingk.length - 1 && <Divider />}
                </React.Fragment>
              ))}
              <Divider />
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
}
