import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import { useCreateProductMutation } from '../store';

const ProductCreate = () => {
  const theme = useTheme();

  const [errors, setErrors] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('name', name);
    console.log('description', description);
    console.log('image', image);

    if (!image) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('description', description);

    const { error } = await createProduct(formData);

    if (error) {
      console.log('Error:', error);
      setErrors(error?.data?.message || 'Error al crear asistencia');
      return;
    }

    setErrors('');
    setName('');
    setDescription('');
    setImage('');

    navigate('/products');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="70vh"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="400px"
        mt="50px"
        border={`1px solid ${theme.palette.primary.main}`}
        borderRadius="10px"
        p="20px"
        boxShadow={theme.shadows[3]}
      >
        <>
          <TextField
            id="name"
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            id="description"
            label="Descripción"
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            variant="outlined"
            required
            rows={15}
            sx={{ width: '300px' }}
          />
          <Typography
            fontSize="1rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Imagen
          </Typography>{' '}
          <Box
            mt="5px"
            mb="10px"
            border={`2px solid ${theme.palette.primary.main}`}
            p="12px"
            textAlign="center"
          >
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              placeholder="Imagen"
              onChange={handleFileChange}
              required
              m="15px 15px 15px 15px"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            style={{ marginTop: '10px' }}
          >
            {isLoading ? 'Creando Producto...' : 'Crear Producto'}
          </Button>
        </>
        {errors.length > 0 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="20px"
          >
            <Typography key={errors} color="error">
              {errors}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductCreate;
