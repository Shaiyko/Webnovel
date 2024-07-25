import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Chip } from "@mui/material";
import { Modal, Box, Typography, Card, CardMedia } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Swal from "sweetalert2";
import "../css/stylesloading.css";
const CreateNovelForm = ({ UserGet,id_author }) => {

  const [nameN, setNameN] = useState("");
  const [description, setDescription] = useState("");
  const [maxid, setMaxIdType] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [idnovel, setDataIdNovel] = useState();
  const [datatype, setType] = useState([]);
  const [datatag, setTag] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(null);
  const [selectedTag, setSelectedTag] = useState([]);
  const [image, setImage] = useState(null);
  const [fileimage, setFile] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [parentFileId, setParentFileId] = useState(
    "1oA5-0TW92UHmH8KJNMBX8NrH1BNSkRTU"
  );
  // eslint-disable-next-line no-unused-vars
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearText();
  };
  const clearText = () => {
    setNameN("");
    setDescription("");
    setSelectedTypes([]);
    setSelectedTag([]);
   
  };
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

  const handleAddNovel = async (fileId) => {
    try {
      const response = await axios.post("http://localhost:5000/create/novel", {
        id_novel: maxid + 1,
        id_author: id_author,
        name_novel: nameN,
        description: description,
        status: "start",
        uplode: "No",
        image_novel: `https://drive.google.com/thumbnail?id=${fileId}`,
        id_type: selectedTypes ? selectedTypes.id : null,
      });

      const insertId = response.data.insertId;
      return insertId;
    } catch (error) {
      console.error("There was an error creating the novel!", error);
      throw error;
    }
  };

  const handleSaveTag = (insertId) => {
    if (insertId) {
      axios
        .get(`http://localhost:5000/view/novelstag/${insertId}`)
        .then((response) => {
          const data = response.data[0];
          const dataID = data.id_novel;

          setDataIdNovel(dataID);
          if (dataID) {
            const dataToSave = selectedTag.map((item) => ({
              id_novel: dataID,
              id_taek: item.id,
            }));

            axios
              .post(`http://localhost:5000/create/together`, { dataToSave })
              .then((response) => {
                console.log("Data saved successfully:", response.data);
              })
              .catch((error) => {
                console.error("Error saving data:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const fileId = fileimage
        ? await handleUpload()
        : "1p_xAKSNXylMpPPKdeB30KWe8BtYjdHJd";
      const insertId = await handleAddNovel(fileId);
      await handleSaveTag(insertId);
      Swal.close();
      handleClose();
      UserGet();
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

  const handleGetmaxID = () => {
    axios
      .get(`https://dex-api-novel.onrender.com/novel`)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          const maxId = Math.max(...data.map((tag) => tag.id_novel));
          setMaxIdType(maxId);
        } else {
          setMaxIdType(0);
        }
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
        setType(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleGetTag = () => {
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

  useEffect(() => {
    handleGetType();
    handleGetTag();
    handleGetmaxID();
  }, []);

  const isFormValid = () => {
    return nameN && description && selectedTag.length > 0;
  };

  var idnovel2 = 1;
  const dataToSave = selectedTag.map((item) => ({
    id_novel: idnovel2,
    id_taek: item.id,
  }));
  console.log("ID Tag", dataToSave);
  return (
    <div>
      <Button onClick={handleOpen}>
        <PersonAddAltIcon color="info" />
      </Button>
      <Modal
        open={open}
        aria-labelledby="update-modal-title"
        aria-describedby="update-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "5%",
            marginLeft: "20%",
            marginRight: "10%",
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
                Add Novel
              </Typography>
              <Grid container spacing={0} sx={{ width: "70%", mb: -1 }}>
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
                          sx={{ height: "250px" }}
                          image={image}
                          alt="Uploaded Image"
                        />
                      ) : (
                        <CardMedia
                          component="img"
                          sx={{ height: "250px" }}
                          image={`https://drive.google.com/thumbnail?id=1p_xAKSNXylMpPPKdeB30KWe8BtYjdHJd`}
                          alt="Uploaded Image"
                        />
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
                    style={{ width: "100%", marginLeft: 20 }}
                    label="Name Novel"
                    variant="outlined"
                    margin="normal"
                    onChange={(e) => setNameN(e.target.value)}
                  />
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    style={{ width: "100%", marginLeft: 20 }}
                  >
                    author:
                  </Typography>
                  <Grid sx={{ display: "flex", marginTop: 2 }}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-type"
                      options={datatype}
                      getOptionLabel={(option) => option.label}
                      sx={{ width: "70%", marginLeft: 2 }}
                      value={selectedTypes}
                      onChange={(event, newValue) => {
                        setSelectedTypes(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Type Novel"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid sx={{ marginTop: 5 }}>
                <Autocomplete
                  multiple
                  disablePortal
                  id="combo-box-tag"
                  options={datatag}
                  getOptionLabel={(option) => option.label}
                  value={selectedTag}
                  onChange={(event, newValue) => {
                    setSelectedTag(newValue);
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={option.id}
                        label={option.label}
                        {...getTagProps({ index })}
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
                  multiline
                  rows={4}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Button
                variant="contained"
                onClick={handleSubmit}
                color="info"
                sx={{ mt: 3 }}
                fullWidth
                disabled={!isFormValid()}
              >
                Add Novel
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

export default CreateNovelForm;
