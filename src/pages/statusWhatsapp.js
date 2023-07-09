import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import {
  useStartWhatsappMutation,
  useStopWhatsappMutation,
  useStatusWhatsappQuery,
} from '../store';
import { Box, Button, useTheme } from '@mui/material';
import Header from '../components/Header';
import reloadIcon from '../reload.svg';

const StatusWhatsapp = () => {
  const theme = useTheme();

  const [token, setToken] = useState('');
  const [active, setActive] = useState(false);

  const { data } = useStatusWhatsappQuery('', {
    pollingInterval: 10000,
  });

  useEffect(() => {
    if (data?.data) {
      setActive(data?.data);
      setToken('');
    } else {
      setActive(false);
    }
  }, [data?.data]);

  const [startWhatsappMutation, { isLoading: startLoading }] =
    useStartWhatsappMutation();
  const [stopWhatsappMutation, { isLoading: stopLoading }] =
    useStopWhatsappMutation();

  const startWhatsapp = async () => {
    console.log('start');
    const { data, error } = await startWhatsappMutation();
    if (!error) {
      if (data?.data) {
        setToken(data?.data);
      } else {
        setActive(true);
        setToken('');
      }
    }
    console.log(data);
  };

  const stopWhatsapp = async () => {
    console.log('stop');
    const { error } = await stopWhatsappMutation();
    if (!error) {
      setToken('');
      setActive(false);
    }
  };

  return (
    <Box
      m="1.5rem 2.5rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        mt="1rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
        border={`1px solid ${theme.palette.primary.main}`}
        borderRadius="20px"
        p="30px"
        boxShadow={theme.shadows[3]}
      >
        <Header title={`Whatsapp ${active ? 'Activo' : 'Inactivo'}`} />
        <Box
          width="400px"
          height="400px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          m="1rem 0 1rem 0"
        >
          {token ? (
            <QRCode value={token} renderAs="svg" size={400} />
          ) : (
            <Button
              type="submit"
              variant="contained"
              onClick={startWhatsapp}
              disabled={startLoading}
              sx={{ borderRadius: startLoading ? '0%' : '30%' }}
            >
              {startLoading ? (
                'Cargando...'
              ) : (
                <img
                  src={reloadIcon}
                  alt="reload SVG"
                  width="130px"
                  height="130px"
                />
              )}
            </Button>
          )}
        </Box>
        {active ? (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={stopWhatsapp}
            disabled={stopLoading}
            sx={{
              fontWeight: 'bold',
            }}
          >
            {stopLoading ? 'Desconectando...' : 'Desconectar'}
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={startWhatsapp}
            disabled={startLoading}
            sx={{
              fontWeight: 'bold',
            }}
          >
            {startLoading ? 'Conectando...' : token ? 'Regenerar' : 'Conectar'}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default StatusWhatsapp;
