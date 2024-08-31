import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Container,
  Card,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apinovel } from "../../../../URL_API/Apinovels";
import Swal from "sweetalert2";
import LoadingComponent from "../../../../Loading";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles
const CreateContentAdd = () => {
  const { id_novel } = useParams();
  const [content, setContent] = useState("");
  const [dataNameEP, setNameEP] = useState("");
  const [datamax, setMaxIdType] = useState("");
  const dataEP = datamax > 0 ? datamax + 1 : 1;
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);

  const ClreaText = () => {
    setNameEP("");
    editorRef.current.innerHTML = "";
    setContent("");
  };

  useEffect(() => {
    handleGetmaxID();
  }, []);

  const handleGetmaxID = () => {
    axios
      .get(`${apinovel}/view/ep_novel/${id_novel}`)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          const maxId = Math.max(...data.map((tag) => tag.id_episode_novel));
          setMaxIdType(maxId);
        } else {
          setMaxIdType(0);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`${apinovel}/create/ep_novel`, {
        id_episode_novel: dataEP,
        id_novel: id_novel,
        name_episode: `${dataEP} ${dataNameEP}`,
        content: content,
        status: "free",
        uploade: "no",
      });
      setLoading(false);

      await Swal.fire({
        title: "Add success",
        icon: "success",
      });
      setContent("")
      handleGetmaxID();
      ClreaText();
    } catch (error) {
      setLoading(false);
      console.error("There was an error creating the novel!", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  console.log(content);

  return (
    <Container>
      <Card>
        <LoadingComponent loading={loading} />
        <Box
          sx={{
            backgroundColor: "while",
            color: "black",
          }}
        >
          <Box display={"flex"} justifyContent={"center"}>
            <TextField
              sx={{ width: "300px" }}
              fullWidth
              id="outlined-basic"
              label={`Episode ${dataEP}`}
              variant="outlined"
              value={dataNameEP}
              onChange={(e) => setNameEP(e.target.value)}
            />
          </Box>
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
          <Box mt={2} mb={2}>
            <Button sx={{ marginLeft: 1 }} color="info" onClick={handleSubmit}>
              Add EP
            </Button>
            <Button sx={{ marginLeft: 20 }} onClick={ClreaText} color="error">
              {" "}
              Clear
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default CreateContentAdd;
