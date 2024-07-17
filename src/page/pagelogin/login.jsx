// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  Typography,
} from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import LoadingComponent from "../../Loading";
import Account from './../pageprofile/account';

export default function LoginRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);

  const storeUserInLocalStorage = (user) => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
      console.log("User stored in localStorage:", user);
    } catch (error) {
      console.error("Failed to store user in localStorage:", error);
    }
  };

  const storeAdminInLocalStorage = (admin) => {
    try {
      localStorage.setItem("admin", JSON.stringify(admin));
      console.log("Admin stored in localStorage:", admin);
    } catch (error) {
      console.error("Failed to store user in localStorage:", error);
    }
  };

  const storeUserpageInLocalStorage = (userP) => {
    try {
      localStorage.setItem("userP", JSON.stringify(userP));
      console.log("userP stored in localStorage:", userP);
    } catch (error) {
      console.error("Failed to store user in localStorage:", error);
    }
  };

  const storeAuthorpageInLocalStorage = (author) => {
    try {
      localStorage.setItem("author", JSON.stringify(author));
      console.log("author stored in localStorage:", author);
    } catch (error) {
      console.error("Failed to store user in localStorage:", error);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get("https://dex-api-novel.onrender.com/login")
      .then((response) => {
        const loggedInUser = response.data.find(
          (user) => user.user_name === username && user.password === password
        );

        if (loggedInUser) {
          setUser(loggedInUser);
          console.log("Logged in as:", loggedInUser.status);
          storeUserInLocalStorage(loggedInUser);

          if (loggedInUser.status === "admin") {
            axios
              .get(
                "https://dex-api-novel.onrender.com/view/admin/" +
                  loggedInUser.id
              )
              .then((response) => {
                const data = response.data;
                if (Array.isArray(data) && data.length > 0) {
                  storeAdminInLocalStorage(data[0]);
                } else {
                  console.log("No user data found");
                }
              })
              .catch((error) => console.log("error", error));
            navigate("/admin");
          } else if (loggedInUser.status === "author") {
            axios
              .get(
                "https://dex-api-novel.onrender.com/view/author/" +
                  loggedInUser.id
              )
              .then((response) => {
                const data = response.data;
                if (Array.isArray(data) && data.length > 0) {
                  storeAuthorpageInLocalStorage(data[0]);
                } else {
                  console.log("No user data found");
                }
              })
              .catch((error) => console.log("error", error));
            navigate("/");
          } else if (loggedInUser.status === "user") {
            axios
              .get(
                "https://dex-api-novel.onrender.com/view/user/" +
                  loggedInUser.id
              )
              .then((response) => {
                const data = response.data;
                if (Array.isArray(data) && data.length > 0) {
                  storeUserpageInLocalStorage(data[0]);
                } else {
                  console.log("No user data found");
                }
              })
              .catch((error) => console.log("error", error));
            navigate("/user");
          } else {
            navigate("/");
          }
        } else {
          console.log("Invalid username or password");
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Invalid username or password",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
        console.error("Error logging in:", error);
        setLoading(false);
      });
  };

  const isFormValid = () => {
    return username && password;
  };

  return (
    <>
      <Box>
        <Grid xs={12}>
          {loading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
              }}
            >
              <LoadingComponent />
            </Box>
          )}
          {!loading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
                position: "absolute",
                top: "50%",
                left: "50%",
                boxShadow: 5,
                p: 4,
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
              }}
            >
              <AccountCircle sx={{ fontSize: 60 }} />
              <Typography variant="h5" component="h1" gutterBottom>
                Login
              </Typography>
              <Box>
                <FormControl fullWidth sx={{ mb: 5 }}>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    UserName
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl fullWidth variant="standard" sx={{ mb: 5 }}>
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <KeyIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Box>
              <Button
                sx={{ width: "70%", mb: 3 }}
                variant="contained"
                color="primary"
                onClick={handleLoginSubmit}
                fullWidth
                disabled={!isFormValid()}
              >
                Login
              </Button>
              <Box display={"flex"} mb={2}>
                <Typography>
                  No Account?
                  <Link href="/register"> {" "}Register</Link>
                </Typography>
              </Box>
                <Link href="/">Forgot Password</Link>,
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
}
