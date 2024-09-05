import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import Swal from "sweetalert2";
import { apinovel } from "../../../../URL_API/Apinovels";
import ViewS from "./view";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "id", numeric: false, disablePadding: true, label: "ID" },
  { id: "name user", numeric: true, disablePadding: false, label: "User Name" },
  { id: "creation date", numeric: true, disablePadding: false, label: "Date" },

  {
    id: "namenovel",
    numeric: true,
    disablePadding: false,
    label: "Name Novel",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type Suggestions",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all rows" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const {
    numSelected,
    searchQuery,
    handleSearchChange,
    selected,
    setSelected,
    UserGet,
    startDate,
    endDate,
    handleDateChange,
    handleClera,
    handleType,
    genderSearch,
  } = props;

  const DeleteTag = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        // Make the delete request
        const response = await axios.delete(`${apinovel}/delete/report`, {
          data: {
            type_ids: selected,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);

        // Show success alert
        await Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        // Perform other actions after successful deletion
        UserGet();
        setSelected([]);
      } catch (error) {
        console.error("Error:", error);
        // Optionally, show an error alert
        await Swal.fire({
          title: "Error!",
          text: "There was an issue deleting your file.",
          icon: "error",
        });
      }
    }
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Suggestions
        </Typography>
      )}
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginRight: 15, width: 300 }}
      />
      <FormControl sx={{ width: "500px" }} variant="outlined">
        <InputLabel>Type of Report</InputLabel>
        <Select
          value={genderSearch}
          onChange={handleType}
          label="Type of Report"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="General">General</MenuItem>
          <MenuItem value="Errors of the Novel"></MenuItem>
          <MenuItem value="Errors of the Novel">Errors of the Novel</MenuItem>
          <MenuItem value="Suggestions for this Novel">
            Suggestions for this Novel
          </MenuItem>
          <MenuItem value="Report Abuse">Report Abuse</MenuItem>
        </Select>
      </FormControl>
      <TextField
        variant="outlined"
        type="date"
        label="Start Date"
        value={startDate}
        onChange={(e) => handleDateChange(e, "start")}
        sx={{ marginRight: 5, width: 300 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        variant="outlined"
        type="date"
        label="End Date"
        value={endDate}
        onChange={(e) => handleDateChange(e, "end")}
        sx={{ marginRight: 5, width: 300 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button color="error" onClick={handleClera}>
        Clear
      </Button>
      {numSelected > 0 ? (
        <Tooltip title="Delete" sx={{ marginRight: 2 }}>
          <IconButton onClick={DeleteTag}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Insert Data"></Tooltip>
      )}
      {numSelected === 1 ? (
        <Tooltip title="View and Create Chapter">
          <IconButton>
            <ViewS selected={selected} setSelected={setSelected} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add Data"></Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  searchQuery: PropTypes.string.isRequired,
  genderSearch: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  UserGet: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleClera: PropTypes.func.isRequired,
  handleType: PropTypes.func.isRequired,
};

export default function Tablemyletter({ id_author }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderSearch, setReportTypeSearch] = useState("");
  const [dataTag, setTagnovel] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Format the date as "dd/mm/yyyy"
  const formatDate = (createdate) => {
    const date = new Date(createdate);
    return date.toLocaleDateString("en-GB"); // Day/Month/Year format
  };

  useEffect(() => {
    UserGet();
  }, []);

  const UserGet = () => {
    axios
      .get(`${apinovel}/author/suggestions/${id_author}`)
      .then((response) => {
        const data = response.data;
        if (data && Array.isArray(data.results) && data.results.length > 0) {
          setTagnovel(data.results); // Set the report data
          console.log("General Reports:", data.typerepostg);
          console.log("Errors of the Novel Reports:", data.typereposte);
          console.log("Suggestions for this Novel Reports:", data.typereposts);
          console.log("Report Abuse Reports:", data.typerepostr);
          console.log("Total Reports:", data.quantityu);
        } else {
          console.log("No user data found");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = dataTag.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleType = (event) => {
    setReportTypeSearch(event.target.value);
  };

  const handleDateChange = (event, type) => {
    if (type === "start") {
      setStartDate(event.target.value);
    } else if (type === "end") {
      setEndDate(event.target.value);
    }
  };
  const handleClera = () => {
    setSearchQuery("");
    setStartDate("");
    setEndDate("");
    setReportTypeSearch("");
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Filter data based on search query and date range
  const filteredData = useMemo(
    () =>
      dataTag
        .filter((item) => {
          const itemDate = new Date(item.date);
          const start = startDate ? new Date(startDate) : null;
          const end = endDate ? new Date(endDate) : null;

          return (!start || itemDate >= start) && (!end || itemDate <= end);
        })
        .filter((item) =>
          item.user_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((item) =>
          item.typerepost.toLowerCase().includes(genderSearch.toLowerCase())
        ),
    [dataTag, searchQuery, genderSearch, startDate, endDate]
  );

  const paginatedData = useMemo(
    () =>
      filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredData, page, rowsPerPage]
  );

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        selected={selected}
        setSelected={setSelected}
        UserGet={UserGet}
        startDate={startDate}
        endDate={endDate}
        handleDateChange={handleDateChange}
        handleClera={handleClera}
        handleType={handleType}
        genderSearch={genderSearch}
      />
      <TableContainer>
        <Table
          sx={{ minWidth: 750, height: "400px" }}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={filteredData.length}
          />
          <TableBody>
            {stableSort(filteredData, getComparator(order, orderBy)).map(
              (row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.user_name}</TableCell>
                    <TableCell align="right">{formatDate(row.date)}</TableCell>
                    <TableCell align="right">{row.name_novel}</TableCell>
                    <TableCell align="right">{row.typerepost}</TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
