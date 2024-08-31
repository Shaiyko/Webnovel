import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import HomeIcon from "@mui/icons-material/Home";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import { deepOrange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Logoutpage from "../pagelogin/Loguot"; // Import the Logout component
import ChangePassword from "./UpdateAccount/ChangePassword"; // Import the ChangePassword component
import SuggestionForm2 from "../pagenovel/SuggestionForm";
import Bookshelf from "../pagenovel/Bookshelf";
import {
  HistoryEdu,
  MenuBook,
  NoteAlt,
  RecentActors,
} from "@mui/icons-material";
import ChangeData from "./UpdateAccount/ChangeData";
import TableNovel from "../pagemanagement/novel/Tablenovel";
import Tablemyletter from "../pagemauthor/Tablemyletter";
import Applytobeanauthor from "./UpdateAccount/Applytobeanauthor";

export default function Account() {
  const [selectedOption, setSelectedOption] = useState("userInfo"); // State to track selected option
  const navigate = useNavigate(); // Initialize useNavigate
  const [userId, setUserId] = useState(""); // รหัสผู้ใช้
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserP = JSON.parse(localStorage.getItem("userP"));
  const loggedInAuthor = JSON.parse(localStorage.getItem("author"));
  const handleMenuClick = (option) => {
    if (window.innerWidth < 600) {
      // Check if screen width is less than 600px (xs)
      if (option === "changePassword") {
        navigate("/change-password");
      } else if (option === "myBookshelf") {
        navigate("/my-bookshelf");
      } else if (option === "suggestions") {
        navigate("/suggestions");
      } else if (option === "changedata") {
        navigate("/changedata");
      } else if (option === "home") {
        navigate("/");
      } else if (option === "applytobeanauthor") {
        navigate("/applytobeanauthor");
      }
    } else {
      setSelectedOption(option);
    }
  };
  const formatDateTime = (datatime) => {
    const date = new Date(datatime);
    return date.toLocaleDateString(); // Display date and time
  };
  const handleCancel = () => {
    setSelectedOption("userInfo"); // กลับไปยังหน้าข้อมูลผู้ใช้
  };
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      if (loggedInUser.status === "user") {
        const loggedInUserP = JSON.parse(localStorage.getItem("userP"));
        setUserId(loggedInUserP.id_user);
      } else if (loggedInUser.status === "author") {
        const loggedInAuthor = JSON.parse(localStorage.getItem("author"));
        setUserId(loggedInAuthor.id_author);
      }
    }
  }, []);
  let menulist = null;
  if (loggedInUser && loggedInUser.status === "user") {
    menulist = (
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                {loggedInUserP && (
                  <Avatar sx={{ bgcolor: deepOrange[500], marginRight: 2 }}>
                    {loggedInUserP.user_name.charAt(0)}
                  </Avatar>
                )}
                {loggedInUserP && (
                  <Typography variant="h6">
                    {loggedInUserP.user_name}
                  </Typography>
                )}
              </Box>

              <Divider />
              <List>
                <ListItemButton
                  href="/"
                  onClick={() => handleMenuClick("home")}
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => handleMenuClick("changePassword")}
                >
                  <ListItemIcon>
                    <LockResetIcon />
                  </ListItemIcon>
                  <ListItemText primary="Change Password" />
                </ListItemButton>
                <ListItemButton onClick={() => handleMenuClick("changedata")}>
                  <ListItemIcon>
                    <RecentActors />
                  </ListItemIcon>
                  <ListItemText primary="Change Data" />
                </ListItemButton>
                <ListItemButton onClick={() => handleMenuClick("myBookshelf")}>
                  <ListItemIcon>
                    <CollectionsBookmarkIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Bookshelf" />
                </ListItemButton>
                <ListItemButton onClick={() => handleMenuClick("suggestions")}>
                  <ListItemIcon>
                    <MarkUnreadChatAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Suggestions" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => handleMenuClick("applytobeanauthor")}
                >
                  <ListItemIcon>
                    <NoteAlt />
                  </ListItemIcon>
                  <ListItemText primary="Apply to be an Author" />
                </ListItemButton>
                <Logoutpage />
              </List>
            </Box>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          sx={{ display: { xs: "none", md: "block" } }} // Hide on xs, show on md and larger
        >
          {selectedOption === "applytobeanauthor" && (
            <Applytobeanauthor onCancel={handleCancel} />
          )}
          {selectedOption === "suggestions" && (
            <SuggestionForm2 onCancel={handleCancel} />
          )}
          {selectedOption === "changedata" && (
            <ChangeData onCancel={handleCancel} />
          )}
          {selectedOption === "myBookshelf" && <Bookshelf />}
          {selectedOption === "changePassword" && (
            <ChangePassword onCancel={handleCancel} /> // ส่ง handleCancel ไปยัง ChangePassword
          )}
          {selectedOption === "userInfo" && loggedInUserP && (
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Data User
                </Typography>
                <Divider />
                <Box mt={2}>
                  <Typography gutterBottom variant="h6">
                    {loggedInUserP.user_name} ({loggedInUserP.status})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Gender:</strong> {loggedInUserP.gender}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Year:</strong>
                    {loggedInUserP.year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Gmail:</strong> {loggedInUserP.gmail}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    );
  }
  if (loggedInUser && loggedInUser.status === "author") {
    menulist = (
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: { xs: "none", md: "block" } }} // Hide on xs, show on md and larger
        >
          <Card>
            <Box
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                {loggedInAuthor && (
                  <Avatar sx={{ bgcolor: deepOrange[500], marginRight: 2 }}>
                    {loggedInAuthor.user_name.charAt(0)}
                  </Avatar>
                )}
                {loggedInAuthor && (
                  <Typography variant="h6">
                    {loggedInAuthor.user_name}
                  </Typography>
                )}
              </Box>
              <Divider />
              <List>
                <ListItemButton
                  href="/"
                  onClick={() => handleMenuClick("home")}
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton onClick={() => handleMenuClick("mybook")}>
                  <ListItemIcon>
                    <MenuBook />
                  </ListItemIcon>
                  <ListItemText primary="My Book" />
                </ListItemButton>
                <ListItemButton onClick={() => handleMenuClick("myletter")}>
                  <ListItemIcon>
                    <HistoryEdu />
                  </ListItemIcon>
                  <ListItemText primary="My Letter" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => handleMenuClick("changePassword")}
                >
                  <ListItemIcon>
                    <LockResetIcon />
                  </ListItemIcon>
                  <ListItemText primary="Change Password" />
                </ListItemButton>
                <ListItemButton onClick={() => handleMenuClick("changedata")}>
                  <ListItemIcon>
                    <RecentActors />
                  </ListItemIcon>
                  <ListItemText primary="Change Data" />
                </ListItemButton>
                <ListItemButton onClick={() => handleMenuClick("suggestions")}>
                  <ListItemIcon>
                    <MarkUnreadChatAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Suggestions" />
                </ListItemButton>
                <Logoutpage />
              </List>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          {selectedOption === "myletter" && (
            <Tablemyletter id_author={userId} />
          )}
          {selectedOption === "mybook" && <TableNovel id_author={userId} />}
          {selectedOption === "suggestions" && (
            <SuggestionForm2 onCancel={handleCancel} />
          )}
          {selectedOption === "changedata" && (
            <ChangeData onCancel={handleCancel} />
          )}
          {selectedOption === "changePassword" && (
            <ChangePassword onCancel={handleCancel} />
          )}
          {selectedOption === "userInfo" && loggedInAuthor && (
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      Data Author
                    </Typography>
                    <Divider />
                    <Box mt={2}>
                      <Typography gutterBottom variant="h6">
                        {loggedInAuthor.user_name} ({loggedInAuthor.status})
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Pen Name:</strong> {loggedInAuthor.penname}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Gender:</strong> {loggedInAuthor.gender}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Data Of Birth:</strong>{" "}
                        {formatDateTime(loggedInAuthor.date_of_birth)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Address:</strong> {loggedInAuthor.address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Contact Channels:</strong>{" "}
                        {loggedInAuthor.contact_channels}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Gmail:</strong> {loggedInAuthor.gmail}
                      </Typography>
                    </Box>
                  </CardContent>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      sx={{ width: "100%", height: 300, objectFit: "cover" }}
                      image={
                        loggedInAuthor.avatar ||
                        `https://drive.google.com/thumbnail?id=1p_xAKSNXylMpPPKdeB30KWe8BtYjdHJd`
                      }
                      alt="Author avatar"
                    />
                  </Card>
                </Grid>
              </Grid>
            </Card>
          )}
        </Grid>
      </Grid>
    );
  }

  return <Container>{menulist}</Container>;
}
