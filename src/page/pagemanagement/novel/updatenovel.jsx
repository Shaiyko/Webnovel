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
} from "@mui/material";
import { Modal, Box, Typography, Card, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Swal from "sweetalert2";
import "../css/stylesloading.css";

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
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

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
      const response = await axios.post(
        "https://uploadfile-api-huw0.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAvatar(
        `https://drive.google.com/thumbnail?id=${response.data.fileId}`
      );
      return response.data.fileId;
    } catch (error) {
      setAvatar(`Error uploading file: ${error.message}`);
      throw error;
    }
  };
  const [datatag, setTag] = useState([]);
  const [datanovel, setTagnovel] = useState({});
  const [datatype2, setType2] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedTypeNovel, setSelectedTypeNovel] = useState(null);

  const handleGetUpdate = () => {
    axios
      .get(`http://localhost:5000/taeknovel`)
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
      .get(`http://localhost:5000/view/togetherjoin/${selected[0]}`)
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
      .get(`http://localhost:5000/typenovel`)
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
    axios
      .get(`http://localhost:5000/novelall2/${selected[0]}`)
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
        setAuthor(data.id_author);
        setDescription(data.description);
        setAvatar(data.image_novel);
        setStatus(data.status);
        setDate(data.createdate);
        setupdatetime(data.updatetime);
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
      .post(`http://localhost:5000/create/together`, {
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
      })
      .catch((error) => {
        console.error("Error updating type:", error);
      });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const fileId = fileimage
        ? await handleUpload()
        : "1p_xAKSNXylMpPPKdeB30KWe8BtYjdHJd";
     await handleUpdateNovel(fileId);
      await handleSave();
    
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
      <Button onClick={handleOpen}>Update Novel</Button>
      <Modal
        open={open}
        aria-labelledby="update-modal-title"
        aria-describedby="update-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "5%",
            left: "10%",
            right: "10%",
            width: 900,
            overflow: "auto",
            height: 700,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            px: 4,
            pb: 3,
          }}
        >
           {!datanovel && <div className="loading">Loading...</div>}
          {loading && <div className="loading">Loading...</div>}
          {error && <p>Error: {error.message}</p>}
          {!loading && !error && (
            <>
              <Typography
                variant="h6"
                id="update-modal-title"
                gutterBottom
                color={"black"}
              >
                Update Novel
              </Typography>
              <Grid container spacing={0} sx={{ width: "70%", mb: -1 }}>
                <Grid item xs={4}>
                  <Card>
                    <Button
                      variant="contained"
                      component="label"
                      sx={{ mb: 2 }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ height: "250px" }}
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
                <Grid item xs={8}>
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
                  <Grid sx={{ display: "flex", marginTop: 2 }}>
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
                  </Grid>
                  <Grid sx={{ display: "flex", marginTop: 2 }}>
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
                  </Grid>
                </Grid>
              </Grid>
              <Grid sx={{ marginTop: 5,mb:2 }}>
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
                sx={{ fontSize: "16px",mb:1 }}
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
                onClick={handleClose}
                variant="contained"
                color="error"
                fullWidth
              >
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Updatenovel;
