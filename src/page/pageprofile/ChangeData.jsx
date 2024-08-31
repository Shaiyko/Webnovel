import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Grid,
  CardMedia,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import {
  AccountCircle,
  BorderColor,
  Female,
  MailOutline,
  Male,
  Person,
} from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import { apinovel, apiupfile } from "../../URL_API/Apinovels";
import LoadingComponent from "../../Loading";

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

export default function ChangeData({ onCancel }) {
  // States for various form fields and image upload
  const [image, setImage] = useState(null);
  const [fileimage, setFile] = useState(null);
  const [parentFileId, setParentFileId] = useState(
    "19Wkip54OAhwbxlXedFHIRTOOU-wzOD3w"
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [datagender, setGender] = useState("");
  const [datauser, setUserName] = useState("");
  const [datagmail, setGmail] = useState("");
  const [datayear, setYear] = useState("");
  const [userId, setUserId] = useState("");
  const [datapen, setPenname] = useState("");
  const [stus, setStatus] = useState("");
  const [datar, setRealname] = useState("");
  const [dataa, setAvatar] = useState("");
  const [dataadd, setAddress] = useState("");
  const [datacontact, setContact] = useState("");
  const handleYearChange = (event) => {
    if (stus === "user") {
      setYear(event.target.value);
    } else if (stus === "author") {
      const value = event.target.value; // YYYY-MM-DD format
      const [year, month, day] = value.split("-");

      // Validate year to ensure it has 4 digits
      if (year.length > 4) {
        return; // Ignore the change if year is more than 4 digits
      }

      // Reformat date to DD-MM-YYYY
      const formattedDate = `${day}-${month}-${year}`;
      setYear(formattedDate); // Save to state
    }
  };
  const formatDateTime = (datatime) => {
    const [day, month, year] = datatime.split("-");
    return `${year}-${month}-${day}`; // Reformat to YYYY-MM-DD
  };
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      if (loggedInUser.status === "user") {
        const loggedInUserP = JSON.parse(localStorage.getItem("userP"));
        setUserId(loggedInUserP.id_user);
        setGender(loggedInUserP.gender);
        setUserName(loggedInUserP.user_name);
        setGmail(loggedInUserP.gmail);
        setYear(loggedInUserP.year);
        setStatus(loggedInUserP.status);
      } else if (loggedInUser.status === "author") {
        const loggedInAuthor = JSON.parse(localStorage.getItem("author"));
        setUserId(loggedInAuthor.id_author);
        setGender(loggedInAuthor.gender);
        setUserName(loggedInAuthor.user_name);
        setPenname(loggedInAuthor.penname);
        setGmail(loggedInAuthor.gmail);
        setYear(loggedInAuthor.date_of_birth);
        setStatus(loggedInAuthor.status);
        setAvatar(loggedInAuthor.avatar);
        setRealname(loggedInAuthor.realname);
        setAddress(loggedInAuthor.address);
        setContact(loggedInAuthor.contact_channels);
      }
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", fileimage);
    formData.append("name", datauser);
    formData.append("parentFile", parentFileId);

    try {
      const response = await axios.post(`${apiupfile}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAvatar(
        `https://drive.google.com/thumbnail?id=${response.data.fileId}`
      );
      return response.data.fileId;
    } catch (error) {
      setAvatar(`Error uploading file: ${error.message}`);
      throw error;
    }
  };

  const handleUser = async () => {
    try {
      await axios.put(`${apinovel}/update/userdata/${userId}`, {
        gender: datagender,
        gmail: datagmail,
        year: datayear,
      });
      const response = await axios.get(`${apinovel}/view/user/ ` + userId);
      const data = response.data[0];
      localStorage.setItem("userP", JSON.stringify(data));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User data has been updated",
        showConfirmButton: false,
        timer: 1500,
      });
      handleCancel();
    } catch (error) {
      console.error("Error updating:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuthor = async (fileId) => {
    try {
      await axios.put(`${apinovel}/update/authordata/${userId}`, {
        realname: datar,
        penname: datapen,
        gender: datagender,
        date_of_birth: datayear,
        address: dataadd,
        gmail: datagmail,
        avatar: `https://drive.google.com/thumbnail?id=${fileId}`,
        contact_channels: datacontact,
      });
      const response = await axios.get(`${apinovel}/view/author/ ` + userId);
      const data = response.data[0];
      localStorage.setItem("author", JSON.stringify(data));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Author data has been updated",
        showConfirmButton: false,
        timer: 1500,
      });
      handleCancel();
    } catch (error) {
      console.error("Error updating:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuthor2 = async (avatar) => {
    try {
      await axios.put(`${apinovel}/update/authordata/${userId}`, {
        realname: datar,
        penname: datapen,
        gender: datagender,
        date_of_birth: datayear,
        address: dataadd,
        gmail: datagmail,
        avatar: avatar,
        contact_channels: datacontact,
      });
      const response = await axios.get(`${apinovel}/view/author/ ` + userId);
      const data = response.data[0];
      localStorage.setItem("author", JSON.stringify(data));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Author data has been updated",
        showConfirmButton: false,
        timer: 1500,
      });
      handleCancel();
    } catch (error) {
      console.error("Error updating:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    if (stus === "user") {
      handleUser();
    } else if (stus === "author") {
      if (fileimage == null) {
        handleAuthor2(dataa);
      } else {
        const fileId = await handleUpload();
        handleAuthor(fileId);
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
  const validateField = (fieldName, value) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
    return !error;
  };
  const handleKeyDown = (e, nextRef, fieldName, value) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (validateField(fieldName, value)) {
        if (nextRef) {
          nextRef.current.focus();
        } else {
          handleSubmit();
        }
      }
    }
  };
  const years = Array.from(new Array(125), (val, index) => 1900 + index);

  let datachange = null;
  if (stus === "user") {
    datachange = (
      <Card>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom>
            Change Data User
          </Typography>
          <Grid container spacing={0} sx={{ width: "100%", mb: -1 }}>
            <Grid xs={12}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel htmlFor="input-with-icon-adornment">
                  UserName
                </InputLabel>
                <Input
                  disabled
                  id="input-with-icon-adornment"
                  value={datauser}
                  onChange={(e) => setUserName(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                  error={!!errors.username}
                  onKeyDown={(e) =>
                    handleKeyDown(e, null, "username", datauser)
                  }
                />
                {errors.username && (
                  <Typography color="error">{errors.username}</Typography>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel htmlFor="input-with-icon-adornment-email">
                  Gmail
                </InputLabel>
                <Input
                  id="input-with-icon-adornment-email"
                  value={datagmail}
                  onChange={(e) => setGmail(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <MailOutline />
                    </InputAdornment>
                  }
                  error={!!errors.gmail}
                  onKeyDown={(e) => handleKeyDown(e, null, "gmail", datagmail)}
                />
                {errors.gmail && (
                  <Typography color="error">{errors.gmail}</Typography>
                )}
              </FormControl>

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
              <FormControl sx={{ mt: 2 }} fullWidth>
                <InputLabel id="year-label">Select Year</InputLabel>
                <Select
                  labelId="year-label"
                  value={datayear}
                  onChange={handleYearChange}
                  label="Select Year"
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={4}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
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
        </Box>
      </Card>
    );
  } else if (stus === "author") {
    datachange = (
      <Card>
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom>
            Change Data Author
          </Typography>
          <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid item xs={12} md={4}>
              <Card>
                <Button variant="contained" component="label" sx={{ mb: 2 }}>
                  {image ? (
                    <CardMedia
                      component="img"
                      sx={{ width: "100%", height: 250, objectFit: "cover" }}
                      image={image}
                      alt="Uploaded Image"
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      sx={{ width: "100%", height: 250, objectFit: "cover" }}
                      image={dataa}
                      alt="Current Image"
                    />
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: 2,
                }}
              >
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Pen Name
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    value={datapen}
                    onChange={(e) => setPenname(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <BorderColor />
                      </InputAdornment>
                    }
                    error={!!errors.penname}
                    onKeyDown={(e) =>
                      handleKeyDown(e, null, "penname", datapen)
                    }
                  />
                  {errors.penname && (
                    <Typography color="error">{errors.penname}</Typography>
                  )}
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Real Name
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    value={datar}
                    onChange={(e) => setRealname(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    }
                    error={!!errors.realname}
                    onKeyDown={(e) => handleKeyDown(e, null, "realname", datar)}
                  />
                  {errors.realname && (
                    <Typography color="error">{errors.realname}</Typography>
                  )}
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel htmlFor="input-with-icon-adornment-email">
                    Gmail
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment-email"
                    value={datagmail}
                    onChange={(e) => setGmail(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <MailOutline />
                      </InputAdornment>
                    }
                    error={!!errors.gmail}
                    onKeyDown={(e) =>
                      handleKeyDown(e, null, "gmail", datagmail)
                    }
                  />
                  {errors.gmail && (
                    <Typography color="error">{errors.gmail}</Typography>
                  )}
                </FormControl>
              </Box>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  select
                  label={datagender || "Gender"}
                  helperText="Please select your Gender"
                  onChange={(e) => setGender(e.target.value)}
                  error={!!errors.gender}
                  onKeyDown={(e) =>
                    handleKeyDown(e, null, "gender", datagender)
                  }
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label} {option.value}
                    </MenuItem>
                  ))}
                </TextField>
                {errors.gender && (
                  <Typography color="error">{errors.gender}</Typography>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  label="Date Of Birth"
                  type="date"
                  fullWidth
                  value={formatDateTime(datayear)} // Ensure this is in YYYY-MM-DD format
                  onChange={handleYearChange}
                  error={!!errors.year}
                  onKeyDown={(e) => handleKeyDown(e, null, "year", datayear)} // Use original datayear
                />
                {errors.year && (
                  <Typography color="error">{errors.year}</Typography>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  label="Address"
                  type="text"
                  fullWidth
                  value={dataadd}
                  onChange={(e) => setAddress(e.target.value)}
                  error={!!errors.address}
                  onKeyDown={(e) => handleKeyDown(e, null, "address", dataadd)}
                />
                {errors.address && (
                  <Typography color="error">{errors.address}</Typography>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  label="Contact Channels"
                  type="text"
                  fullWidth
                  value={datacontact}
                  onChange={(e) => setContact(e.target.value)}
                  error={!!errors.contact}
                  onKeyDown={(e) =>
                    handleKeyDown(e, null, "contact", datacontact)
                  }
                />
                {errors.contact && (
                  <Typography color="error">{errors.contact}</Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={4} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
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
        </Box>
      </Card>
    );
  }

  return (
    <Box>
      <LoadingComponent loading={loading} />
      {datachange}
    </Box>
  );
}
