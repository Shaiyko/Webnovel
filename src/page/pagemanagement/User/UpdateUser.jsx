import React, { useEffect, useState } from "react";
import "../css/stylesloading.css"; // css
import {
  Modal,
  Button,
  TextField,
  Box,
  IconButton,
  Card,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Swal from "sweetalert2";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";
import { IMaskInput } from "react-imask";
import PropTypes from "prop-types";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import MenuItem from "@mui/material/MenuItem";
import PortraitIcon from "@mui/icons-material/Portrait";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { apinovel } from "../../../URL_API/Apinovels";

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

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// eslint-disable-next-line react/prop-types
export default function UpdateUser({ selected, setSelected, UserGet }) {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [parentFileId, setParentFileId] = useState(
    "19Wkip54OAhwbxlXedFHIRTOOU-wzOD3w"
  );
  const [datagender, setGender] = useState("");
  const [datauser, setUserName] = useState("");
  const [datagmail, setGmail] = useState("");
  const [datapass, setPass] = useState("");
  const datastatus = "user";
  const [showPassword, setShowPassword] = useState(false);
  const [datayear, setYear] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelected([]);
    UserGet();
  };



  const handleAddTag = async () => {
    axios
      .put(`${apinovel}/update/user/${selected[0]}`, {
        gender: datagender,
        user_name: datauser,
        gmail: datagmail,
        password: datapass,
        status: datastatus,
        year: datayear,
      })
      .then((response) => {
        console.log("Update succeeded", response.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User has been updated",
          showConfirmButton: false,
          timer: 1500,
        });

        UserGet();
      })
      .catch((error) => {
        console.error("Error updating:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const handleGetUpdate = () => {
    axios
      .get(`${apinovel}/view/user/${selected[0]}`)
      .then((response) => {
        const data = response.data[0];
        setGender(data.gender);
        setUserName(data.user_name);
        setGmail(data.gmail);
        setPass(data.password);
        setYear(data.year);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (selected.length > 0) {
      handleGetUpdate();
    }
  }, [selected]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await handleAddTag();
      Swal.close();
      handleClose();
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

  return (
    <div>
      <Button
        sx={{ fontSize: "11px", width: 100 }}
        size="small"
        color="secondary"
        variant="contained"
        onClick={handleOpen}
      >
        <PersonAddAltIcon sx={{ mr: 1 }} />
        Update Admin
      </Button>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "5%",
            left: "30%",
            right: "30%",
            width: 600,
            overflow: "auto",
            height: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <PortraitIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="standard-select-currency"
              select
              fullWidth
              label="Gender"
              value={datagender}
              onChange={(event) => setGender(event.target.value)}
              variant="standard"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <br />
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SecurityUpdateIcon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
            />
            <TextField
              required
              fullWidth
              value={datauser}
              label="Username"
              variant="standard"
              onChange={(event) => setUserName(event.target.value)}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={datapass}
                onChange={(event) => setPass(event.target.value)}
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
          <br />
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <MailOutlineIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              required
              fullWidth
              value={datagmail}
              label="Gmail"
              variant="standard"
              onChange={(event) => setGmail(event.target.value)}
            />
          </Box>
          <br />
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <CalendarMonthIcon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
            />
            <TextField
              required
              fullWidth
              value={datayear}
              label="Year"
              variant="standard"
              onChange={(event) => setYear(event.target.value)}
            />
          </Box>
          <br />
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-evenly",
              mb: 5,
            }}
          >
            <Button
              sx={{ fontSize: "16px" }}
              size="small"
              color="success"
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <div className="loading">Loading...</div>
              ) : (
                "Update Admin"
              )}
            </Button>
            <Button
              sx={{ width: "50%" }}
              onClick={handleClose}
              variant="contained"
              color="error"
              fullWidth
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
