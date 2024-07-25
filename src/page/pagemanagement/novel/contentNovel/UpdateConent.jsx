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
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateContent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [dataNameEP, setNameEP] = useState("");
  const [dataIdep, setIdEp] = useState("");
  const [id_novel, setIdnovel] = useState("");
  const editorRef = useRef(null);

  const [alignment, setAlignment] = useState("center");
  const [formats, setFormats] = useState([]);
  const [fontSize, setFontSize] = useState("16px");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [backgroundColor, setBackgroundColor] = useState("white");

  useEffect(() => {
    handleGetmaxID();
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();

      // Check if there's an existing selection
      if (selection.rangeCount > 0) {
        // Save current cursor position
        const cursorPosition = selection.getRangeAt(0).startOffset;

        // Update content
        editorRef.current.innerHTML = content;

        // Restore cursor position
        range.setStart(editorRef.current.firstChild || editorRef.current, cursorPosition);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        editorRef.current.focus();
      } else {
        // If no selection exists, simply update the content
        editorRef.current.innerHTML = content;
      }
    }
  }, [content]);

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    document.execCommand("justify" + newAlignment.charAt(0).toUpperCase() + newAlignment.slice(1), false, null);
  };

  const handleFormat23 = (event, newFormats) => {
    setFormats(newFormats);
    newFormats.forEach((format) => document.execCommand(format, false, null));
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handleInput = (event) => {
    setContent(event.target.innerHTML);
  };

  const clearText = () => {
     window.location.href = `/contenttable/${id_novel}`;
  };

  const handleGetmaxID = () => {
    axios
      .get(`http://localhost:5000/view/ep_novelep/${id}`)
      .then((response) => {
        const data = response.data[0];
        setIdnovel(data.id_novel);
        setIdEp(data.id_episode_novel);
        setContent(data.content);
        setNameEP(data.name_episode);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/update/ep_novel/${id}`, {
        name_episode: dataNameEP,
        content: content,
      });
      handleGetmaxID();
      window.location.href = `/contenttable/${id_novel}`;
    } catch (error) {
      console.error("There was an error updating the novel!", error);
    }
  };

  return (
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
        backgroundColor: backgroundColor,
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
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Font Family</InputLabel>
        <Select
          value={fontFamily}
          onChange={handleFontFamilyChange}
          label="Font Family"
        >
          <MenuItem value="Arial">Arial</MenuItem>
          <MenuItem value="Courier New">Courier New</MenuItem>
          <MenuItem value="Georgia">Georgia</MenuItem>
          <MenuItem value="Times New Roman">Times New Roman</MenuItem>
          <MenuItem value="Verdana">Verdana</MenuItem>
          <MenuItem value="Phetsarath OT">Phetsarath OT</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Background Color</InputLabel>
        <Select
          value={backgroundColor}
          onChange={handleBackgroundColorChange}
          label="Background Color"
        >
          <MenuItem value="white">White</MenuItem>
          <MenuItem value="green">Green</MenuItem>
          <MenuItem value="yellow">Yellow</MenuItem>
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
          value="underline"
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
          onClick={() => handleAlignment("left")}
        >
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton
          value="center"
          aria-label="centered"
          onClick={() => handleAlignment("center")}
        >
          <FormatAlignCenterIcon />
        </ToggleButton>
        <ToggleButton
          value="right"
          aria-label="right aligned"
          onClick={() => handleAlignment("right")}
        >
          <FormatAlignRightIcon />
        </ToggleButton>
        <ToggleButton
          value="justify"
          aria-label="justified"
          onClick={() => handleAlignment("justify")}
        >
          <FormatAlignJustifyIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Box display={"flex"} justifyContent={"center"}>
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
      <Box
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        sx={{
          border: "1px solid #ccc",
          minHeight: "100px",
          padding: "5px",
          height: "500px",
          minWidth: "100px",
          maxHeight: "700px",
          maxWidth: "100%",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          backgroundColor: backgroundColor,
          color: "black",
          marginTop: "10px",
          fontSize: fontSize,
          fontFamily: fontFamily,
        }}
      />
      <Box>
        <Button color="info" onClick={handleSubmit}>
          Update EP
        </Button>
        <Button color="error" onClick={clearText}>
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateContent;
