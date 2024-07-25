// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
} from "@mui/material";
import { Modal, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Swal from "sweetalert2";
import LoadingComponent from "../../../../Loading";

const datatype2 = [
  {
    label: "Yes",
  },
  {
    label: "No",
  },
];
// eslint-disable-next-line react/prop-types
const PromulgateContent = ({ UserGet, setSelected, selected }) => {
  // eslint-disable-next-line no-unused-vars
  const [idnovel, setDataIdNovel] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelected([]);
  };

  const [selectedTypeNovel, setSelectedTypeNovel] = useState(null);

  const NovelGet = () => {
    axios
    .get(`http://localhost:5000/view/ep_novelep/${selected[0]}`)
    .then((response) => {
      const data = response.data[0];
      const data2 = {
        label: data.uploade,
      };
      setSelectedTypeNovel(data2);
      //
    })
    
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  useEffect(() => {
    NovelGet();
  }, []);

  const handleSave = () => {
 

    axios
      .put(`http://localhost:5000/update/ep_noveluploade/${selected[0]}`, {
        
        uploade: selectedTypeNovel.label,
      })
      .then((response) => {
        UserGet();
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  // Filter out selected options to prevent duplicates

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      await handleSave();
      UserGet();
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
  console.log("UP0",selectedTypeNovel)
  return (
    <div>
      <Button onClick={handleOpen}>Promulgate Chapter</Button>
      <Modal
        open={open}
        aria-labelledby="update-modal-title"
        aria-describedby="update-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "5%",
            left: "30%",
            right: "20%",
            width: 300,
            overflow: "auto",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            px: 4,
            pb: 3,
          }}
        >
          {loading && <LoadingComponent />}
          {error && <p>Error: {error.message}</p>}
          {!loading && !error && (
            <>
              <Typography
                variant="h6"
                id="update-modal-title"
                gutterBottom
                color={"black"}
              >
                Promulgate Novel
              </Typography>
              <Grid container spacing={0} sx={{ width: "100%", mb: 1 }}>
                <Grid sx={{ display: "flex", marginTop: 2 }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-type"
                    options={datatype2}
                    getOptionLabel={(option) => option.label}
                    sx={{ width: "100%" }}
                    value={selectedTypeNovel}
                    onChange={(event, newValue) => {
                      setSelectedTypeNovel(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        sx={{ width: "200px",marginLeft:"20%" }}
                        {...params}
                        label="Promulgate Novel"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Button
                sx={{ fontSize: "16px", mb: 1 }}
                size="small"
                color="success"
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                fullWidth
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

export default PromulgateContent;
