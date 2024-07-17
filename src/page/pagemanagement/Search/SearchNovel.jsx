import {
  Box,
  ButtonBase,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
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
const CustomLink = styled(ButtonBase)({
  color: "black",
});

const chapter1 = {
  margin: "0 8px",
  whiteSpace: "pre-line",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "50%",
};
const chapter2 = {
  margin: "0 8px",
  whiteSpace: "pre-line",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "25%",
};
const chapter3 = {
  margin: "0 8px",
  whiteSpace: "pre-line",
  width: "25%",
};

const dataTag = [
  {
    name_novel: "หมอสวรรค์",
    penname: "เฟิ่งจิง",
    image_novel:
      "https://drive.google.com/thumbnail?id=1vYIARaAYnlqPsVZTWI7YiMDemjZG-nRs",
    status: "continuously",
    description:
      "Cards are surfaces that display content and actions on a single topic. The Material UI Card component includes several complementary utility components to handle various use cases:",
  },
  {
    name_novel: "ความช่วยเหลือ",
    penname: "โม เสี่ยวสุ่ย",
    image_novel:
      "https://drive.google.com/thumbnail?id=1vYIARaAYnlqPsVZTWI7YiMDemjZG-nRs",
    status: "continuously",
    description:
      "Cards are surfaces that display content and actions on a single topic. The Material UI Card component includes several complementary utility components to handle various use cases:",
  },
  {
    name_novel: "นักล่าสัตว์ป่า",
    penname: "อาโอโกะ",
    image_novel:
      "https://drive.google.com/thumbnail?id=1vYIARaAYnlqPsVZTWI7YiMDemjZG-nRs",
    status: "continuously",
    description:
      "Cards are surfaces that display content and actions on a single topic. The Material UI Card component includes several complementary utility components to handle various use cases:",
  },
  {
    name_novel: "โต่วหลัว",
    penname: "ต้า นายน้อยคนที่ 4",
    image_novel:
      "https://drive.google.com/thumbnail?id=1vYIARaAYnlqPsVZTWI7YiMDemjZG-nRs",
    status: "continuously",
    description:
      "Cards are surfaces that display content and actions on a single topic. The Material UI Card component includes several complementary utility components to handle various use cases:",
  },
  {
    name_novel: "ความเข้าใจของฉันท้าทายสวรรค์",
    penname: "อาทิซซี่",
    image_novel:
      "https://drive.google.com/thumbnail?id=1vYIARaAYnlqPsVZTWI7YiMDemjZG-nRs",
    status: "continuously",
    description:
      "Cards are surfaces that display content and actions on a single topic. The Material UI Card component includes several complementary utility components to handle various use cases:",
  },
  {
    name_novel: "ถามเรื่องอายุยืนยาว",
    penname: "สังเกต ซู",
    image_novel:
      "https://drive.google.com/thumbnail?id=1vYIARaAYnlqPsVZTWI7YiMDemjZG-nRs",
    status: "continuously",
    description:
      "Cards are surfaces that display content and actions on a single topic. The Material UI Card component includes several complementary utility components to handle various use cases:",
  },
  {
    name_novel: "ความหวังใหม่",
    penname: "เฉิน หมิง",
    image_novel:
      "https://drive.google.com/thumbnail?id=1vYIARaAYnlqPsVZTWI7YiMDemjZG-nRs",
    status: "continuously",
    description:
      "Cards are surfaces that display content and actions on a single topic. The Material UI Card component includes several complementary utility components to handle various use cases:",
  },
  {
    name_novel: "การกลับมาของราชา",
    penname: "หวัง หลง",
    image_novel:
      "https://drive.google.com/thumbnail?id=1vYIARaAYnlqPsVZTWI7YiMDemjZG-nRs",
    status: "continuously",
    description:
      "Cards are surfaces that display content and actions on a single topic. The Material UI Card component includes several complementary utility components to handle various use cases:",
  },
  {
    name_novel: "สืบทอดสมบัติ",
    penname: "ซุน หงอคง",
    image_novel:
      "https://drive.google.com/thumbnail?id=1vYIARaAYnlqPsVZTWI7YiMDemjZG-nRs",
    status: "continuously",
    description:
      "Cards are surfaces that display content and actions on a single topic. The Material UI Card component includes several complementary utility components to handle various use cases:",
  },
  {
    name_novel: "สุดยอดนักรบ",
    penname: "หลี่ เสี่ยวหลง",
    image_novel:
      "https://drive.google.com/thumbnail?id=1vYIARaAYnlqPsVZTWI7YiMDemjZG-nRs",
    status: "continuously",
    description:
      "Cards are surfaces that display content and actions on a single topic. The Material UI Card component includes several complementary utility components to handle various use cases:",
  },
];
export default function SearchNovel() {
  const { searchN } = useParams();
  return (
    <>
      <Card sx={{ minWidth: 275, mb: 1 }}>
        <CardContent>
          <Box>
            <Typography>Search Novel: {`"${searchN}"`}</Typography>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Grid container spacing={3} style={{ marginTop: "10px" }}>
              {dataTag.map((novel, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                  <StyledCard>
                    <CardActionArea href="/novel">
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
                        <CustomLink href="/novel">
                          {novel.name_novel}
                        </CustomLink>
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "8px", // เพิ่มระยะห่างของข้อมูล
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          style={{ width: "50%" }}
                        >
                          <ButtonBase
                            target="_blank"
                            href={`/author/${novel.penname}`}
                          >
                            {novel.penname}
                          </ButtonBase>
                        </Typography>
                        <Typography sx={{ margin: "0 8px" }}>
                          Status: {novel.status}
                        </Typography>
                      </Box>
                      <Divider />
                      <Typography variant="h7">Introduction :</Typography>
                      <CustomButtonB>{novel.description}</CustomButtonB>
                    </CardContent>
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderTop: "1px solid #ccc", // เพิ่มเส้นแบ่งระหว่างข้อมูล
                        paddingTop: "8px",
                        maxWidth: "100%", // เพิ่มระยะห่างด้านบน
                      }}
                    >
                      <Typography sx={chapter1}>
                        Chapter: 1500 chapter
                      </Typography>
                      <Typography sx={chapter2}>
                        Update time: 12/2/2020
                      </Typography>
                      <Typography sx={chapter3}>
                        <MenuBookIcon />
                        1000 Chapters
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
