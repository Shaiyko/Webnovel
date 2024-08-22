// eslint-disable-next-line no-unused-vars
import { Login, Logout } from "@mui/icons-material";
import {
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";

function Logoutpage() {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    // ลบข้อมูลผู้ใช้ใน localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    localStorage.removeItem("userP");
    localStorage.removeItem("author");
    // ส่งผู้ใช้กลับไปยังหน้าล็อกอิน
    window.location.href = "/login";
  };
  if (!loggedInUser) {
    return (
      <ListItemButton onClick={handleLogout}>
      <ListItemIcon>
        <Login  />
      </ListItemIcon>
      <ListItemText primary="Login" />
    </ListItemButton>
    );
  } else if (loggedInUser) {
    return (
      <>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </>
    );
  }
}

export default Logoutpage;
