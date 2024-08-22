import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  Typography,
  Container,
  Card,
} from "@mui/material";
import axios from "axios";
import { apinovel } from "../../URL_API/Apinovels";
import LoadingComponent from "../../Loading";
import Swal from "sweetalert2";

const SuggestionForm2 = ({onCancel}) => {
  const [dataloged, setlogged] = useState(null);
  const [userId, setUserId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    if (userId) {
      setLoading(true)
      axios
        .post(`${apinovel}/create/suggestionsrx`, {
          name_type: editorRef.current.innerHTML,
          id_user: userId,
          typepost: "General",
          user_name: dataloged,
        })
        .then((response) => {
          setSuggestions([...suggestions]);
          setUserId(null);
          editorRef.current.innerHTML = "";
          checkFormValidity();
          setLoading(false)
          Swal.fire("Submit a Suggestion Succeed");
        })
        .catch((error) => {
          console.error("There was an error creating the report!", error);
          setLoading(false)
        });
    } else {
      alert("Please fill in all fields.");
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
        setlogged(loggedInAuthor.user_name);
      } else if (loggedInUser.status === "admin") {
        setUserId(1);
        setlogged("admin");
      }
    }
  }, []);

  const checkFormValidity = () => {
    if (editorRef.current && editorRef.current.innerHTML.trim() !== "") {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    checkFormValidity();
  }, []);

  const handleEditorChange = () => {
    checkFormValidity();
  };

  return (
    <Box>
       <LoadingComponent loading={loading} />
      <Container>
        <Card sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Submit a Suggestion
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              id="outlined-basic"
              disabled
              value={dataloged}
              label="User Name"
            />
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
            onInput={handleEditorChange}
          />
          <Box sx={{display:"flex"}}>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!isFormValid}
            >
            Submit
          </Button>
          <Button
          variant="outlined"
          color="error"
          sx={{ display: { xs: "none", md: "block" },marginLeft:"100px" }}
          onClick={onCancel} // ใช้งาน onCancel เมื่อกดปุ่ม
          >
          Cancel
        </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default SuggestionForm2;
