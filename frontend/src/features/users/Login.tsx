import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoginError, selectLoginLoading } from './usersSlice';
import { googleLogin, login } from './usersThunks';
import { Alert, Avatar, Box, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import type { LoginMutation } from '../../types';
import { useTranslation } from 'react-i18next';
import { GoogleLogin } from '@react-oauth/google';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import RestorePassword from './components/RestorePassword';

const Login = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [credentials, setCredentials] = useState('');

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    navigate('/');
  };

  const googleLoginHandler = async (credentials: string) => {
    await setPhoneNumber('');
    await setIsDialogOpen(true);
    await setCredentials(credentials);
  };

  const closeDialogHandler = () => {
    setIsDialogOpen(false);
  };

  const submitDialogHandler = async (phone: string, cred: string) => {
    await dispatch(googleLogin({ phone, cred })).unwrap();
    setIsDialogOpen(false);
    await navigate('/');
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('signIn')}
        </Typography>
        <Box sx={{ pt: 2 }}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                void googleLoginHandler(credentialResponse.credential);
              }
            }}
            onError={() => {
              console.log('Login failed');
            }}
          />
        </Box>
        {error && (
          <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
            {error.error}
          </Alert>
        )}
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label={t('email')}
                name="email"
                type="email"
                autoComplete="current-email"
                value={state.email}
                onChange={inputChangeHandler}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t('password')}
                name="password"
                type="password"
                autoComplete="current-password"
                value={state.password}
                onChange={inputChangeHandler}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <RestorePassword />
            </Grid>
          </Grid>
          <LoadingButton type="submit" loading={loading} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {t('signIn')}
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {t('signUp')}
              </Link>
            </Grid>
          </Grid>
        </Box>

        <Dialog open={isDialogOpen} onClose={closeDialogHandler}>
          <DialogTitle>{t('enterPhoneNumber')}</DialogTitle>
          <DialogContent sx={{ p: 8 }}>
            <ReactPhoneInput
              inputProps={{
                name: 'phoneNumber',
                required: true,
                autoFocus: true,
              }}
              country={'kg'}
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialogHandler}>{t('cancel')}</Button>
            <Button
              disabled={phoneNumber.length < 8}
              onClick={() => submitDialogHandler(phoneNumber, credentials)}
              color="primary"
              variant="contained"
            >
              {t('submit')}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Login;
