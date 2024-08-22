import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
  Checkbox,
  FormControlLabel,
  Card,
  Typography,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { apinovel } from "../../../URL_API/Apinovels";

const ReportReading = () => {
  const [novels, setNovels] = useState([]);
  const [genderSearch, setGenderSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusSearch, setStatusSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [includeAllData, setIncludeAllData] = useState(false);
  const [quantitynovel, setQuantitynovel] = useState(0);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, genderSearch, startDate, endDate, statusSearch]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apinovel}/reportreading`, {
        params: {
          genderSearch,
          startDate,
          endDate,
          statusSearch,
        },
      });
      setNovels(response.data);
      setQuantitynovel(response.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleExport = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You export data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Export it!",
    });

    if (result.isConfirmed) {
    try {
      const response = await axios.get(`${apinovel}/exportreading`, {
        params: {
          genderSearch,
          statusSearch,
          startDate,
          endDate,
        },
        responseType: "blob",
      });

      // สร้าง URL สำหรับการดาวน์โหลดไฟล์
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reportreading.xlsx");
      document.body.appendChild(link);
      link.click();

      // ลบลิงก์ออกจาก DOM
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  }
  };

  const handleClear = () => {
    setGenderSearch("");
    setStartDate("");
    setEndDate("");
    setStatusSearch("");
    fetchData();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={3} boxShadow={3}>
      <Card sx={{ mb: 1 }}>
      <Typography alignContent={"center"} display={"flex"} justifyContent={"center"} variant="h5">Report Reding novel Data</Typography>
        <Box sx={{ mb: 2, boxShadow: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              p: 1,
            }}
          >
            <FormControl variant="outlined">
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl variant="outlined">
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel>Type</InputLabel>
              <Select
                sx={{ width: 250 }}
                value={genderSearch}
                onChange={(e) => setGenderSearch(e.target.value)}
                label="Type"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="System">System</MenuItem>
                <MenuItem value="RPG">RPG</MenuItem>
                <MenuItem value="Saifai">Saifai</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                sx={{ width: 250 }}
                value={statusSearch}
                onChange={(e) => setStatusSearch(e.target.value)}
                label="Status"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="start">Start</MenuItem>
                <MenuItem value="continuously">Continuously</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
            
        </Box>
        <Button variant="contained" color="primary" onClick={fetchData}>
              Search
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClear}>
              Clear
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={handleExport}>
              Export to Excel
            </Button>
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeAllData}
                  onChange={(e) => setIncludeAllData(e.target.checked)}
                  name="includeAllData"
                  color="primary"
                />
              }
              label="Include All Data"
            />
          </Box>
        <TableContainer
          sx={{ border: 1, boxShadow: 2, height: "500px" }}
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pen Name</TableCell>
                <TableCell>Novel ID</TableCell>
                <TableCell>Name Novel</TableCell>
                <TableCell>Create Date</TableCell>
                <TableCell>Update Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Score Reading</TableCell>
                <TableCell>Latest Create Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {novels.map((novel) => (
                <TableRow key={novel.id_novel}>
                  <TableCell>{novel.penname}</TableCell>
                  <TableCell>{novel.id_novel}</TableCell>
                  <TableCell>{novel.name_novel}</TableCell>
                  <TableCell>
                    {new Date(novel.createdate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(novel.updatetime).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{novel.status}</TableCell>
                  <TableCell>{novel.name_type}</TableCell>
                  <TableCell>{novel.scorereding}</TableCell>
                  <TableCell>
                    {new Date(novel.latest_createdate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={quantitynovel}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
};

export default ReportReading;
