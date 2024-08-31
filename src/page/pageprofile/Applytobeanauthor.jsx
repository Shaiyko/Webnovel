// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Card,
  MenuItem,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  Input,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { Female, Male, Visibility, VisibilityOff } from "@mui/icons-material";
import { apigmail, apinovel } from "../../URL_API/Apinovels";
import LoadingComponent from "../../Loading";
const codetext = `
Please enter the verification code via email.
`;
const gmailtext = `
Please enter your email address correctly as we will use this to send a verification code to your email later.
`;

const steps = ["Add User", "Verification Code", "Add Data Author Details"];
const currencies = [
  {
    value: "Male",
    label: <Male color="info" />,
  },
  {
    value: "Female",
    label: <Female color="error" />,
  },
];
const Applytobeanauthor = () => {
  const [userId, setUserId] = useState("");
  const [pen, setpen] = useState("");
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      if (loggedInUser.status === "author") {
        const loggedInAuthor = JSON.parse(localStorage.getItem("author"));
        setUserId(loggedInAuthor.id_author);
        setpen(loggedInAuthor.penname);
      } else if (loggedInUser.status === "admin") {
        setUserId(1);
        setpen("admin");
      }
    }
  }, []);
  useEffect(() => {
    handleGetUpdate();
  }, []);
  const handleGetUpdate = () => {
    axios
      .get(`https://dex-api-novel.onrender.com/view/author`)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          const maxId = Math.max(...data.map((tag) => tag.id_author));
          setMaxIdType(maxId);
        } else {
          setMaxIdType(0);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const [maxIdType, setMaxIdType] = useState(0);
  //
  const [showTooltip, setShowTooltip] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setVerificationCode(value);
    // ถ้ากรอกรหัสแล้วไม่ต้องแสดง Tooltip
    if (value.length > 0) {
      setShowTooltip(false);
    } else {
      setShowTooltip(true);
    }
  };
  //
  const [datagender, setGender] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const status = `author`;
  const [penname, setPenname] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [realname, setRealname] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  //
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const validateFields = () => {
    switch (activeStep) {
      case 0:
        // Validation for Step 1
        if (!username || !email || !newPassword) {
          setError("Please fill out all fields in Step 1.");
          return false;
        }
        break;
      case 1:
        // Validation for Step 2
        if (!verificationCode) {
          setError("Please fill out all fields in Step 2.");
          return false;
        }
        break;
      case 2:
        // Validation for Step 3
        if (
          !penname ||
          !email ||
          !date_of_birth ||
          !realname ||
          !datagender ||
          !contact ||
          !address
        ) {
          setError("Please fill out all fields in Step 3.");
          return false;
        }
        break;
      default:
        break;
    }
    setError(""); // Clear the error if validation passes
    return true;
  };

  const handleNext = async () => {
    if (!validateFields()) {
      return; // Stop if validation fails
    }

    switch (activeStep) {
      case 0:
        // Handle step 1 logic
        try {
          setLoading(true);
          await axios
            .get(`${apinovel}/login`)
            .then((response) => {
              const loggedInUser = response.data.find(
                (user) => user.user_name === username
              );

              if (loggedInUser) {
                setLoading(false);
                setError(`This "User Name: ${username}" has been Already used`);
              } else {
                axios
                  .post(`${apigmail}/send-code`, {
                    email,
                    user_name: username,
                    status: status,
                  })
                  .then((response) => {
                    setActiveStep(activeStep + 1);
                    setLoading(false);
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
        // Handle step 2 logic (Verification Code)
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
        // Handle step 3 logic (Send author data)
        try {
          setLoading(true);
          await axios
            .get(`${apinovel}/view/author`)
            .then((response) => {
              const loggedInUser1 = response.data.find(
                (user) => user.penname === penname
              );

              if (loggedInUser1) {
                setLoading(false);
                setError(`This "User Name: ${username}" has been Already used`);
              } else {
                axios
                  .post(`${apinovel}/create/author`, {
                    id_author: maxIdType + 1,
                    realname: realname,
                    penname: penname,
                    gender: datagender,
                    date_of_birth: date_of_birth,
                    address: address,
                    gmail: email,
                    user_name: username,
                    password: newPassword,
                    avatar: `https://drive.google.com/thumbnail?id=1TjKQYdbxvD-JKG3kpO5yVUZs-wJdJMNE`,
                    status: status,
                    contact_channels: contact,
                  })
                  .then((response) => {
                    Swal.fire({
                      icon: "success",
                      title: "Success",
                      text: "Author data submitted successfully.",
                    });
                    setLoading(false);
                    setActiveStep(activeStep + 1);
                  })
                  .catch((error) => {
                    console.error("Error registering:", error);
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Something went wrong!",
                    });
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
            {/* Replace with your loading component */}
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
                  label="Username "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  fullWidth
                  margin="normal"
                />
                <Tooltip
                  title={gmailtext}
                  open={showTooltip}
                  disableHoverListener={!showTooltip}
                >
                  <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onMouseEnter={() => setShowTooltip(email.length === 0)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onKeyDown={handleKeyDown}
                    fullWidth
                    margin="normal"
                  />
                </Tooltip>
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
              </>
            )}
            {activeStep === 1 && (
              <>
                <Tooltip
                  title={codetext}
                  open={showTooltip}
                  disableHoverListener={!showTooltip}
                >
                  <TextField
                    label="Verification Code"
                    value={verificationCode}
                    onChange={handleInputChange}
                    onMouseEnter={() =>
                      setShowTooltip(verificationCode.length === 0)
                    }
                    onMouseLeave={() => setShowTooltip(false)}
                    onKeyDown={handleKeyDown}
                    fullWidth
                    margin="normal"
                  />
                </Tooltip>
              </>
            )}
            {activeStep === 2 && (
              <>
                <TextField
                  label="Pen Name"
                  value={penname}
                  onChange={(e) => setPenname(e.target.value)}
                  onKeyDown={handleKeyDown}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="First Name And Last Name"
                  value={realname}
                  onChange={(e) => setRealname(e.target.value)}
                  onKeyDown={handleKeyDown}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Gmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  sx={{ mt: 2 }}
                  fullWidth
                  id="outlined-select-currency"
                  select
                  label={datagender || "Gender"}
                  helperText="Please select your Gender"
                  onChange={(e) => setGender(e.target.value)}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label} {option.value}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  value={date_of_birth}
                  onChange={(e) => setDate_of_birth(e.target.value)}
                  onKeyDown={handleKeyDown}
                  margin="normal"
                />
                <TextField
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyDown={handleKeyDown}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Contact Channels"
                  fullWidth
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  onKeyDown={handleKeyDown}
                  margin="normal"
                />
                {/**
                     * 
                    <TextField
                      label="Upload Image"
                      type="file"
                      fullWidth
                      margin="normal"
                    />
                     */}
              </>
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
};

export default Applytobeanauthor;
