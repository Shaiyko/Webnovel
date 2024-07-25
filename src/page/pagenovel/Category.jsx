import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Tabs,
  Tab,
  Box,
  ButtonBase,
  CardActionArea,
  Container,
  Divider,
  Pagination,
} from "@mui/material";
import { styled } from "@mui/system";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const CustomLink = styled(ButtonBase)({
  color: "black",
});
const CustomButtonB = styled(ButtonBase)({
  color: "black",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontSize: "14px",
});

const chapter1 = {
  margin: "0 8px",
  whiteSpace: "pre-line",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "45%",
};
const chapter2 = {
  margin: "0 8px",
  whiteSpace: "pre-line",
  width: "30%",
};
const chapter3 = {
  display: "flex",
  margin: "0 8px",
  whiteSpace: "pre-line",
  width: "25%",
};

const categories = [
  { id: 0, label: "ทุกหมวดหมู่" },
];

function Category() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page")) || 1;
  const itemsPerPage = 20;
  const { id } = useParams(); // Get the category ID from the URL
  const [dataTag, setTagnovel] = useState([]);
  const [dataType, setType2] = useState(categories);
  const [selectedTab, setSelectedTab] = useState(0);
  const [hasNovels, setHasNovels] = useState(true);


  const formatDateTime = (datatime) => {
    const date = new Date(datatime);
    return date.toLocaleString(); // Display date and time
  };

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
      setSelectedTab(dataType.findIndex(cat => cat.id === categoryId));
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

  useEffect(() => {
    // Fetch category types on component mount
    handleGetType();
  }, []);

  const handleGetType = () => {
    axios
      .get(`http://localhost:5000/typenovel`)
      .then((response) => {
        const newData = response.data.map((item) => ({
          id: item.id_type,
          label: item.name_type,
        }));

        // Remove duplicate categories
        const uniqueData = [
          ...new Map([...dataType, ...newData].map((item) => [item.id, item])).values(),
        ];

        setType2(uniqueData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const NovelAllGet = (categoryId) => {
    let url = "http://localhost:5000/novelallviewep";
    if (categoryId !== 0) {
      url = `http://localhost:5000/novelallvieweptype/${categoryId}`;
    }

    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          const filteredData = data.filter((novel) => novel.uploadeN === "Yes");
          setTagnovel(filteredData);
          setHasNovels(true);
        } else {
          setTagnovel([]);
          setHasNovels(false);
        }
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
    <Box sx={{ bgcolor: "white" }}>
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
          }}
        >
          {dataType.map((category, index) => (
            <Tab key={category.id} label={category.label} />
          ))}
        </Tabs>
      </Container>
      <Box sx={{ p: 1, width: "85%", marginLeft: "5%" }}>
        {!hasNovels ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            Not Novel
          </Typography>
        ) : (
          <Grid container spacing={3} style={{ marginTop: "10px" }}>
            {displayData.map((novel, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <StyledCard>
                  <CardActionArea href={`/novel/${novel.id_novel}`}>
                    <CardMedia
                      component="img"
                      alt={novel.name_novel}
                      height="150"
                      image={novel.image_novel}
                      title={novel.name_novel}
                    />
                  </CardActionArea>
                  <CardContent style={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      <CustomLink href={`/novel/${novel.id_novel}`}>
                        {novel.name_novel}
                      </CustomLink>
                    </Typography>
                    <Divider />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px", // Add margin to space out data
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{ width: "50%" }}
                      >
                        <ButtonBase href={`/author/${novel.id_author}`}>
                          {novel.penname}
                        </ButtonBase>
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h7"
                        component="div"
                        style={{ width: "30%" }}
                      >
                        <CustomLink href={`/selecttype/${novel.id_type}`}>
                          {novel.name_type}
                        </CustomLink>
                      </Typography>
                      <Typography
                        sx={{ margin: "0 8px" }}
                        style={{ width: "20%" }}
                      >
                        Status: {novel.statusN}
                      </Typography>
                    </Box>
                    <Divider />
                    <Typography variant="h7">Introduction</Typography>
                    <CustomButtonB>{novel.description}</CustomButtonB>
                  </CardContent>
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderTop: "1px solid #ccc", // Add border top for separation
                      paddingTop: "8px",
                      maxWidth: "100%", // Ensure full width
                    }}
                  >
                    <Typography sx={chapter1}>
                      Chapter {novel.id_episode_novel}: {novel.name_episode}
                    </Typography>
                    <Typography sx={chapter2}>
                      {formatDateTime(novel.updateep)}
                    </Typography>
                    <Typography sx={chapter3}>
                      <MenuBookIcon />
                      <Typography color={"red"}>{novel.epall} </Typography>
                      Chapters
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <Pagination
            count={Math.ceil(dataTag.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Box>
    </Box>
  );
}

export default Category;
