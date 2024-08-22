// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Card,
  Container,
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
import { apinovel } from "../../URL_API/Apinovels";

export default function LoginRegister() {
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
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to store user in localStorage:", error);
    }
  };

  const storeUserpageInLocalStorage = (userP) => {
    try {
      localStorage.setItem("userP", JSON.stringify(userP));
      console.log("userP stored in localStorage:", userP);
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to store user in localStorage:", error);
    }
  };

  const storeAuthorpageInLocalStorage = (author) => {
    try {
      localStorage.setItem("author", JSON.stringify(author));
      console.log("author stored in localStorage:", author);
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to store user in localStorage:", error);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(`${apinovel}/login`)
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
              .get(`${apinovel}/view/admin/` + loggedInUser.id)
              .then((response) => {
                const data = response.data[0];

                storeAdminInLocalStorage(data);
              })
              .catch((error) => console.log("error", error));
          } else if (loggedInUser.status === "author") {
            axios
              .get(`${apinovel}/view/author/` + loggedInUser.id)
              .then((response) => {
                const data = response.data[0];

                storeAuthorpageInLocalStorage(data);
              })
              .catch((error) => console.log("error", error));
          } else if (loggedInUser.status === "user") {
            axios
              .get(`${apinovel}/view/user/` + loggedInUser.id)
              .then((response) => {
                const data = response.data[0];

                storeUserpageInLocalStorage(data);
              })
              .catch((error) => console.log("error", error));
          } else {
            window.location.href = "/";
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
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isFormValid()) {
      handleLoginSubmit(e);
    }
  };

  return (
    <Container>
      <Card>
        <Box p={3}>
          <Grid xs={12}>
            <Box>
              <LoadingComponent loading={loading} />
            </Box>

            <Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <AccountCircle sx={{ fontSize: 60 }} />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h5" component="h1" gutterBottom>
                  Login
                </Typography>
              </Box>
              <Box>
                <FormControl fullWidth sx={{ mb: 5 }}>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    UserName
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyDown} // Add this line
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
                    onKeyDown={handleKeyDown} // Add this line
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
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  sx={{ width: "70%", mb: 3 }}
                  variant="contained"
                  color="primary"
                  onClick={handleLoginSubmit}
                  fullWidth
                  disabled={!isFormValid()}
                  onKeyDown={handleKeyDown}
                >
                  Login
                </Button>
              </Box>
              <Box display={"flex"} justifyContent={"center"} mb={2}>
                <Typography>
                  No Account?
                  <Link href="/register"> Register</Link>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Link href="/forgotpassword">Forgot Password</Link>,
              </Box>
            </Box>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
}
