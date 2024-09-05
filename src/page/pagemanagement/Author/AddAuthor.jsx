import React, { useEffect, useState } from "react";
import "../css/stylesloading.css"; // css
import {
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import axios from "axios";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Swal from "sweetalert2";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import KeyIcon from "@mui/icons-material/Key";
import { IMaskInput } from "react-imask";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import MenuItem from "@mui/material/MenuItem";
import PortraitIcon from "@mui/icons-material/Portrait";
import { apinovel, apiupfile } from "../../../URL_API/Apinovels";
import LoadingComponent from "../../../Loading";
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
      mask="00-00-0000"
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
export default function Addauthor({ UserGet }) {
  const [maxIdType, setMaxIdType] = useState(0);
  //loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //upload image
  const [image, setImage] = useState(null);
  const [fileimage, setFile] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [parentFileId, setParentFileId] = useState(
    "1VDQDFOx-xVz1FQ1p98L-Ns69bJUE564x"
  );
  const [datarelname, setRname] = useState("");
  const [datapenname, setPname] = useState("");
  const [datagender, setGender] = useState("");
  const [dataaddress, setAddress] = useState("");
  const [datauser, setUserName] = useState("");
  const [datagmail, setGmail] = useState("");
  const [datapass, setPass] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [dataavatar, setAvatar] = useState("");
  const datastatus = "author";
  const [showPassword, setShowPassword] = useState(false);
  const [data_date_of_birth, setDate_of_birth] = useState("");
  const [datacontact_channels, setContact_channels] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleChangeDate = (event) => setDate_of_birth(event.target.value);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handClae();
    UserGet();
  };
  useEffect(() => {
    handleGetUpdate();
  }, []);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const handClae = async () => {
    setRname("");
    setPname("");
    setDate_of_birth("");
    setAddress("");
    setImage("");
    setGender("");
    setGmail("");
    setPass("");
    setContact_channels("");
    setUserName("");
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

  const handleAddTag = async (fileId) => {
    try {
      setLoading(true);
      await axios
        .get(`${apinovel}/view/author`)
        .then((response) => {
          const loggedInPen = response.data.find(
            (user) => user.penname === datapenname
          );
          const loggedInUser = response.data.find(
            (user) => user.user_name === datauser
          );

          if (loggedInPen) {
            setLoading(false)
            setError(`This "Pen Name: ${datapenname}" has been Already used`);
            console.log("5555555555555555555555555")
           
            
          }else  if (loggedInUser) {
            setLoading(false)
            setError(`This "User Name: ${datauser}" has been Already used`);
            console.log("5555555555555555555555555")
           
            
          } else {
            axios
              .post(`${apinovel}/create/author`, {
                id_author: maxIdType + 1,
                realname: datarelname,
                penname: datapenname,
                gender: datagender,
                date_of_birth: data_date_of_birth,
                address: dataaddress,
                gmail: datagmail,
                user_name: datauser,
                password: datapass,
                avatar: `https://drive.google.com/thumbnail?id=${fileId}`,
                status: datastatus,
                contact_channels: datacontact_channels,
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

                UserGet();
                Swal.close();
                handleClose();
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
            text: "Invalid penname",
          });
          console.error("Error code in:", error);
          setLoading(false);
        });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (fileimage == null) {
      const fileId = "1TjKQYdbxvD-JKG3kpO5yVUZs-wJdJMNE";
      try {
        await handleAddTag(fileId);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      } 
    } else {
      try {
        const fileId = await handleUpload();
        await handleAddTag(fileId);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }
    }
  };

  // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
  const isFormValid = () => {
    return (
      datarelname &&
      datapenname &&
      datagender &&
      data_date_of_birth &&
      datacontact_channels &&
      dataaddress &&
      datauser &&
      datagmail &&
      datapass
    );
  };

  const handleGetUpdate = () => {
    axios
      .get(`${apinovel}/view/author`)
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

  return (
    <div>
      <Button onClick={handleOpen}>
        <PersonAddAltIcon color="info" />
      </Button>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle id="update-modal-title" color={"black"}>
          Add Author
        </DialogTitle>
        <DialogContent>
          <Box>
            {/* Loading, Error Handling */}
            <LoadingComponent loading={loading} />
           
            <>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Card>
                    <Button
                      variant="contained"
                      component="label"
                      sx={{ mb: 2 }}
                    >
                      {image ? (
                        <CardMedia
                          component="img"
                          image={image}
                          alt="Uploaded Image"
                        />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 200,
                            bgcolor: "#f0f0f0",
                          }}
                        >
                          <Typography variant="subtitle1" color="textSecondary">
                            <PortraitIcon sx={{ fontSize: 100 }} /> No image
                          </Typography>
                        </Box>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                      />
                    </Button>
                  </Card>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label="Rel Name"
                    value={datarelname}
                    onChange={(e) => setRname(e.target.value)}
                    variant="outlined"
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Pen Name"
                    value={datapenname}
                    onChange={(e) => setPname(e.target.value)}
                    variant="outlined"
                    margin="normal"
                  />
                  <FormControl variant="standard" fullWidth margin="normal">
                    <InputLabel htmlFor="formatted-text-mask-input">
                      Date of Birth
                    </InputLabel>
                    <Input
                      value={data_date_of_birth}
                      onChange={handleChangeDate}
                      name="textmask"
                      id="formatted-text-mask-input"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <TextField
                fullWidth
                id="outlined-select-currency"
                select
                label="Select Gender"
                helperText="Please select your Gender"
                value={datagender}
                onChange={(e) => setGender(e.target.value)}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Contact Channels"
                helperText="Please enter phone number, email, or link."
                value={datacontact_channels}
                onChange={(e) => setContact_channels(e.target.value)}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Address"
                value={dataaddress}
                onChange={(e) => setAddress(e.target.value)}
                variant="outlined"
                margin="normal"
              />
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
              <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
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
              {error && <Box color="error.main">{error}</Box>}
              <Button
                variant="contained"
                onClick={handleSubmit}
                color="info"
                sx={{ mt: 3 }}
                fullWidth
                disabled={!isFormValid()}
              >
                Add Author
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                color="error"
                fullWidth
              >
                Cancel
              </Button>
            </>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
