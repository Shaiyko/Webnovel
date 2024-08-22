// eslint-disable-next-line no-unused-vars
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Button, Divider } from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";

import { useParams } from "react-router-dom";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import PromulgateContent from "./PromulgateContent";
import StatusorFree from "./StatusorFree";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { apinovel } from "../../../../URL_API/Apinovels";
import Swal from "sweetalert2";
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
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Status",
  },
  {
    id: "name episode",
    numeric: true,
    disablePadding: false,
    label: "Name Episode",
  },
  {
    id: "creation date",
    numeric: true,
    disablePadding: false,
    label: "Creation date",
  },
  {
    id: "updatetime",
    numeric: true,
    disablePadding: false,
    label: "Update Time",
  },
  {
    id: "uploade",
    numeric: true,
    disablePadding: false,
    label: "Promulgate",
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
    // eslint-disable-next-line react/prop-types
    selected,
    // eslint-disable-next-line react/prop-types
    setSelected,
    // eslint-disable-next-line react/prop-types
    UserGet,
    // eslint-disable-next-line react/prop-types
    id_novel,
    namenovel
  } = props;
  const handleDelete = async () => {
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
      await axios.delete(`${apinovel}/delete/ep_novel`, {
        data: { id: selected },
      });
      await Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      UserGet();
      setSelected([]);
      // Handle success
    } catch (error) {
      console.error("Error deleting novels:", error);
      // Handle error
    }
  }
  };

  const Newcontent = () => {
    const url = `/contentnew/${id_novel}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const Newcontentview = () => {
    const url = `/novel/${id_novel}/${selected}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSelected([])
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
          Nutrition
        </Typography>
      )}
  <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
         {` Chapter Data "${namenovel}"`}
        </Typography>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginRight: 2 }}
      />
      {numSelected == 1 ? (
        <Tooltip title="Promulgate">
          <IconButton>
            <StatusorFree
              selected={selected}
              setSelected={setSelected}
              UserGet={UserGet}
            />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add Data"></Tooltip>
      )}
      {numSelected == 1 ? (
        <Tooltip title="Promulgate">
          <IconButton>
            <PromulgateContent
              selected={selected}
              setSelected={setSelected}
              UserGet={UserGet}
            />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add Data"></Tooltip>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete" sx={{ marginRight: 2 }}>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Insert Data">
          <IconButton>
            <Button target="_blank" onClick={Newcontent}>
              <ModeIcon />
            </Button>
          </IconButton>
        </Tooltip>
      )}
      {numSelected == 1 ? (
        <Tooltip title="Update">
          <IconButton>
            <Button href={`/content/updata/${selected}`}>
              <UpgradeIcon />
            </Button>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add Data"></Tooltip>
      )}
      {numSelected == 1 ? (
        <Tooltip title="View Amd Create Chapter">
          <IconButton target="_blank" onClick={Newcontentview} >
            <RemoveRedEyeIcon/>
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
  handleSearchChange: PropTypes.func.isRequired,
};

export default function ContentNovel() {
  const { id_novel } = useParams();
  //********************************************* */
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [namenovel, setnameauthor] = useState("");
  const [dataTag, setTagnovel] = useState([]);
  const [datatime, setupdatetime] = useState("");
  const [datadate, setDate] = useState("");
  const formatDateTime = (datatime) => {
    const date = new Date(datatime);
    return date.toLocaleString(); // แสดง วันเดือนปี เวลา
  };

  const formatDate = (datadate) => {
    const date = new Date(datadate);
    return date.toLocaleDateString(); // แสดง วันเดือนปี
  };
  useEffect(() => {
    UserGet();
  }, []);

  const UserGet = () => {
    axios
      .get(`${apinovel}/view/ep_novel/${id_novel}`)
      .then((response) => {
        const data = response.data;
        const data2 = response.data[0];
        setDate(data2.createdate);
        setnameauthor(data2.name_novel)
        setupdatetime(data2.updatetime);
        if (Array.isArray(data) && data.length > 0) {
          setTagnovel(data);
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
  //
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = dataTag.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  //
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = useMemo(() => {
    return dataTag.filter((row) =>
      row.name_episode.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [dataTag, searchQuery]);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

  const visibleRows = useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [filteredRows, order, orderBy, page, rowsPerPage]
  );
  console.log("data", dataTag);
  return (
    <Box sx={{ width: "100%",boxShadow:2,
      backgroundColor:"##cfd8dc", }}>
      <Paper sx={{ width: "100%", mb: 2,p:1 }}>
        <Box>
          
        </Box>
      <Divider />
        <EnhancedTableToolbar
          numSelected={selected.length}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          selected={selected}
          id_novel={id_novel}
          setSelected={setSelected}
          UserGet={UserGet}
          namenovel={namenovel}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
            />
            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${row.id}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
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
                      {row.status}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      Chapter {row.name_episode}
                    </TableCell>
                    <TableCell align="right">{formatDate(datadate)}</TableCell>
                    <TableCell align="right">
                      {formatDateTime(datatime)}
                    </TableCell>
                    <TableCell align="right">{row.uploade}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
