// eslint-disable-next-line no-unused-vars
import { Avatar, Button } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

import { deepOrange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

function Checkprofile() {
  const history = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleProfile = () => {
    history("/profile");
  };

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  let userData = null;

  if (loggedInUser && loggedInUser.status === "user") {
    userData = JSON.parse(localStorage.getItem("userP"));
  } else if (loggedInUser && loggedInUser.status === "admin") {
    userData = JSON.parse(localStorage.getItem("admin"));
  }if(loggedInUser){
  return (
    <>
      <Button onClick={handleProfile} onClose={handleClose} setOpen={open}>
        {userData && (
          <Avatar sx={{ bgcolor: deepOrange[500], marginLeft: 2 }}>
            {userData.user_name.charAt(0)}
          </Avatar>
        )}
        <p>Profile</p>
      </Button>
    </>
  );}
}

export default Checkprofile;
