// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Modal, Button, TextField, Box, Typography } from "@mui/material";
import axios from "axios";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
export default function AddType({ TypeGet }) {
  const [nameType, setNameType] = useState("");
  const [maxIdType, setMaxIdType] = useState(0);
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    TypeGet();
  };

  const handleAddTag = () => {
    Swal.fire({
      position: "top-end",
      title: 'Adding tag...',
      text: 'Please wait a moment.',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    axios
      .post(
        "https://dex-api-novel.onrender.com/create/type",
        {
          id_type: maxIdType + 1,
          name_type: nameType
        }
      )
      .then((response) => {
        console.log("Add succeeded", response.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tag has been added",
          showConfirmButton: false,
          timer: 1500
        });
        setNameType("");
        TypeGet();
        handleGetUpdate();
        handleClose();
      })
      .catch((error) => {
        console.error("Error registering:", error);
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });
  };

  const handleGetUpdate = () => {
    axios
      .get(`https://dex-api-novel.onrender.com/typenovel`)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          const maxId = Math.max(...data.map(tag => tag.id_type));
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
      <Button onClick={handleOpen}>
        <PersonAddAltIcon color="info" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="update-modal-title"
        aria-describedby="update-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            id="update-modal-title"
            gutterBottom
            color={"black"}
          >
            Add Type
          </Typography>
          <TextField
            fullWidth
            disabled
            id="outlined-disabled"
            label="Next ID Type"
            value={maxIdType + 1}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Name Type"
            value={nameType}
            onChange={(e) => setNameType(e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <Button onClick={handleAddTag} variant="contained" sx={{ mr: 2 }}>
            Add Tag
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
