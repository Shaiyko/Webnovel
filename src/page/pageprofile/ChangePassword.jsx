import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import Swal from "sweetalert2";
import { apinovel } from "../../URL_API/Apinovels";

export default function ChangePassword({ onCancel }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState("");
  const [pass, setPass] = useState("");
  const [stus, setStatus] = useState("");
  const [loading, setLoading] = useState(false); // State สำหรับตัวโหลด

  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      if (loggedInUser.status === "user") {
        const loggedInUserP = JSON.parse(localStorage.getItem("userP"));
        setUserId(loggedInUserP.id_user);
        setPass(loggedInUserP.password);
        setStatus(loggedInUserP.status);
      } else if (loggedInUser.status === "author") {
        const loggedInAuthor = JSON.parse(localStorage.getItem("author"));
        setUserId(loggedInAuthor.id_author);
        setPass(loggedInAuthor.password);
        setStatus(loggedInAuthor.status);
      }
    }
  }, []);

  const validatePasswordFields = () => {
    let isValid = true;
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }
    if (currentPassword !== pass) {
      newErrors.currentPassword = "Incorrect password";
      isValid = false;
    }
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChangePassword = async () => {
    if (stus === "user" || stus === "author") {
      if (validatePasswordFields()) {
        if (currentPassword === pass) {
          setLoading(true); // เปิดตัวโหลด
          try {
            const endpoint =
              stus === "user"
                ? `${apinovel}/update/userpass/${userId}`
                : `${apinovel}/update/authorpass/${userId}`;
            const response = await axios.put(endpoint, {
              password: newPassword,
            });
            console.log("Password change succeeded", response.data);

            const viewEndpoint =
              stus === "user"
                ? `${apinovel}/view/user/` + userId
                : `${apinovel}/view/author/` + userId;

            axios
              .get(viewEndpoint)
              .then((response) => {
                const data = response.data[0];
                localStorage.setItem(
                  stus === "user" ? "userP" : "author",
                  JSON.stringify(data)
                );

                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `${
                    stus.charAt(0).toUpperCase() + stus.slice(1)
                  } data has been updated`,
                  showConfirmButton: false,
                  timer: 1500,
                });
                setLoading(false); // ปิดตัวโหลด
                handleCancel();
                Swal.fire("Succeed");
              })
              .catch((error) => {
                console.log("error", error);
                setLoading(false); // ปิดตัวโหลดเมื่อเกิดข้อผิดพลาด
              });
          } catch (error) {
            console.error("Error changing password:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
            setLoading(false); // ปิดตัวโหลดเมื่อเกิดข้อผิดพลาด
          }
        }
      }
    }
  };

  const handleCancel = () => {
    if (window.innerWidth < 600) {
      window.location.href = "/profile";
    } else {
      onCancel();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyDown = (e, nextRef, currentValue, fieldName) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentValue.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "This field is required",
        }));
        return;
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: "",
        }));
      }
      if (nextRef) {
        nextRef.current.focus();
      } else {
        handleChangePassword();
      }
    }
  };

  return (
    <Card>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>
          Change Password
        </Typography>
        <TextField
          label="Current Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!errors.currentPassword}
          helperText={errors.currentPassword}
          onKeyDown={(e) =>
            handleKeyDown(e, newPasswordRef, currentPassword, "currentPassword")
          }
        />
        <TextField
          label="New Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!errors.newPassword}
          helperText={errors.newPassword}
          inputRef={newPasswordRef}
          onKeyDown={(e) =>
            handleKeyDown(e, confirmPasswordRef, newPassword, "newPassword")
          }
        />
        <TextField
          label="Confirm New Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          inputRef={confirmPasswordRef}
          onKeyDown={(e) =>
            handleKeyDown(e, null, confirmPassword, "confirmPassword")
          }
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleChangePassword}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ ml: 2 }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>

      {/* ตัวโหลด */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Card>
  );
}
