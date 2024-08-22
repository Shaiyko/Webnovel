import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Card, CardMedia, Typography, IconButton, Link } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "@mui/system";
const Linknovel = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "none",
    color: "blue",
  },
  fontWeight: "bold",
});
const CustomArrow = ({ className, style, onClick, icon, position }) => (
  <IconButton
    className={className}
    onClick={onClick}
    style={{
      ...style,
      display: "block",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      [position]: 0,
    }}
  >
    {icon}
  </IconButton>
);

const EnlargedCard = styled(Card)(({ theme }) => ({
  position: "relative",
  transition: "transform 0.3s ease-in-out",
}));

const OverlayText = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  padding: theme.spacing(1),
  textAlign: "center",
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
}));
const CustomButtonB = styled(Typography)({
  color: "textSecondary",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontSize: "14px",
});
const ResponsiveSlider = ({ dataTag }) => {
  
  const itemsPerPage = 5;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: itemsPerPage,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <CustomArrow position="right" />,
    prevArrow: <CustomArrow position="left" />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        m: 1,
        width: "100%",
        maxWidth: 1200,
        mx: "auto",
        my: 4,
        position: "relative",
        backgroundColor:"#e0e0e0",
      }}
    >
      <Slider {...settings}>
      {dataTag.map((item) => (
          <Box key={item.id} px={1} sx={{ mx: "2px" }}>
            <EnlargedCard
              sx={{
                m: 1,
                transform: "scale(1)",
                "&:hover": {
                  transform: "scale(1.1)",
                },
                "&:hover .MuiBox-root": {
                  opacity: 1,
                },
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={
                  item.image_novel
                    ? item.image_novel
                    : `https://drive.google.com/thumbnail?id=1p_xAKSNXylMpPPKdeB30KWe8BtYjdHJd`
                }
                alt={`item ${item.id}`}
              />
              <OverlayText>
                <Typography variant="h6">  <Linknovel href={`/novel/${item.id_novel}`}>{item.name_novel}</Linknovel></Typography>
                <CustomButtonB>{item.description}</CustomButtonB>
              </OverlayText>
            </EnlargedCard>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ResponsiveSlider;
