import React, { useState } from "react";
import "../css/stylesloading.css"; // css
import {
  Modal,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  DialogContent,
  DialogTitle,
  Dialog,
  Alert,
  DialogActions,
  Divider,
  Container,
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
import LoadingComponent from "../../../Loading";
import { apinovel, apiupfile } from "../../../URL_API/Apinovels";
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

const TextMaskCustomTel = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(+856) 00 00-000-000"
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

TextMaskCustomTel.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// eslint-disable-next-line react/prop-types
export default function AddAdmin({ UserGet }) {
  //loading
  const [loading, setLoading] = useState(false);
  const [notuser, setNotuser] = useState(false);
  //upload image
  const [image, setImage] = useState(null);
  const [fileimage, setFile] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [parentFileId, setParentFileId] = useState(
    "19Wkip54OAhwbxlXedFHIRTOOU-wzOD3w"
  );
  const [namef, setNameF] = useState("");
  const [namel, setNameL] = useState("");
  const [datagender, setGender] = useState("");
  const [dataaddress, setAddress] = useState("");
  const [datauser, setUserName] = useState("");
  const [datagmail, setGmail] = useState("");
  const [datapass, setPass] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [dataavatar, setAvatar] = useState("");
  const datastatus = "admin";
  const [showPassword, setShowPassword] = useState(false);
  const [data_date_of_birth, setDate_of_birth] = useState("");
  const [datatel, setTel] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleChangeDate = (event) => setDate_of_birth(event.target.value);
  const handleChangeTel = (event) => setTel(event.target.value);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handClae();
    UserGet();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const handClae = async () => {
    setNameF("");
    setNameL("");
    setDate_of_birth("");
    setAddress("");
    setImage("");
    setGender("");
    setGmail("");
    setPass("");
    setTel("");
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
    axios
      .post(`${apinovel}/create/admin`, {
        f_name: namef,
        l_name: namel,
        gender: datagender,
        date_of_birth: data_date_of_birth,
        tel: datatel,
        address: dataaddress,
        avatar: `https://drive.google.com/thumbnail?id=${fileId}`,
        user_name: datauser,
        gmail: datagmail,
        password: datapass,
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

        UserGet();
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
  //ແກ້ແລ້ວ
  const handleSubmit = async () => {
    setLoading(true);
    axios
      .get(`${apinovel}/login`)
      .then((response) => {
        const loggedInUser = response.data.find(
          (user) => user.user_name === datauser
        );

        if (loggedInUser) {
          console.log("ss");
          setLoading(false);
          setNotuser(true);
          setOpenDialog(true);
        } else {
          handleSubmitfun();
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
        console.error("Error Add in:", error);
        setLoading(false);
      });
  };
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = () => {
    setUserName("");
    setOpenDialog(false);
    setNotuser(false);
  };
  const handleSubmitfun = async () => {
    if (fileimage == null) {
      const fileId = "1TjKQYdbxvD-JKG3kpO5yVUZs-wJdJMNE";
      try {
        await handleAddTag(fileId);
        Swal.close();
        handleClose();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const fileId = await handleUpload();
        await handleAddTag(fileId);
        Swal.close();
        handleClose();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      } finally {
        setLoading(false);
      }
    }
  };
  if (notuser) {
    return (
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Error</DialogTitle>
        <DialogContent>
          <Alert severity="error">{`This "User Name: ${datauser}" has been Already used`}</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else if (loading) {
    return (
      <Container>
        <Dialog
          open={loading}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <LoadingComponent />
          </DialogContent>
        </Dialog>
      </Container>
    );
  }
  // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
  const isFormValid = () => {
    return (
      namef &&
      namel &&
      datagender &&
      data_date_of_birth &&
      datatel &&
      dataaddress &&
      datauser &&
      datagmail &&
      datapass
    );
  };
  return (
    <div>
      <Button onClick={handleOpen}>
        <PersonAddAltIcon color="info" />
      </Button>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle id="update-modal-title" color={"black"}>
          Add Admin
        </DialogTitle>
        <DialogContent>
          <Box>
            <Container>
              <Card>
                {!loading && (
                  <>
                    <Grid container spacing={0} sx={{ width: "100%", mb: -1 }}>
                      <Grid xs={4}>
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
                                <Typography
                                  sx={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  variant="subtitle1"
                                  color="textSecondary"
                                >
                                  <PortraitIcon sx={{ fontSize: 100 }} /> No
                                  image
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
                      <Grid xs={8}>
                        <TextField
                          sx={{ marginLeft: 2 }}
                          fullWidth
                          label="First Name"
                          value={namef}
                          onChange={(e) => setNameF(e.target.value)}
                          variant="outlined"
                          margin="normal"
                        />
                        <TextField
                          sx={{ marginLeft: 2 }}
                          fullWidth
                          label="Last Name"
                          value={namel}
                          onChange={(e) => setNameL(e.target.value)}
                          variant="outlined"
                          margin="normal"
                        />
                      </Grid>
                    </Grid>
                    <TextField
                      fullWidth
                      id="outlined-select-currency"
                      select
                      label={datagender}
                      helperText="Please select your Gender"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label} {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                    <FormControl variant="standard">
                      <InputLabel htmlFor="formatted-text-mask-input">
                        Date of Birth
                      </InputLabel>
                      <Input
                        value={data_date_of_birth}
                        onChange={handleChangeDate}
                        name="textmask"
                        id="formatted-text-mask-input"
                        inputComponent={TextMaskCustom}
                      />
                    </FormControl>
                    <FormControl variant="standard">
                      <InputLabel htmlFor="formatted-text-mask-input-tel">
                        Phone (laos)
                      </InputLabel>
                      <Input
                        value={datatel}
                        onChange={handleChangeTel}
                        name="textmask"
                        id="formatted-text-mask-input-tel"
                        inputComponent={TextMaskCustomTel}
                      />
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Address"
                      value={dataaddress}
                      onChange={(e) => setAddress(e.target.value)}
                      variant="outlined"
                      margin="normal"
                    />

                    <FormControl fullWidth sx={{ mb: 1 }}>
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
                    <FormControl fullWidth sx={{ mb: 1 }}>
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
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
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
                    <Button
                      sx={{ mt: 1, md: 2 }}
                      onClick={handleClose}
                      variant="contained"
                      color="error"
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Card>
            </Container>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
