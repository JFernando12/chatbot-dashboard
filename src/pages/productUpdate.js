import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import {
  useGetProductQuery,
  useUpdateProductImageMutation,
  useUpdateProductMutation,
} from '../store';

const ProductUpdate = () => {
  const theme = useTheme();
  const [errors, setErrors] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [newImage, setNewImage] = useState('');
  const [uploadImage, setUploadImage] = useState(false);

  // Obtener la URL actual
  const currentURL = window.location.href;
  // Extraer el ID de la URL
  const urlParts = currentURL.split('/');
  const productId = urlParts[urlParts.length - 1];
  const { data } = useGetProductQuery(productId);
  console.log('data', data);

  useEffect(() => {
    setName(data?.data.name || '');
    setPrice(data?.data.price || '');
    setDescription(data?.data.description || '');
    setImage(data?.data.image || '');
  }, [data]);

  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const [updateProductImage, { isLoading: isLoadingImage }] =
    useUpdateProductImageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await updateProduct({
      id: data?.data.id,
      product: {
        name,
        price,
        description,
      },
    });

    if (error) {
      setErrors(error?.data?.message || 'Error al actualizar producto');
      console.log('Error:', error);
      return;
    }
  };

  const handleSubmitImage = async (e) => {
    e.preventDefault();

    if (!newImage) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', newImage);

    console.log('formData', formData);

    const { data, error } = await updateProductImage({
      id: productId,
      formData,
    });

    if (error) {
      setErrors(error?.data?.message || 'Error al actualizar imagen');
      console.log('Error:', error);
      return;
    }

    setUploadImage(false);
    setImage(data?.data.image || '');
  };

  const activeUploadImage = () => {
    setUploadImage(true);
  };

  const deactiveUploadImage = () => {
    setUploadImage(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setNewImage(selectedFile);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="30px"
      p="10px"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="400px"
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
            id="price"
            label="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            style={{ marginTop: '10px' }}
          >
            {isLoading ? 'Guardando Cambios...' : 'Guardar Cambios'}
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
      <Box
        border={`1px solid ${theme.palette.primary.main}`}
        borderRadius="10px"
        p="20px"
        boxShadow={theme.shadows[3]}
        textAlign="center"
      >
        {uploadImage ? (
          <Box component="form" onSubmit={handleSubmitImage}>
            <Typography
              fontSize="1rem"
              sx={{ color: theme.palette.secondary[200] }}
            >
              Imagen
            </Typography>
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
            <Box display="flex" gap="10px" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
                style={{ marginTop: '15px' }}
              >
                {isLoadingImage ? 'Guardando...' : 'Guardar'}
              </Button>
              <Button
                onClick={deactiveUploadImage}
                variant="contained"
                color="primary"
                disabled={isLoading}
                style={{ marginTop: '15px' }}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <Box
              component="img"
              sx={{
                maxWidth: 400,
                maxHeight: 400,
                display: 'block',
              }}
              alt="The house from the offer."
              src={image}
            />
            <Button
              onClick={activeUploadImage}
              variant="contained"
              color="primary"
              disabled={isLoading}
              style={{ marginTop: '15px' }}
            >
              Cambiar Imagen
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductUpdate;
