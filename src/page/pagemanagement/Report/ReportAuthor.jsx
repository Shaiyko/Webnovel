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
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  FormControlLabel,
  Checkbox
} from "@mui/material";

const ReportAuthor = () => {
  const [authors, setAuthors] = useState([]);
  const [genderm, setGenderM] = useState(0);
  const [genderf, setGenderF] = useState(0);
  const [qauthor, setQuantityA] = useState(0);
  const [pennameSearch, setPennameSearch] = useState("");
  const [genderSearch, setGenderStatus] = useState("");
  const [includeAllData, setIncludeAllData] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, pennameSearch, genderSearch]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/reportauthor", {
        params: {
          pennameSearch,
          genderSearch,
          page,
          rowsPerPage,
        },
      });
      const { results, genderm, genderf, quantity } = response.data;
      setGenderM(genderm);
      setGenderF(genderf);
      setQuantityA(quantity);
      setAuthors(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleExport = () => {
    const allDataFlag = includeAllData ? 1 : 0;
    window.location.href = `http://localhost:5000/exportauthor?pennameSearch=${pennameSearch}&genderSearch=${genderSearch}&includeAllData=${allDataFlag}`;
  };

  const handleClear = () => {
    setPennameSearch("");
    setGenderStatus("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
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
          <FormControl sx={{ width: "150px" }} variant="outlined">
            <InputLabel>Gender</InputLabel>
            <Select
              value={genderSearch}
              onChange={(e) => setGenderStatus(e.target.value)}
              label="Gender"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: "20px", height: 40 }}>
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
          <Box sx={{ display: "flex", marginTop: "20px" }}>
            <Box>
              <Typography>Number of Author: {qauthor}</Typography>
              <Typography>Gender</Typography>
              <Typography>Male: {genderm}</Typography>
              <Typography>Female: {genderf}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <TableContainer sx={{ display: "flex" }} component={Paper}>
        <Table sx={{ border: 1 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID Author</TableCell>
              <TableCell>Real Name</TableCell>
              <TableCell>Pen Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Gmail</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Contact Channels</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>Continuously</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>Number of Novels Created</TableCell>
              <TableCell>Latest Novel Create date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author) => (
              <TableRow key={author.id_author}>
                <TableCell>{author.id_author}</TableCell>
                <TableCell>{author.realname}</TableCell>
                <TableCell>{author.penname}</TableCell>
                <TableCell>{author.gender}</TableCell>
                <TableCell>{author.date_of_birth}</TableCell>
                <TableCell>{author.address}</TableCell>
                <TableCell>{author.gmail}</TableCell>
                <TableCell>{author.user_name}</TableCell>
                <TableCell>{author.contact_channels}</TableCell>
                <TableCell>{author.start}</TableCell>
                <TableCell>{author.continuously}</TableCell>
                <TableCell>{author.completed}</TableCell>
                <TableCell>{author.id_author_count}</TableCell>
                <TableCell>
                  {new Date(author.latest_createdate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={authors.length} // You might want to get the total count from the server
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  );
};

export default ReportAuthor;
