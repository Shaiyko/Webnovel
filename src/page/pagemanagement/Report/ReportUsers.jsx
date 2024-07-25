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
} from "@mui/material";

const ReportUsers = () => {
  const [users, setUsers] = useState([]);
  const [genderm, setGenderM] = useState(0);
  const [genderf, setGenderF] = useState(0);
  const [qauthor, setQuantityA] = useState(0);
  const [pennameSearch, setPennameSearch] = useState("");
  const [genderSearch, setGenderSearch] = useState("");
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, pennameSearch, genderSearch]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/reportuser", {
        params: {
          pennameSearch,
          genderSearch,
          page,
          rowsPerPage,
        },
      });
      const {
        results ,genderm,genderf,quantityu
      } = response.data;
      setUsers(results);
      setGenderM(genderm);
      setGenderF(genderf);
      setQuantityA(quantityu);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleExport = () => {
    window.location.href = `http://localhost:5000/exportuser?pennameSearch=${pennameSearch}&genderSearch=${genderSearch}`;
  };

  const handleClear = () => {
    setPennameSearch("");
    setGenderSearch("")
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
      <Box border={1} mb={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",marginTop:1
        }}
      >
        <TextField
          label="Search by Pen Name"
          variant="outlined"
          value={pennameSearch}
          onChange={(e) => setPennameSearch(e.target.value)}
          sx={{ marginRight: "10px" }}
        />
         <FormControl sx={{width:"150px"}} variant="outlined">
            <InputLabel>Gender</InputLabel>
            <Select
              value={genderSearch}
              onChange={(e) => setGenderSearch(e.target.value)}
              label="Upload Status"
              >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
          
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
      </Box>
      <Box sx={{ display: "flex", marginTop: "20px",justifyContent:"center" }}>
        <Box>
          <Typography>Number of Author :{qauthor}</Typography>
          <Typography>Gender</Typography>
          <Typography>Male : {genderm}</Typography>
          <Typography>Female : {genderf}</Typography>
        </Box>
        </Box>
        </Box>
      <TableContainer sx={{border:1}} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID User</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gmail</TableCell>
              <TableCell>User Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id_user}>
                <TableCell>{user.id_user}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.year}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.gmail}</TableCell>
                <TableCell>{user.user_name}</TableCell>
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
          count={users.length} // You might want to get the total count from the server
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      
    </Container>
  );
};

export default ReportUsers;
