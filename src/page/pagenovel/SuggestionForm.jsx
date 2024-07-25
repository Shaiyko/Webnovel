import React, { useState, useRef, useEffect } from "react";
import { Box, Button, TextField, FormControl, Typography } from "@mui/material";
import axios from "axios";

const SuggestionForm2 = () => {
  const [dataloged, setlogged] = useState(null);
  const [userId, setUserId] = useState(null);
  const [suggestionCategory, setSuggestionCategory] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const editorRef = useRef(null);

  const handleSubmit = () => {
    if (
      userId
    ) {
      // Add user or author ID based on context

      axios
        .post("http://localhost:5000/create/suggestionsrx", { // Updated URL
          name_type: editorRef.current.innerHTML,
          id_user: userId, // Correct handling of id_user
          typepost: "General",
          user_name: dataloged,
        })
        .then((response) => {
          setSuggestions([...suggestions]); // Consider updating this if needed
          // Clear form inputs
          setUserId(null);
          setSuggestionCategory("");
          editorRef.current.innerHTML = "";
        })
        .catch((error) => {
          console.error("There was an error creating the report!", error);
        });
    } else {
      alert("Please fill in all fields.");
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

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Submit a Report
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
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>

      <Typography variant="h6" gutterBottom mt={4}>
        Suggestions
      </Typography>
      {suggestions.length === 0 ? (
        <Typography>No suggestions yet.</Typography>
      ) : (
        suggestions.map((suggestion, index) => (
          <Box
            key={index}
            sx={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: 2,
              borderRadius: "4px",
            }}
          >
            <Typography variant="subtitle1">
              {suggestion.userId} - {suggestion.novelTitle} -{" "}
              {suggestion.suggestionCategory}
            </Typography>
            <Box
              contentEditable
              sx={{
                border: "1px solid #eee",
                padding: "5px",
                minHeight: "50px",
                marginTop: 1,
                backgroundColor: "#f9f9f9",
              }}
              dangerouslySetInnerHTML={{ __html: suggestion.content }}
            />
          </Box>
        ))
      )}
    </Box>
  );
};

export default SuggestionForm2;
