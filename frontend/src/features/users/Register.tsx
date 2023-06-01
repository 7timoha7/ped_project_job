import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectRegisterError, selectRegisterLoading} from './usersSlice';
import {register} from './usersThunks';
import {
  Avatar,
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import type {RegisterMutation} from '../../types';
import {useTranslation} from 'react-i18next';
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);
  const navigate = useNavigate();
  const {t} = useTranslation();

  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    role: '',
  });

  console.log(state.role);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({...prevState, [name]: value}));
  };

  const phoneChangeHandler = (newPhone: string) => {
    setState((prevState) => ({...prevState, phoneNumber: newPhone}));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const selectChangeHandler = (role: string) => {
    // const {value} = event.target;
    setState((prevState) => ({...prevState, role: role as string}));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          {t('signUp')}
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label={t('email')}
                name="email"
                autoComplete="new-email"
                type="email"
                value={state.email}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('email'))}
                helperText={getFieldError('email')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t('password')}
                name="password"
                type="password"
                autoComplete="new-password"
                value={state.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t('firstName')}
                name="firstName"
                type="firstName"
                autoComplete="new-firstName"
                value={state.firstName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('firstName'))}
                helperText={getFieldError('firstName')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t('lastName')}
                name="lastName"
                type="lastName"
                autoComplete="new-lastName"
                value={state.lastName}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('lastName'))}
                helperText={getFieldError('lastName')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>{t('selectRole')}</InputLabel>
                <Select
                  value={state.role}
                  onChange={() => selectChangeHandler}
                  label={t('selectRole')}
                  required
                >
                  <MenuItem value="summary">{t('summary')}</MenuItem>
                  <MenuItem value="vacancies">{t('vacancies')}</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{mt: 2}}>
                <InputLabel>{t('selectRole')}</InputLabel>
                <Select
                  value={state.role}
                  onChange={(e) => selectChangeHandler(e.target.value)}
                  label={t('selectRole')}
                  required
                >
                  <MenuItem value="summary">{t('summary')}</MenuItem>
                  <MenuItem value="vacancies">{t('vacancies')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <label> {t('phoneNumber')}</label>
              <PhoneInput
                onChange={phoneChangeHandler}
                defaultCountry={'KG'}
                international
                countryCallingCodeEditable={false}
                name="phoneNumber"
                value={state.phoneNumber}
                error={state.phoneNumber && (isValidPhoneNumber(state.phoneNumber) ? undefined : t('phoneError'))}
              />
            </Grid>
          </Grid>
          <LoadingButton type="submit" loading={loading} fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
            {t('signUp')}
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                {t('signIn')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
