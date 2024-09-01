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

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import TagIcon from "@mui/icons-material/Tag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PreviewIcon from "@mui/icons-material/Preview";
import SourceIcon from "@mui/icons-material/Source";
export default function TemporaryDrawer({ dataopen }) {
  const [openMD, setOpenM] = React.useState(false);
  const handleClickMD = () => {
    setOpenM(!openMD);
  };
  const [openMN, setOpenN] = React.useState(false);
  const handleClickMN = () => {
    setOpenN(!openMN);
  };
  const [openRN, setOpenR] = React.useState(false);
  const handleClickRN = () => {
    setOpenR(!openRN);
  };
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInAdmin = JSON.parse(localStorage.getItem("admin"));
  const loggedInUserP = JSON.parse(localStorage.getItem("userP"));
  const loggedInAuthor = JSON.parse(localStorage.getItem("author"));
  const [open, setOpen] = useState(false);

  console.log("User", loggedInUser);
  const handleSignIn = (event) => {
    event.stopPropagation();
    setOpen(false);
    window.location.href = "/register";
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
      <Box
        sx={{ width: 300, backgroundColor: "#fafafa", height: "100ch" }}
        role="presentation"
      >
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
        <Divider />
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
        <List>
          <ListItemButton href="/" onClick={handleItemClick}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton href="/0" onClick={handleItemClick}>
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
              <MarkUnreadChatAltIcon />
            </ListItemIcon>
            <ListItemText primary="Suggestions" />
          </ListItemButton>
        </List>
      </Box>
    );
  } else if (loggedInUser && loggedInUser.status === "admin") {
    menulist = (
      <Box
        sx={{ width: 300, backgroundColor: "#fafafa", height: "100ch" }}
        role="presentation"
      >
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
        <Divider />
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
         
            <Logout />
        </Box>

        <Divider />
        {/*Manage Data ************************************************************************************************************************** */}
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
              href={"/tadmin"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Admin" />
            </ListItemButton>
            <ListItemButton
              href={"/tauthor"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Author" />
            </ListItemButton>
            <ListItemButton
              href={"/tuser"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Manage User" />
            </ListItemButton>
            <ListItemButton
              href={"/tsuggestions"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <SourceIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Suggestions" />
            </ListItemButton>
          </List>
        </Collapse>
        {/*Manage Novel ******************************************************************************************************************* */}
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
              href={"/tnovel"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <DriveFileRenameOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Novel" />
            </ListItemButton>
            <ListItemButton
              href={"/ttype"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Novel Type" />
            </ListItemButton>
            <ListItemButton
              href={"/ttag"}
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
        {/*Data Report ************************************************************************************************************************* */}
        <ListItemButton onClick={handleClickRN}>
          <ListItemIcon>
            <ImportExportIcon />
          </ListItemIcon>
          <ListItemText primary="Report" />
          {openRN ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openRN} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              href={"/novel"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <ReceiptLongIcon />
              </ListItemIcon>
              <ListItemText primary="Report Novels" />
            </ListItemButton>
            <ListItemButton
              href={"/author"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <AssignmentIndIcon />
              </ListItemIcon>
              <ListItemText primary="Report Authors" />
            </ListItemButton>
            <ListItemButton
              href={"/user"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Report Users" />
            </ListItemButton>
            <ListItemButton
              href={"/suggestions"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Report Suggestions" />
            </ListItemButton>
            <ListItemButton
              href={"/reortview"}
              sx={{ pl: 4 }}
              onClick={handleItemClick}
            >
              <ListItemIcon>
                <PreviewIcon />
              </ListItemIcon>
              <ListItemText primary="Report Reading" />
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
          <ListItemButton href="/0" onClick={handleItemClick}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Novel Categories" />
          </ListItemButton>
          <ListItemButton href="/suggestions" onClick={handleItemClick}>
            <ListItemIcon>
              <MarkUnreadChatAltIcon />
            </ListItemIcon>
            <ListItemText primary="Suggestions" />
          </ListItemButton>
        </List>
      </Box>
    );
  } else if (loggedInUser && loggedInUser.status === "author") {
    menulist = (
      <Box
        sx={{ width: 300, backgroundColor: "#fafafa", height: "100ch" }}
        role="presentation"
      >
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
        <Divider />
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
              href={`/tnovel/${loggedInAuthor.id_author}`}
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
          <ListItemButton href="/0" onClick={handleItemClick}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Novel Categories" />
          </ListItemButton>
          <ListItemButton href="/suggestions" onClick={handleItemClick}>
            <ListItemIcon>
              <MarkUnreadChatAltIcon />
            </ListItemIcon>
            <ListItemText primary="Suggestions" />
          </ListItemButton>
        </List>
      </Box>
    );
  } else if (!loggedInUser) {
    menulist = (
      <Box
        sx={{ width: 300, backgroundColor: "#fafafa", height: "100ch" }}
        role="presentation"
      >
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
          <ListItemButton href="/0" onClick={handleItemClick}>
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
              <MarkUnreadChatAltIcon />
            </ListItemIcon>
            <ListItemText primary="Suggestions" />
          </ListItemButton>
        </List>
      </Box>
    );
  }

  console.log("admin page ", loggedInAdmin);
  console.log("User page ", loggedInUserP);
  console.log("Author page ", loggedInAuthor);
  return (
    <Box>
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
    </Box>
  );
}
