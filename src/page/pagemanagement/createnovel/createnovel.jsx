import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

const CreateNovelForm = () => {
  const [formData, setFormData] = useState({
    id_novel: '',
    id_author: '',
    name_novel: '',
    description: '',
    status: '',
    uplode: '',
    image_novel: '',
    id_type: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/create/novel', formData);
      console.log('Novel created:', response.data);
    } catch (error) {
      console.error('There was an error creating the novel!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="id_novel"
        label="ID Novel"
        value={formData.id_novel}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="id_author"
        label="ID Author"
        value={formData.id_author}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="name_novel"
        label="Name Novel"
        value={formData.name_novel}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="status"
        label="Status"
        value={formData.status}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="uplode"
        label="Upload"
        value={formData.uplode}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="image_novel"
        label="Image Novel"
        value={formData.image_novel}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="id_type"
        label="ID Type"
        value={formData.id_type}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Create Novel
      </Button>
    </form>
  );
};

export default CreateNovelForm;
