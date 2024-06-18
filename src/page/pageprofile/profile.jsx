import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "/src/page/pageprofile/styleprofile.css";
import { deepOrange } from "@mui/material/colors";
import { Avatar } from "@mui/material";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  let userData = null;

  if (loggedInUser && loggedInUser.status === "user") {
    userData = JSON.parse(localStorage.getItem("userP"));
  } else if (loggedInUser && loggedInUser.status === "admin") {
    userData = JSON.parse(localStorage.getItem("admin"));
  }

  console.log("data", userData);

  return (
    <div className="">
      <Button onClick={handleOpen}>
      {userData && (
      <Avatar sx={{ bgcolor: deepOrange[500], marginLeft: 2 }}>
        {userData.user_name.charAt(0)}
      </Avatar>
    )}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "5%",
            left: "90%",
            transform: "translate(-50%, -90%)",
            width: 350,
            height: 10,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: "24px",
            p: 2.5,
          }}
        >
          <Typography variant="h6" component="h2">
          {userData && (
      <Avatar sx={{ bgcolor: deepOrange[500], marginLeft: 2 }}>
        {userData.user_name.charAt(0)}
      </Avatar>
    )} Profile
          </Typography>
          <hr />
          <div className="but">
            {userData ? (
              <div className="cob">
                <p>
                  Welcome, {userData.user_name} ({userData.status})
                </p>
                <p>Gender: {userData.gender}</p>
                <p>Email: {userData.gmail}</p>
                <p>Year: {userData.date_of_birth}</p>
                <p>Status: {userData.status}</p>
                <p>
                  Avatar: <img src={userData.avatar} alt="Avatar" />
                </p>
              </div>
            ) : (
              <p>Loading user data...</p>
            )}

            <Button
              onClick={handleClose}
              sx={{
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: "24px",
                width: 350,
                height: 50,
              }}
            >
              <p>ປິດ</p>
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Profile;
