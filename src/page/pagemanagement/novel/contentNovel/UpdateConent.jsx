import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { apinovel } from "../../../../URL_API/Apinovels";
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles
import LoadingComponent from "../../../../Loading";

const UpdateContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [dataNameEP, setNameEP] = useState("");
  const [dataIdep, setIdEp] = useState("");
  const [id_novel, setIdnovel] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch current episode data
  useEffect(() => {
    handleGetmaxID();
  }, []);

  const handleGetmaxID = () => {
    setLoading(true);
    axios
      .get(`${apinovel}/view/ep_novelep/${id}`)
      .then((response) => {
        const data = response.data[0];
        setIdnovel(data.id_novel);
        setIdEp(data.id_episode_novel);
        setContent(data.content);
        setNameEP(data.name_episode);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching episode:", error);
      });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (dataNameEP.trim() === "" || content.trim() === "") {
      Swal.fire({
        title: "Error",
        text: "Please fill out all required fields!",
        icon: "error",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.put(`${apinovel}/update/ep_novel/${id}`, {
        name_episode: dataNameEP,
        content: content,
      });
      setLoading(false);
      await Swal.fire({
        title: "Success",
        icon: "success",
      });
      navigate(`/contenttable/${id_novel}`);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "There was an error updating the novel!",
        icon: "error",
      });
      console.error("There was an error updating the novel!", error);
    }
  };

  // Confirm clearing the text
  const clearText = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/contenttable/${id_novel}`);
      }
    });
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* Input field for episode name */}
          <Box display={"flex"} justifyContent={"center"} sx={{ marginBottom: "20px" }}>
            <TextField
              sx={{ width: "300px" }}
              fullWidth
              id="outlined-basic"
              label={`Episode ${dataIdep}`}
              variant="outlined"
              value={dataNameEP}
              onChange={(e) => setNameEP(e.target.value)}
            />
          </Box>

          {/* Quill rich text editor for content */}
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            style={{
              height: "300px",
              marginBottom: "50px",
              backgroundColor: "white",
            }}
          />

          {/* Submit and Clear buttons */}
          <Box display="flex" justifyContent="space-between" sx={{ marginTop: "20px" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Update EP
            </Button>
            <Button variant="contained" color="error" onClick={clearText}>
              Clear
            </Button>
          </Box>

          {/* Loading component */}
          <LoadingComponent loading={loading} />
        </>
      )}
    </Box>
  );
};

export default UpdateContent;
