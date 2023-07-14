import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from '../store';
import { useSigninMutation } from '../store';
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  FormControlLabel,
  Link,
  Checkbox,
  Avatar,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading }] = useSigninMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrMsg('');
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/statuswhatsapp');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await login({
      username: username,
      password: password,
    });
    console.log('userData', data);
    console.log('error', error);
    if (error) {
      setErrMsg(error.message);
      return;
    }
    localStorage.setItem('token', data.token);

    dispatch(setCredentials(data));
    setUsername('');
    setPassword('');
    navigate('/statuswhatsapp');
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Username"
          name="username"
          autoComplete="username"
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        {/* <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid> */}
      </Box>
    </Box>
  );
};
export default Login;
