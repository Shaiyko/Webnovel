import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  TextField,
  Button,
  Box,
  Container,
  Card,
  InputAdornment,
  IconButton,
  Input,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingComponent from "../../Loading";
import { apigmail, apinovel } from "../../URL_API/Apinovels";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const steps = [
  "Enter User Details",
  "Enter Verification Code",
  "Set New Password",
];

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [id, setID] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  //
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleNext = async () => {
    switch (activeStep) {
      case 0:
        // Step 1: Send user details to the server
        try {
          setLoading(true);
          await axios
            .get(`${apinovel}/login`)
            .then((response) => {
              const loggedInUser = response.data.find(
                (user) => user.user_name === username && user.gmail === email
              );
              setStatus(loggedInUser.status);
              setID(loggedInUser.id);
              if (loggedInUser) {
                axios.post(`${apigmail}/send-code`, {
                  email,
                  user_name: loggedInUser.user_name,
                  status: loggedInUser.status,
                });
                setActiveStep(activeStep + 1);
                setLoading(false);
              } else {
                console.log("Invalid username or email");
                setLoading(false);
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "It takes 5 minutes to get a new code!",
                });
              }
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Invalid username or email",
              });
              console.error("Error code in:", error);
              setLoading(false);
            });
        } catch (err) {
          setError("Error sending verification code.");
        }
        break;
      case 1:
        // Step 2: Verify the code
        try {
          setLoading(true);
          await axios
            .post(`${apigmail}/verify-code`, {
              email,
              code: verificationCode,
            })
            .then((response) => {
              setActiveStep(activeStep + 1);
              setLoading(false);
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message,
              });
              console.error("Error in:", error);
              setLoading(false);
            });
        } catch (err) {
          setError("Invalid verification code.");
        }
        break;
      case 2:
        // Step 3: Update the password
        try {
          setLoading(true);
          if (status === "user") {
            await axios
              .put(`${apinovel}/forgot/user/${id}`, {
                password: newPassword,
              })
              .then((response) => {
                console.log("Update succeeded", response.data);
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Password successfully filled",
                  showConfirmButton: false,
                  timer: 1500,
                });
                axios.post(`${apigmail}/reset-password`, {
                  email,
                  newPassword,
                });

                setLoading(false);
                window.location.href = "/login";
              })
              .catch((error) => {
                console.error("Error updating:", error);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              });
          } else if (status === "author") {
            await axios
              .put(`${apinovel}/forgot/author/${id}`, {
                password: newPassword,
              })
              .then((response) => {
                console.log("Update succeeded", response.data);
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Password successfully filled",
                  showConfirmButton: false,
                  timer: 1500,
                });
                axios.post(`${apigmail}/reset-password`, {
                  email,
                  newPassword,
                });

                setLoading(false);
                window.location.href = "/login";
              })
              .catch((error) => {
                console.error("Error updating:", error);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              });
          } else if (status === "admin") {
            await axios
              .put(`${apinovel}/forgot/admin/${id}`, {
                password: newPassword,
              })
              .then((response) => {
                console.log("Update succeeded", response.data);
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Password successfully filled",
                  showConfirmButton: false,
                  timer: 1500,
                });
                axios.post(`${apigmail}/reset-password`, {
                  email,
                  newPassword,
                });

                setLoading(false);
                window.location.href = "/login";
              })
              .catch((error) => {
                console.error("Error updating:", error);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              });
          }
        } catch (err) {
          setError("Error resetting password.");
        }
        break;
      default:
        break;
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };
  return (
    <Container>
      <Card>
        <Box p={2}>
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
            <LoadingComponent loading={loading} />
          </Box>

          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ padding: 2 }}>
            {activeStep === 0 && (
              <>
                <TextField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown} // Add this line
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown} // Add this line
                  fullWidth
                  margin="normal"
                />
              </>
            )}
            {activeStep === 1 && (
              <TextField
                label="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                onKeyDown={handleKeyDown} // Add this line
                fullWidth
                margin="normal"
              />
            )}
            {activeStep === 2 && (
              <FormControl fullWidth variant="standard" sx={{ mb: 5 }}>
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onKeyDown={handleKeyDown} // Add this line
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
            )}
            {error && <Box color="error.main">{error}</Box>}
            <Button
              type="submit"
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 2 }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
