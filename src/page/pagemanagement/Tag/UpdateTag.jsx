// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Modal, Button, TextField, Box, Typography } from "@mui/material";
import axios from "axios";
import SecurityUpdateIcon from "@mui/icons-material/SecurityUpdate";
import { apinovel } from "../../../URL_API/Apinovels";
import Swal from "sweetalert2";
// eslint-disable-next-line react/prop-types
export default function UpdateTag({ selected, setSelected, UserGet }) {
  const [nameTaek, setNameTaek] = useState("");
  const [DataTag, setDataTag] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false, setSelected([]));
  const handleUpdate = () => {
    axios
      .put(`${apinovel}/update/tags/${selected[0]}`, {
        name_taek: nameTaek,
      })
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
         Swal.fire({
          title: "Add success",
          icon: "success",
        });
        UserGet();
        handleClose();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleGetUpdate = () => {
    axios
      .get(`${apinovel}/taeknovel/id_tag/${selected[0]}`)
      .then((response) => {
        
        const data = response.data;
        setDataTag(data[0]);
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
              {": " + DataTag.id_taek}
            </Typography>
          )}
          {DataTag ? (
            <TextField
              fullWidth
              label={"Name Tag: " + DataTag.name_taek}
              value={nameTaek}
              onChange={(e) => setNameTaek(e.target.value)}
              variant="outlined"
              margin="normal"
            />
          ) : (
            <TextField
              fullWidth
              label="Name Tag?"
              value={nameTaek}
              onChange={(e) => setNameTaek(e.target.value)}
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