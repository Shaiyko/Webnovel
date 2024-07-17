import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Select,
  Divider,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";
import Grid from "@mui/material/Grid";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../Loading";
const currencies = [
  {
    value: "Male",
    label: <MaleIcon color="info" />,
  },
  {
    value: "Female",
    label: <FemaleIcon color="error" />,
  },
];
// eslint-disable-next-line react/prop-types
export default function Register() {
  const navigate = useNavigate();
  //
  const [maxIdType, setMaxIdType] = useState(0);
  //loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //upload image

  const [datagender, setGender] = useState("");
  const [datauser, setUserName] = useState("");
  const [datagmail, setGmail] = useState("");
  const [datapass, setPass] = useState("");
  // eslint-disable-next-line no-unused-vars
  const datastatus = "user";
  const [showPassword, setShowPassword] = useState(false);

  //year

  const [selectedYear, setSelectedYear] = useState("");
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // สร้างรายการปี (เช่น จาก 1900 ถึงปัจจุบัน)
  const years = Array.from(new Array(125), (val, index) => 1900 + index);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleAddTag = async () => {
    axios
      .post("http://localhost:5000/create/user", {
        id_user: maxIdType + 1,
        user_name: datauser,
        gender: datagender,
        gmail: datagmail,
        password: datapass,
        year: selectedYear,
        status: datastatus,
      })
      .then((response) => {
        console.log("Add succeeded", response.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tag has been added",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/login");
      })
      .catch((error) => {
        console.error("Error registering:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await handleAddTag();
      Swal.close();
    } catch (error) {
      setError(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
  const isFormValid = () => {
    return datagender && datauser && datagmail && datapass && selectedYear;
  };
  const handleGetUpdate = () => {
    axios
      .get(`https://dex-api-novel.onrender.com/view/user`)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          const maxId = Math.max(...data.map((tag) => tag.id_user));
          setMaxIdType(maxId);
        } else {
          setMaxIdType(0);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    handleGetUpdate();
  }, []);
  return (
    <div>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        {error && <p>Error: {error.message}</p>}
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
          <>
            <Typography
              variant="h6"
              id="update-modal-title"
              gutterBottom
              color={"black"}
            >
             Register
             <Divider />
            </Typography>

            <Grid container spacing={0} sx={{ width: "100%", mb: -1 }}>
              <Grid xs={12}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel htmlFor="input-with-icon-adornment">
                    UserName
                  </InputLabel>
                  <Input
                    id="input-with-icon-adornment"
                    value={datauser}
                    onChange={(e) => setUserName(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    }
                  />
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
                        <MailOutlineIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={datapass}
                    onChange={(e) => setPass(e.target.value)}
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
                <TextField
                  sx={{ marginTop: 2 }}
                  fullWidth
                  id="outlined-select-currency"
                  select
                  label="Select Gender"
                  helperText="Please select your Gender"
                  onChange={(e) => setGender(e.target.value)}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <FormControl fullWidth>
                  <InputLabel id="year-label">Select Year</InputLabel>
                  <Select
                    labelId="year-label"
                    value={selectedYear}
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

            <Button
              variant="contained"
              onClick={handleSubmit}
              color="info"
              sx={{ mt: 3 }}
              fullWidth
              disabled={!isFormValid()}
            >
              Add Admin
            </Button>
          </>
        )}
      </Box>
    </div>
  );
}
