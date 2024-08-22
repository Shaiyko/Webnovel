// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Chip,
  FormControl,
  InputLabel,
  NativeSelect,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Modal, Box, Typography, Card, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Swal from "sweetalert2";
import LoadingComponent from "../../../Loading";
import { apinovel, apiupfile } from "../../../URL_API/Apinovels";

// eslint-disable-next-line react/prop-types
const Updatenovel = ({ UserGet, setSelected, selected }) => {
  const [datatime, setupdatetime] = useState("");
  const [datadate, setDate] = useState("");
  const [datastatus, setStatus] = useState("");
  const [dataauthor, setAuthor] = useState("");
  const [nameN, setNameN] = useState("");
  const [description, setDescription] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [idnovel, setDataIdNovel] = useState();
  const [image, setImage] = useState(null);
  const [fileimage, setFile] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [parentFileId, setParentFileId] = useState(
    "1oA5-0TW92UHmH8KJNMBX8NrH1BNSkRTU"
  );
  // eslint-disable-next-line no-unused-vars
  const [dataimage, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  //
  const [datatag, setTag] = useState([]);
  const [datanovel, setTagnovel] = useState([]);
  const [datatype2, setType2] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedTypeNovel, setSelectedTypeNovel] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelected([]);
  };
  // Date
  const formatDateTime = (datatime) => {
    const date = new Date(datatime);
    return date.toLocaleString(); // แสดง วันเดือนปี เวลา
  };

  const formatDate = (datadate) => {
    const date = new Date(datadate);
    return date.toLocaleDateString(); // แสดง วันเดือนปี
  };
  //********* */
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
    formData.append("name", nameN);
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

  const handleGetUpdate = () => {
    axios
      .get(`${apinovel}/taeknovel`)
      .then((response) => {
        const data = response.data.map((item) => ({
          id: item.id_taek,
          label: item.name_taek,
        }));
        setTag(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleGetUpdate2 = () => {
    axios
      .get(`${apinovel}/view/togetherjoin/${selected[0]}`)
      .then((response) => {
        const data = response.data.map((item) => ({
          id: item.id_taek,
          label: item.name_taek,
        }));
        setSelectedTypes(data); // Set the initial selected types
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleGetType = () => {
    axios
      .get(`${apinovel}/typenovel`)
      .then((response) => {
        const data = response.data.map((item) => ({
          id: item.id_type,
          label: item.name_type,
        }));
        setType2(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const NovelGet = () => {
    setLoading(true);
    axios
      .get(`${apinovel}/novelall2/${selected[0]}`)
      .then((response) => {
        const data = response.data[0];
        const data2 = {
          id: data.id_type,
          label: data.name_type,
        };
        setSelectedTypeNovel(data2);
        setTagnovel(data);
        //
        setNameN(data.name_novel);
        setAuthor(data.penname);
        setDescription(data.description);
        setAvatar(data.image_novel);
        setStatus(data.status);
        setDate(data.createdate);
        setupdatetime(data.updatetime);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    NovelGet();
    handleGetType();
    handleGetUpdate();
    handleGetUpdate2();
  }, []);

  const handleSave = () => {
    const dataToSave = selectedTypes.map((item) => ({
      id_novel: selected,
      id_taek: item.id,
    }));

    axios
      .post(`${apinovel}/create/together`, {
        dataToSave,
        id_novel: selected,
      })
      .then((response) => {
        console.log("Data saved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });

    if (selectedTypeNovel && selectedTypeNovel.id !== datanovel.id_type) {
      axios
        .post(`http://localhost:5000/update/novel/type`, {
          id_novel: selected,
          id_type: selectedTypeNovel.id,
        })
        .then((response) => {
          console.log("Type updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating type:", error);
        });
    }
    UserGet();
  };

  const handleDelete = (tag) => {
    const newSelectedTypes = selectedTypes.filter((item) => item.id !== tag.id);
    setSelectedTypes(newSelectedTypes);

    axios
      .post(`http://localhost:5000/delete/together`, {
        id_novel: selected,
        id_taek: tag.id,
      })
      .then((response) => {
        console.log("Data deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  // Filter out selected options to prevent duplicates
  const availableOptions = datatag.filter(
    (option) =>
      !selectedTypes.some((dataseleted) => dataseleted.id === option.id)
  );
  const handleUpdateNovel = (fileId) => {
    axios
      .put(`http://localhost:5000/update/novel/${selected[0]}`, {
        name_novel: nameN,
        description: description,
        status: datastatus,
        image_novel: `https://drive.google.com/thumbnail?id=${fileId}`,
      })
      .then((response) => {
        console.log("Type updated successfully:", response.data);
        UserGet();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Novel has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error updating type:", error);
      });
  };
  const handleUpdateNovel2 = (avatar) => {
    axios
      .put(`${apinovel}/update/novel/${selected[0]}`, {
        name_novel: nameN,
        description: description,
        status: datastatus,
        image_novel: avatar,
      })
      .then((response) => {
        console.log("Type updated successfully:", response.data);
        UserGet();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Novel has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error updating type:", error);
      });
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (fileimage == null) {
      const avatar = dataimage;
      try {
        await handleUpdateNovel2(avatar);
        await handleSave();
        Swal.close();
        handleClose();
      } catch (error) {
        handleClose();
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
        await handleUpdateNovel(fileId);
        await handleSave();
        Swal.close();
        handleClose();
      } catch (error) {
        handleClose();
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
  return (
    <div>
      <Button onClick={handleOpen}>Update Novel</Button>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle id="update-modal-title" color={"black"}>
          Add Author
        </DialogTitle>
        <DialogContent>
          <Box>
            <LoadingComponent loading={loading} />
            <>
              <Grid container spacing={0} sx={{ width: "100%", mb: -1 }}>
                <Grid item xs={4} md={5}>
                  <Card>
                    <Button
                      variant="contained"
                      component="label"
                      sx={{ mb: 2 }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ height: "250px",width:"100%" }}
                        image={image ? image : dataimage}
                        alt="Uploaded Image"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                      />
                    </Button>
                  </Card>
                </Grid>
                <Grid item xs={8} md={7}>
                  <TextField
                    fullWidth
                    style={{ width: "100%", marginLeft: 20 }}
                    label="Name Novel"
                    variant="outlined"
                    value={nameN}
                    margin="normal"
                    onChange={(e) => setNameN(e.target.value)}
                  />
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    style={{ width: "100%", marginLeft: 20 }}
                  >
                    author: {dataauthor}
                  </Typography>
                  <Box sx={{ display: "flex", marginTop: 2 }}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-type"
                      options={datatype2}
                      getOptionLabel={(option) => option.label}
                      sx={{ width: "70%", marginLeft: 2 }}
                      value={selectedTypeNovel}
                      onChange={(event, newValue) => {
                        setSelectedTypeNovel(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Type Novel"
                          variant="outlined"
                        />
                      )}
                    />
                    <FormControl>
                      <InputLabel
                        variant="standard"
                        htmlFor="uncontrolled-native"
                      >
                        Status
                      </InputLabel>
                      <NativeSelect
                        defaultValue={datastatus}
                        inputProps={{
                          name: "status",
                          id: "uncontrolled-native",
                        }}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value={"start"}>start</option>
                        <option value={"continuously"}>continuously</option>
                        <option value={"completed"}>completed</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                  <Box sx={{ display: "flex", marginTop: 2 }}>
                    <Typography
                      variant="h7"
                      color="text.secondary"
                      style={{ width: "100%", marginLeft: 20 }}
                    >
                      Create date: {formatDate(datadate)}
                    </Typography>
                    <Typography
                      variant="h7"
                      color="text.secondary"
                      style={{ width: "100%", marginLeft: 20 }}
                    >
                      Update Time: {formatDateTime(datatime)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid sx={{ marginTop: 5, mb: 2 }}>
                <Autocomplete
                  multiple
                  disablePortal
                  id="combo-box-tag"
                  options={availableOptions}
                  getOptionLabel={(option) => option.label}
                  value={selectedTypes}
                  onChange={(event, newValue) => {
                    setSelectedTypes(newValue);
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={option.id}
                        label={option.label}
                        {...getTagProps({ index })}
                        onDelete={() => handleDelete(option)}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Tag" variant="outlined" />
                  )}
                />
                <TextField
                  sx={{ marginTop: 2, width: "100%" }}
                  id="outlined-multiline-static"
                  label="Description"
                  value={description}
                  multiline
                  rows={4}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Button
                sx={{ fontSize: "16px", mb: 1 }}
                size="small"
                color="success"
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
              >
                Update
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
};

export default Updatenovel;
