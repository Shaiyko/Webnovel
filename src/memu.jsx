import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";

import { deepOrange } from "@mui/material/colors";

import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, IconButton, Typography } from "@mui/material";
import Logout from "./page/pagelogin/Loguot";
import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function TemporaryDrawer() {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInAdmin = JSON.parse(localStorage.getItem("admin"));
  const loggedInUserP = JSON.parse(localStorage.getItem("userP"));
  const [open, setOpen] = useState(false);
  const history = useNavigate();
  const handleSignIn = () => {
    history("/login", { state: { isLoginActive: false } });
  };
  const handleLogin = () => {
    history("/login", { state: { isLoginActive: true } });
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  let menulist = null;
  if (loggedInUser && loggedInUser.status === "user") {
    menulist = (
      <Box
        sx={{ width: 300 }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          {loggedInUserP && (
            <Avatar sx={{ bgcolor: deepOrange[500], marginLeft: 2 }}>
              {loggedInUserP.user_name.charAt(0)}
            </Avatar>
          )}
          <Typography sx={{marginLeft:2}} variant="h6">{loggedInUserP.user_name}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <ListItemButton href="/profile">
            <AccountCircle />
            profile
          </ListItemButton>
          <ListItemButton href="/my-bookshelf">My Bookshelf</ListItemButton>
          <ListItemButton href="/login">
            <Logout />
          </ListItemButton>
        </Box>

        <Divider />
        <List>
          <ListItemButton href="/">Home</ListItemButton>
          <ListItemButton href="/ranking">Ranking List</ListItemButton>
          <ListItemButton href="/novel-category">
            Novel Categories
          </ListItemButton>
          <ListItemButton href="/my-bookshelf">My Bookshelf</ListItemButton>
          <ListItemButton href="/suggestions">Suggestions</ListItemButton>
        </List>
      </Box>
    );
  } else if (!loggedInUser) {
    menulist = (
      <Box
        sx={{ width: 280 }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <List>
          <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <AccountCircle sx={{ width: 250 }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <ListItemButton onClick={handleLogin}>
              <Logout />
            </ListItemButton>
            <ListItemButton onClick={handleSignIn}>Sign in</ListItemButton>
          </Box>
        </List>
        <Divider />
        <List>
          <ListItemButton href="/">Home</ListItemButton>
          <ListItemButton href="/ranking">Ranking List</ListItemButton>
          <ListItemButton href="/novel-category">
            Novel Categories
          </ListItemButton>
          <ListItemButton href="/my-bookshelf">My Bookshelf</ListItemButton>
          <ListItemButton href="/suggestions">Suggestions</ListItemButton>
        </List>
      </Box>
    );
  }
  console.log("admin page ", loggedInAdmin);
  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
      >
        <Button onClick={toggleDrawer(true)} style={{ color: "wheat" }}>
          {" "}
          <MenuIcon />
        </Button>
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {menulist}
      </Drawer>
    </div>
  );
}
