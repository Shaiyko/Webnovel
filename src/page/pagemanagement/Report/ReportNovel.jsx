import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TablePagination,
  FormControlLabel,
  Checkbox,
  Card,
} from "@mui/material";
import { apinovel } from "../../../URL_API/Apinovels";
import Swal from "sweetalert2";

const NovelReport = () => {
  const [novels, setNovels] = useState([]);
  const [yesup, setYesUpload] = useState(0);
  const [noup, setNoUpload] = useState(0);
  const [st, setSatar] = useState(0);
  const [conti, setContinuously] = useState(0);
  const [compted, setcompleted] = useState(0);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [statusn, setstatusn] = useState("");
  const [pennameSearch, setPennameSearch] = useState("");
  const [nameNovelSearch, setNameNovelSearch] = useState("");
  const [quantitynovel, setQuantitynovel] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const [includeAllData, setIncludeAllData] = useState(true);
  useEffect(() => {
    fetchData();
  }, [
    startDate,
    endDate,
    type,
    uploadStatus,
    statusn,
    pennameSearch,
    nameNovelSearch,page, rowsPerPage,
  ]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apinovel}/reportnovel`, {
        params: {
          startDate,
          endDate,
          type,
          uploadStatus,
          statusn,
          pennameSearch,
          nameNovelSearch,page, rowsPerPage,
        },
      });
      const {
        results,
        yesUploadCount,
        noUploadCount,
        uniqueTypes,
        statusstart,
        statuscontinuously,
        statuscompleted,
        quantitynovel,
      } = response.data;

      setNovels(results);
      setYesUpload(yesUploadCount);
      setNoUpload(noUploadCount);
      setUniqueTypes(uniqueTypes);
      setSatar(statusstart);
      setContinuously(statuscontinuously);
      setcompleted(statuscompleted);
      setQuantitynovel(quantitynovel);
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
    const allDataFlag = includeAllData ? 1 : 0;
    window.location.href = `${apinovel}/exportnovel?startDate=${startDate}&endDate=${endDate}&type=${type}&uploadStatus=${uploadStatus}&statusn=${statusn}&pennameSearch=${pennameSearch}&nameNovelSearch=${nameNovelSearch}&includeAllData=${allDataFlag}`;
    }
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setType("");
    setUploadStatus("");
    setstatusn("");
    setPennameSearch("");
    setNameNovelSearch("");
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Box p={3} boxShadow={10}>
          <Card sx={{ mb: 1 }}>
          <Typography alignContent={"center"} display={"flex"} justifyContent={"center"} variant="h5">Report Novel Data</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
          p: 1,
          border: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
          <TextField
            label="Pen Name"
            variant="outlined"
            value={pennameSearch}
            onChange={(e) => setPennameSearch(e.target.value)}
          />
          <TextField
            label="Name Novel"
            variant="outlined"
            value={nameNovelSearch}
            onChange={(e) => setNameNovelSearch(e.target.value)}
          />
          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <FormControl variant="outlined">
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              label="Type"
            >
              <MenuItem value="">All</MenuItem>
              {uniqueTypes.map((type) => (
                <MenuItem key={type.id_type} value={type.id_type}>
                  {type.name_type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel>Upload Status</InputLabel>
            <Select
              value={uploadStatus}
              onChange={(e) => setUploadStatus(e.target.value)}
              label="Upload Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel>Status</InputLabel>
            <Select
              value={uploadStatus}
              onChange={(e) => setstatusn(e.target.value)}
              label="Upload Status"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="start">start</MenuItem>
              <MenuItem value="continuously">continuously</MenuItem>
              <MenuItem value="completed">completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: "20px", height: 40 }}>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={includeAllData}
                onChange={() => setIncludeAllData(!includeAllData)}
              />
            }
            label="Include All Data"
          />
        </Box>
            <Button variant="contained" color="primary" onClick={fetchData}>
              Apply Filters
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClear}>
              Clear
            </Button>
            <Button variant="contained" color="primary" onClick={handleExport}>
              Export to Excel
            </Button>
          </Box>
          <Box sx={{marginTop: "20px" }}>
            <Box sx={{marginLeft:10}}>
              <Typography>Number of Author :{quantitynovel}</Typography>
            </Box>
            <Box sx={{ display: "flex", marginTop: "20px" }}>
              <Box>
                <Typography>Upload</Typography>
                <Typography>Yes Upload: {yesup}</Typography>
                <Typography>No Upload: {noup}</Typography>
              </Box>
              <Box sx={{ marginLeft: 25 }}>
                <Typography>Status</Typography>
                <Typography>start: {st}</Typography>
                <Typography>continuously: {conti}</Typography>
                <Typography>completed: {compted}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <TableContainer
        sx={{ display: "flex", maxHeight: "700px",mb:1 }}
        component={Paper}
      >
        <Table sx={{ border: 1 }}>
          <TableHead>
            <TableRow>
              <TableCell>Pen Name</TableCell>
              <TableCell>ID Novel</TableCell>
              <TableCell>Name Novel</TableCell>
              <TableCell>Create Date</TableCell>
              <TableCell>Update Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Uploade Status</TableCell>
              <TableCell>Name Type</TableCell>
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
                <TableCell>{novel.uplode}</TableCell>
                <TableCell>{novel.name_type}</TableCell>
                <TableCell>{novel.typenovel_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Table border="1">
          <TableHead>
            <TableRow>
              <TableCell>Name Type</TableCell>
              <TableCell>Type Novel Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uniqueTypes.map((novelType) => (
              <TableRow key={novelType.id_type}>
                <TableCell>{novelType.name_type}</TableCell>
                <TableCell>{novelType.typenovel_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}
      >
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={novels.length} // You might want to get the total count from the server
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

export default NovelReport;
