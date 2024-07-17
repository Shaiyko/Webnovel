import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import { blue, deepOrange, red } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Collapse,
  IconButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Logout from "./page/pagelogin/Loguot";
import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import TagIcon from "@mui/icons-material/Tag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
export default function TemporaryDrawer({dataopen}) {
  const [openMD, setOpenM] = React.useState(false);
  const handleClickMD = () => {
    setOpenM(!openMD);
  };
  const [openMN, setOpenN] = React.useState(false);
  const handleClickMN = () => {
    setOpenN(!openMN);
  };
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInAdmin = JSON.parse(localStorage.getItem("admin"));
  const loggedInUserP = JSON.parse(localStorage.getItem("userP"));
  const loggedInAuthor = JSON.parse(localStorage.getItem("author"));
  const [open, setOpen] = useState(false);
  
  const history = useNavigate();
  const handleSignIn = (event) => {
    event.stopPropagation();
    setOpen(false);
    history("/register");
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleItemClick = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  let menulist = null;
  if (loggedInUser && loggedInUser.status === "user") {
    menulist = (
      <Box sx={{ width: 300 }} role="presentation">
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          {loggedInUserP && (
            <Avatar sx={{ bgcolor: deepOrange[500], marginLeft: 2 }}>
              {loggedInUserP.user_name.charAt(0)}
            </Avatar>
          )}
          {loggedInUserP && (
            <Typography sx={{ marginLeft: 2 }} variant="h6">
              {loggedInUserP.user_name}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <ListItemButton href="/profile" onClick={handleItemClick}>
            <AccountCircle />
            Profile
          </ListItemButton>
          <ListItemButton href="/my-bookshelf" onClick={handleItemClick}>
            <Logout />
          </ListItemButton>
        </Box>

        <Divider />
        <List>
          <ListItemButton href="/" onClick={handleItemClick}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton href="/ranking" onClick={handleItemClick}>
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary="Ranking List" />
          </ListItemButton>
          <ListItemButton href="/novel-category" onClick={handleItemClick}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Novel Categories" />
          </ListItemButton>
          <ListItemButton href="/my-bookshelf" onClick={handleItemClick}>
            <ListItemIcon>
              <CollectionsBookmarkIcon />
            </ListItemIcon>
            <ListItemText primary=" My Bookshelf" />
          </ListItemButton>
          <ListItemButton href="/suggestions" onClick={handleItemClick}>
            <ListItemIcon>
              <SettingsSuggestIcon />
            </ListItemIcon>
            <ListItemText primary="Suggestions" />
          </ListItemButton>
        </List>
      </Box>
    );
  } else if (loggedInUser && loggedInUser.status === "admin") {
    menulist = (
      <Box sx={{ width: 300 }} role="presentation">
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          {loggedInAdmin && (
            <Avatar sx={{ bgcolor: blue[500], marginLeft: 2 }}>
              {loggedInAdmin.user_name.charAt(0)}
            </Avatar>
          )}
          {loggedInAdmin && (
            <Typography sx={{ marginLeft: 2 }} variant="h6">
              {loggedInAdmin.user_name}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <ListItemButton href="/profile" onClick={handleItemClick}>
            <AccountCircle />
            Profile
          </ListItemButton>
          <ListItemButton href="/profile" onClick={handleItemClick}>
            <Logout />
          </ListItemButton>
        </Box>

        <Divider />
        <ListItemButton onClick={handleClickMD}>
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Data" />
          {openMD ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMD} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              href={"/manage/tadmin"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Admin" />
            </ListItemButton>
            <ListItemButton
              href={"/manage/tauthor"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Author" />
            </ListItemButton>
            <ListItemButton
              href={"/manage/tuser"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Manage User" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleClickMN}>
          <ListItemIcon>
            <DesignServicesIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Novel" />
          {openMN ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMN} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              href={"/manage/tnovel"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <DriveFileRenameOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Novel" />
            </ListItemButton>
            <ListItemButton
              href={"/manage/ttype"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Novel Type" />
            </ListItemButton>
            <ListItemButton
              href={"/manage/ttag"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <TagIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Novel Tag" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        <List>
          <ListItemButton href="/" onClick={handleItemClick}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton href="/ranking" onClick={handleItemClick}>
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary="Ranking List" />
          </ListItemButton>
          <ListItemButton href="/novel-category" onClick={handleItemClick}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Novel Categories" />
          </ListItemButton>
          <ListItemButton href="/my-bookshelf" onClick={handleItemClick}>
            <ListItemIcon>
              <CollectionsBookmarkIcon />
            </ListItemIcon>
            <ListItemText primary=" My Bookshelf" />
          </ListItemButton>
          <ListItemButton href="/suggestions" onClick={handleItemClick}>
            <ListItemIcon>
              <SettingsSuggestIcon />
            </ListItemIcon>
            <ListItemText primary="Suggestions" />
          </ListItemButton>
        </List>
      </Box>
    );
  } else if (loggedInUser && loggedInUser.status === "author") {
    menulist = (
      <Box sx={{ width: 300 }} role="presentation">
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          {loggedInAuthor && (
            <Avatar sx={{ bgcolor: red[500], marginLeft: 2 }}>
              {loggedInAuthor.user_name.charAt(0)}
            </Avatar>
          )}
          {loggedInAuthor && (
            <Typography sx={{ marginLeft: 2 }} variant="h6">
              {loggedInAuthor.user_name}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <ListItemButton href="/profile" onClick={handleItemClick}>
            <AccountCircle />
            Profile
          </ListItemButton>
          <ListItemButton onClick={handleItemClick}>
            <Logout />
          </ListItemButton>
        </Box>

        <Divider />

        <ListItemButton onClick={handleClickMN}>
          <ListItemIcon>
            <DesignServicesIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Novel" />
          {openMN ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMN} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              href={"/manage/tnovel"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <DriveFileRenameOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Novel" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        <List>
          <ListItemButton href="/" onClick={handleItemClick}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton href="/ranking" onClick={handleItemClick}>
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary="Ranking List" />
          </ListItemButton>
          <ListItemButton href="/novel-category" onClick={handleItemClick}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Novel Categories" />
          </ListItemButton>
          <ListItemButton href="/my-bookshelf" onClick={handleItemClick}>
            <ListItemIcon>
              <CollectionsBookmarkIcon />
            </ListItemIcon>
            <ListItemText primary=" My Bookshelf" />
          </ListItemButton>
          <ListItemButton href="/suggestions" onClick={handleItemClick}>
            <ListItemIcon>
              <SettingsSuggestIcon />
            </ListItemIcon>
            <ListItemText primary="Suggestions" />
          </ListItemButton>
        </List>
      </Box>
    );
  } else if (!loggedInUser) {
    menulist = (
      <Box sx={{ width: 280 }} role="presentation">
        <List>
          <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <AccountCircle sx={{ width: 250 }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <ListItemButton onClick={handleItemClick}>
              <Logout />
            </ListItemButton>
            <ListItemButton onClick={handleSignIn}>Sign in</ListItemButton>
          </Box>
        </List>
        <Divider />
        <List>
          <ListItemButton href="/" onClick={handleItemClick}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton href="/ranking" onClick={handleItemClick}>
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary="Ranking List" />
          </ListItemButton>
          <ListItemButton href="/novel-category" onClick={handleItemClick}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Novel Categories" />
          </ListItemButton>
          <ListItemButton href="/my-bookshelf" onClick={handleItemClick}>
            <ListItemIcon>
              <CollectionsBookmarkIcon />
            </ListItemIcon>
            <ListItemText primary=" My Bookshelf" />
          </ListItemButton>
          <ListItemButton href="/suggestions" onClick={handleItemClick}>
            <ListItemIcon>
              <SettingsSuggestIcon />
            </ListItemIcon>
            <ListItemText primary="Suggestions" />
          </ListItemButton>
        </List>
      </Box>
    );
  }

  console.log("admin page ", loggedInAdmin);
  console.log("User page ", loggedInUserP);
  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {menulist}
      </Drawer>
    </div>
  );
}
