import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/system";

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
export default function ViewNovel() {
  //
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };
  //
  const { id_novel } = useParams();
  //s****************
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
    return date.toLocaleString(); // แสดง วันเดือนปี เวลา
  };
  console.log(id_novel);

  const navigate = useNavigate();

  const handleClickIdTag = (id_taek) => {
    navigate(`/selecttag/${id_taek}`);
  };
  const handleIdType = (id_type) => {
    navigate(`/selecttype/${id_type}`);
  };
  const handleIDAuthor = (dataauthor) => {
    const url = `/author/${dataauthor}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
  useEffect(() => {
    UserGet();
    handleGetUpdate2();
  }, []);

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
  return (
    <Box
      sx={{
        backgroundColor: "green",
        width: "100%",
        "@media only screen and (min-width:992px) and (min-width:1199px)": {
          backgroundColor: "white",
          width: "100%",
        },
        "@media (max-width:767px)": {
          backgroundColor: "white",
          width: "100%",
        },
      }}
    >
      <Card sx={{ minWidth: 275, mb: 1 }}>
        <Box>
          <CardContent>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Grid xs={4} md={4}>
                <Box marginTop={"5%"}>
                  <CardMedia
                    component="img"
                    sx={{ height: "auto", width: "130px" }}
                    image={
                      dataimage
                        ? dataimage
                        : `https://drive.google.com/thumbnail?id=1p_xAKSNXylMpPPKdeB30KWe8BtYjdHJd`
                    }
                    alt="Uploaded Image"
                  />
                </Box>
              </Grid>
              <Grid sx={{ width: "100%" }} xs={8} md={8}>
                <Grid marginTop={"3%"} marginLeft={"5%"} xs={3} md={3}>
                  <Typography fontWeight={"bold"}>{dataname}</Typography>
                </Grid>
                <Grid marginTop={"3%"} marginLeft={"5%"} xs={3} md={3}>
                  <Typography color="text.secondary">
                    Author:
                    <Button onClick={() => handleIDAuthor(dataauthor)}>
                      <Typography color="text.secondary">
                        {dataauthor}
                      </Typography>
                    </Button>
                  </Typography>
                </Grid>
                <Grid
                  marginTop={"1%"}
                  marginLeft={"5%"}
                  sx={{ width: "100%" }}
                  display={"flex"}
                  xs={3}
                  md={3}
                >
                  <Typography>
                    Type Novel:{" "}
                    <Button onClick={() => handleIdType(idtype)}>
                      <Typography color="text.secondary">{dataType}</Typography>
                    </Button>
                  </Typography>
                </Grid>
                <Grid
                  marginTop={"1%"}
                  marginLeft={"5%"}
                  sx={{ width: "100%" }}
                  display={"flex"}
                  justifyContent={"start"}
                  xs={3}
                  md={3}
                >
                  <Typography>Status: {datastatus}</Typography>
                </Grid>
                <Grid
                  marginTop={"1%"}
                  marginLeft={"5%"}
                  sx={{ width: "100%" }}
                  display={"flex"}
                  justifyContent={"start"}
                  xs={3}
                  md={3}
                >
                  <Typography variant="subtitle1">
                    Update Time: {formatDateTime(datatime)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Box>
      </Card>
      <Card sx={{ minWidth: 275, mb: 1, height: "100px" }}>
        <Box>
          <CardContent>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Typography fontWeight={"bold"}>Tag</Typography>
              <Divider />
              <Tabs
                centered
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  maxWidth: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {dataselectTag.map((category, index) => (
                  <Tab
                    key={index}
                    label={category.name_taek}
                    onClick={() => handleClickIdTag(category.id_taek)}
                  />
                ))}
              </Tabs>
              <Grid></Grid>
            </Box>
          </CardContent>
        </Box>
      </Card>
      <Card sx={{ minWidth: 275, mb: 1 }}>
        <Box>
          <CardContent>
            <Box>
              <Typography fontWeight={"bold"}>Description</Typography>
              <Divider />
              <Grid xs={12}>
                {expanded ? (
                  <ExpandedDescription onClick={handleToggle}>
                    {datadision}
                  </ExpandedDescription>
                ) : (
                  <Description onClick={handleToggle}>{datadision}</Description>
                )}
              </Grid>
            </Box>
          </CardContent>
        </Box>
      </Card>
      <Card sx={{ minWidth: 275, mb: 1 }}>
        <Box>
          <CardContent>
            <Box>
              <Typography fontWeight={"bold"}>Chapter</Typography>
              <Box></Box>
              <Divider />
              <Grid></Grid>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
