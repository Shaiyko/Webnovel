// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import * as XLSX from "xlsx";
import { apinovel } from "../../../URL_API/Apinovels";
import LoadingComponent from "../../../Loading";

// eslint-disable-next-line react/prop-types
export default function ExportViewAuthor({
  selected,
  setSelected,
  numSelected,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSelected([]);
    setOpen(false);
  };

  const exportToExcel = (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admins");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const handleExportSelectedAdmins = () => {
    setLoading(true);
    axios
      .get(`${apinovel}/view/exportauthor`, {
        params: { id: selected },
      })
      .then((response) => {
        exportToExcel(response.data, "selected_admins");

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleExportAllAdmins = () => {
    setLoading(true);
    axios
      .get(`${apinovel}/view/author`)
      .then((response) => {
        exportToExcel(response.data, "all_admins");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Export
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="export-admin-data-modal-title"
        aria-describedby="export-admin-data-modal-description"
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
          <Typography variant="h7" component="h2">
            Export Admin Data
          </Typography>
          <LoadingComponent loading={loading} />
            <div>
              {numSelected > 0 ? (
                <Button
                  onClick={handleExportSelectedAdmins}
                  variant="contained"
                  color="success"
                  sx={{ mt: 2 }}
                >
                  Export Selected Admins
                </Button>
              ) : (
                <Button
                  onClick={handleExportAllAdmins}
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Export All Admins
                </Button>
              )}
              <Button
                onClick={handleClose}
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
              >
                Close
              </Button>
            </div>
  
        </Box>
      </Modal>
    </div>
  );
}
