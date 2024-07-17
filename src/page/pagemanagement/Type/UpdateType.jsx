// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Modal, Button, TextField, Box, Typography } from "@mui/material";
import axios from "axios";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
// eslint-disable-next-line react/prop-types
export default function UpdateType({ selected, setSelected, TypeGet }) {
  const [nameType, setNameType] = useState("");
  const [DataTag, setDataTag] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false, setSelected([]));
  const handleUpdate = () => {
    axios
      .put(`https://dex-api-novel.onrender.com/update/type/${selected[0]}`, {
        name_type: nameType,
      })
      .then((response) => {
        console.log(response.data);
        TypeGet();
        handleClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleGetUpdate = () => {
    axios
      .get(`https://dex-api-novel.onrender.com/typenovel/${selected[0]}`)
      .then((response) => {
        const data = response.data;
        console.log(response.data);
        setDataTag(data[0]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    handleGetUpdate();
  }, []);
  console.log("Data 1:", DataTag);
  return (
    <div>
      <Button onClick={handleOpen}>
        <SecurityUpdateIcon />
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
          {DataTag && (
            <Typography
              variant="h6"
              id="update-modal-title"
              gutterBottom
              color={"black"}
            >
              Update Tag
              {": " + DataTag.id_type}
            </Typography>
          )}
          {DataTag ? (
            <TextField
              fullWidth
              label={"Name Tag: " + DataTag.name_type}
              value={nameType}
              onChange={(e) => setNameType(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          ) : (
            <TextField
              fullWidth
              label="Name Tag?"
              value={nameType}
              onChange={(e) => setNameType(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          )}
          <Button onClick={handleUpdate} variant="contained" sx={{ mr: 2 }}>
            Update
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
