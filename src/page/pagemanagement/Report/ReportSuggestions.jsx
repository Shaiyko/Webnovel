import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
  TextField,
  Button,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Card,
} from "@mui/material";
import Swal from "sweetalert2";
import { apinovel } from "../../../URL_API/Apinovels";

const ReportUsers = () => {
  const [reports, setReports] = useState([]);
  const [typerepostg, setTyperepostG] = useState(0);
  const [typereposte, setTyperepostE] = useState(0);
  const [typereposts, setTyperepostS] = useState(0);
  const [typerepostr, setTyperepostR] = useState(0);
  const [quantityu, setQuantityU] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [genderSearch, setReportTypeSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, genderSearch, startDate, endDate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apinovel}/suggestions`, {
        params: {
          genderSearch,
          startDate,
          endDate,
          page,
          rowsPerPage,
        },
      });
      const {
        results,
        typerepostg,
        typereposte,
        typereposts,
        typerepostr,
        quantityu,
      } = response.data;
      setReports(results);
      setTyperepostG(typerepostg);
      setTyperepostE(typereposte);
      setTyperepostS(typereposts);
      setTyperepostR(typerepostr);
      setQuantityU(quantityu);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleExport = () => {
    const result = Swal.fire({
      title: "Are you sure?",
      text: "You export data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Export it!",
    });

    if (result.isConfirmed) {
    window.location.href = `${apinovel}/exportsuggestions?genderSearch=${genderSearch}&startDate=${startDate}&endDate=${endDate}`;
    }
  };

  const handleClear = () => {
    setReportTypeSearch("");
    setStartDate("");
    setEndDate("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ boxShadow: 2, p: 2 }}>
      <Card sx={{ mb: 1 }}>
      <Typography alignContent={"center"} display={"flex"} justifyContent={"center"} variant="h5">Report Suggestion novel Data</Typography>
        <Box boxShadow={3} p={1} mb={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
              marginTop: 1,
            }}
          >
            <TextField
              label="Start Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              sx={{ marginRight: "10px" }}
            />
            <TextField
              label="End Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              sx={{ marginRight: "10px" }}
            />
            <FormControl sx={{ width: "250px" }} variant="outlined">
              <InputLabel>Type of Report</InputLabel>
              <Select
                value={genderSearch}
                onChange={(e) => setReportTypeSearch(e.target.value)}
                label="Type of Report"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="Errors of the Novel"></MenuItem>
                <MenuItem value="Errors of the Novel">
                  Errors of the Novel
                </MenuItem>
                <MenuItem value="Suggestions for this Novel">
                  Suggestions for this Novel
                </MenuItem>
                <MenuItem value="Report Abuse">Report Abuse</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", gap: "20px", height: 40 }}>
              <Button variant="contained" color="primary" onClick={fetchData}>
                Apply Filters
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleExport}
              >
                Export to Excel
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <Box>
            <Typography>Number of Reports: {quantityu}</Typography>
            <Typography>Report Types:</Typography>
            <Typography>General: {typerepostg}</Typography>
            <Typography>Errors of the Novel: {typereposte}</Typography>
            <Typography>Suggestions for this Novel: {typereposts}</Typography>
            <Typography>Report Abuse: {typerepostr}</Typography>
          </Box>
        </Box>
        <TableContainer sx={{ border: 1, height: "500px" }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>ID Novel</TableCell>
                <TableCell>Type of Report</TableCell>
                <TableCell>Novel Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>
                    {new Date(report.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{report.reason}</TableCell>
                  <TableCell>{report.user_name}</TableCell>
                  <TableCell>{report.id_novel}</TableCell>
                  <TableCell>{report.typerepost}</TableCell>
                  <TableCell>{report.name_novel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={quantityu}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default ReportUsers;
