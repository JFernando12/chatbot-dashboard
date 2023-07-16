import React, { useState } from 'react';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import { useFirstMessageMutation } from '../store';

const FirstMessage = () => {
  const theme = useTheme();

  const [errors, setErrors] = useState('');
  const [phone, setPhone] = useState('');

  const [createConversation, { isLoading }] = useFirstMessageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('phone', phone);

    const { error } = await createConversation(phone);

    if (error) {
      console.log('Error:', error);
      setErrors(error?.data?.message || 'Error al crear conversación');
      return;
    }

    setErrors('');
    setPhone('');
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="400px"
        border={`1px solid ${theme.palette.primary.main}`}
        borderRadius="10px"
        p="15px"
        boxShadow={theme.shadows[3]}
      >
        <>
          <TextField
            id="phone"
            label="Numero de Telefono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="outlined"
            sx={{
              mb: '10px',
            }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            style={{ marginTop: '10px' }}
          >
            {isLoading ? 'Creando Conversación...' : 'Crear Conversación'}
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

export default FirstMessage;
