import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Swal from "sweetalert2";
import "../css/stylesloading.css";
import LoadingComponent from "../../../Loading";
import { apinovel, apiupfile } from "../../../URL_API/Apinovels";
const CreateNovelForm = ({ UserGet, id_author }) => {
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
  const [open, setOpen] = useState(false);

  const [penname, setlogged] = useState(null);
  const [auid, setUserId] = useState(null);
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      if (loggedInUser.status === "user") {
        const loggedInUserP = JSON.parse(localStorage.getItem("userP"));
        setUserId(loggedInUserP.id_user);
        setlogged(loggedInUserP.user_name);
      } else if (loggedInUser.status === "author") {
        const loggedInAuthor = JSON.parse(localStorage.getItem("author"));
        setUserId(loggedInAuthor.id_author);
        setlogged(loggedInAuthor.user_name);
      } else if (loggedInUser.status === "admin") {
        setUserId(1);
        setlogged("admin");
      }
    }
  }, []);
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
  useEffect(() => {
    handleGetmaxID();
    handleGetType();
    handleGetTag();
  }, []);
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

  const handleAddNovel = async (fileId) => {
    try {
      const response = await axios.post(`${apinovel}/create/novel`, {
        id_novel: maxid + 1,
        id_author: auid,
        name_novel: nameN,
        description: description,
        status: "start",
        uplode: "No",
        image_novel: `https://drive.google.com/thumbnail?id=${fileId}`,
        id_type: selectedTypes ? selectedTypes.id : null,
      });

      const insertId = response.data.insertId;
      console.log("sss", insertId);
      return insertId;
    } catch (error) {
      console.error("There was an error creating the novel!", error);
      throw error;
    }
  };

  const handleSaveTag = (insertId) => {
    if (insertId) {
      axios
        .get(`${apinovel}/view/novelstag/${insertId}`)
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
              .post(`${apinovel}/create/together`, { dataToSave })
              .then((response) => {
                console.log("Data saved successfully:", response.data);
                Swal.fire("Add Ok");
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
      handleClose();
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
      .get(`${apinovel}/novel`)
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
      .get(`${apinovel}/typenovel`)
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
        <AddIcon color="info" />
      </Button>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle id="update-modal-title" color={"black"}>
          Add Novel
        </DialogTitle>
        <DialogContent>
          <Box>
            <LoadingComponent loading={loading} />

            <Grid container spacing={0} sx={{ width: "100%", mb: -1 }}>
              <Grid item xs={4} md={5}>
                <Card>
                  <Button variant="contained" component="label" sx={{ mb: 2 }}>
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
              <Grid item xs={8} md={7}>
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
                  author:{penname}
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
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateNovelForm;
