import React, { useEffect, useRef, useState } from "react";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import {
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Container,
  Card,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apinovel } from "../../../../URL_API/Apinovels";
import Swal from "sweetalert2";
import LoadingComponent from "../../../../Loading";

const CreateContentAdd = () => {
  const { id_novel } = useParams();
  const [content, setContent] = useState("");
  const [dataNameEP, setNameEP] = useState("");
  const [datamax, setMaxIdType] = useState("");
  const dataEP = datamax > 0 ? datamax + 1 : 1;
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
  };

  const [alignment, setAlignment] = useState("center");
  const [formats, setFormats] = useState(() => []);
  const [fontSize, setFontSize] = useState("16px");
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleFormat23 = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };




  const handleInput = (event) => {
    setContent(event.target.innerHTML);
  };

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
    setLoading(true)
    try {
      await axios.post(`${apinovel}/create/ep_novel`, {
        id_episode_novel: dataEP,
        id_novel: id_novel,
        name_episode: `${dataEP} ${dataNameEP}`,
        content: content,
        status: "free",
        uploade: "no",
      });
      setLoading(false)
      await Swal.fire({
        title: "Add success",
        icon: "success",
      });
      handleGetmaxID();
      ClreaText();
    } catch (error) {
      setLoading(false)
      console.error("There was an error creating the novel!", error);
      throw error;
    }finally{
      setLoading(false)
    }
  };

  console.log(content);

  return (
    <Container>
      <Card>
      <LoadingComponent loading={loading} />
    <Box
      sx={{
        "@media (min-width:1200px)": {
          width: "100%",
          fontSize: fontSize,
        },
        "@media (max-width:600px)": {
          width: "100%",
          fontSize: fontSize,
        },
        "@media (min-width:600px) and (max-width:1200px)": {
          width: "100%",
          fontSize: fontSize,
        },
        backgroundColor: "while",
        color: "black",
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Font Size</InputLabel>
        <Select
          value={fontSize}
          onChange={handleFontSizeChange}
          label="Font Size"
        >
          <MenuItem value="12px">12px</MenuItem>
          <MenuItem value="14px">14px</MenuItem>
          <MenuItem value="16px">16px</MenuItem>
          <MenuItem value="18px">18px</MenuItem>
          <MenuItem value="20px">20px</MenuItem>
          <MenuItem value="22px">22px</MenuItem>
          <MenuItem value="26px">26px</MenuItem>
          <MenuItem value="28px">28px</MenuItem>
          <MenuItem value="30px">30px</MenuItem>
          <MenuItem value="32px">32px</MenuItem>
        </Select>
      </FormControl>
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat23}
        aria-label="text formatting"
      >
        <ToggleButton
          value="bold"
          aria-label="bold"
          onClick={() => handleFormat("bold")}
        >
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton
          value="italic"
          aria-label="italic"
          onClick={() => handleFormat("italic")}
        >
          <FormatItalicIcon />
        </ToggleButton>
        <ToggleButton
          value="underlined"
          aria-label="underlined"
          onClick={() => handleFormat("underline")}
        >
          <FormatUnderlinedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton
          value="left"
          aria-label="left aligned"
          onClick={() => handleFormat("justifyLeft")}
        >
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton
          value="center"
          aria-label="centered"
          onClick={() => handleFormat("justifyCenter")}
        >
          <FormatAlignCenterIcon />
        </ToggleButton>
        <ToggleButton
          value="right"
          aria-label="right aligned"
          onClick={() => handleFormat("justifyRight")}
        >
          <FormatAlignRightIcon />
        </ToggleButton>
        <ToggleButton
          value="justify"
          aria-label="justified"
          onClick={() => handleFormat("justifyFull")}
          disabled
        >
          <FormatAlignJustifyIcon />
        </ToggleButton>
      </ToggleButtonGroup>
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
      <Box
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        sx={{
          border: "1px solid #ccc",
          minHeight: "100px",
          padding: "20px",
          height: "500px",
          minWidth: "100px",
          maxHeight: "700px",
          maxWidth: "100%",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          backgroundColor: "white",
          color: "black",
          marginTop: "10px",
          fontSize: fontSize,
          fontFamily: 'Noto Sans Lao, sans-serif', // Use the font family here
        }}
      />
      <Box mt={2} mb={2}>
        <Button  sx={{marginLeft:1}} color="info" onClick={handleSubmit}>
          Add EP
        </Button>
        <Button sx={{marginLeft:20}} onClick={ClreaText} color="error"> Clear</Button>
      </Box>
    </Box>
    </Card>
    </Container>
  );
};

export default CreateContentAdd;
