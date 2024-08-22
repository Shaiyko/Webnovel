import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Container,
  Card,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { apinovel } from "../../URL_API/Apinovels";
import LoadingComponent from "../../Loading";

const SuggestionReport = () => {
  const { id_novel } = useParams(); // id_novel should be an integer from the URL
  const [dataloged, setlogged] = useState(null);
  const [dataname, setNameN] = useState("");
  const [userId, setUserId] = useState(null);
  const [suggestionCategory, setSuggestionCategory] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const editorRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    if (suggestionCategory) {
      // Add user or author ID based on context
setLoading(true)
      axios
        .post(`${apinovel}/create/suggestions`, {
          // Updated URL
          name_type: editorRef.current.innerHTML,
          id_user: userId, // Correct handling of id_user
          id_novel: suggestionCategory !== "General" ? id_novel : null,
          typepost: suggestionCategory,
          user_name: dataloged,
        })
        .then((response) => {
          setSuggestions([...suggestions]); // Consider updating this if needed
          // Clear form inputs
          setUserId(null);
          setSuggestionCategory("");
          editorRef.current.innerHTML = "";
          setLoading(false)
          Swal.fire("Submit a Report Succeed");
        })
        .catch((error) => {
          console.error("There was an error creating the report!", error);
          setLoading(false)
        });
    } else {
      Swal.fire("Friends, we need to choose a category to report");
      setLoading(false)
    }
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      if (loggedInUser.status === "user") {
        const loggedInUserP = JSON.parse(localStorage.getItem("userP"));
        setUserId(loggedInUserP.id_user);
        setlogged(loggedInUserP.user_name);
      } else if (loggedInUser.status === "author") {
        const loggedInAuthor = JSON.parse(localStorage.getItem("author"));
        setUserId(loggedInAuthor.id_author);
        setlogged(loggedInAuthor.penname);
      } else if (loggedInUser.status === "admin") {
        setUserId(1);
        setlogged("admin");
      }
    }
  }, []);

  useEffect(() => {
    UserGet();
  }, []);

  const UserGet = () => {
    axios
      .get(`${apinovel}/novelall2/${id_novel}`)
      .then((response) => {
        const data2 = response.data[0];
        setNameN(data2.name_novel);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <LoadingComponent loading={loading} />
      <Container>
        <Card sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Submit a Report
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField disabled value={dataloged} label="User Name" />
          </FormControl>
          {suggestionCategory !== "General" && (
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField disabled value={dataname} label="Novel Name" />
            </FormControl>
          )}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={suggestionCategory}
              onChange={(e) => setSuggestionCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="Errors of the Novel">
                Errors of the Novel
              </MenuItem>
              <MenuItem value="Suggestions for this Novel">
                Suggestions for this Novel
              </MenuItem>
              <MenuItem value="Report Abuse">Report Abuse</MenuItem>
            </Select>
          </FormControl>
          <Box
            ref={editorRef}
            contentEditable
            sx={{
              border: "1px solid #ccc",
              minHeight: "100px",
              padding: "5px",
              marginBottom: 2,
            }}
            placeholder="Enter your suggestion here..."
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default SuggestionReport;
