import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { useTranslation } from 'react-i18next';
import ChangePassword from './ChangePassword';

const MyInformation = () => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  return (
    <Paper elevation={4} sx={{ minHeight: '300px' }}>
      {user && (
        <>
          <Grid container justifyContent="center">
            <Typography variant="h3">
              {user.firstName} {user.lastName}
            </Typography>
          </Grid>
          <Typography variant="subtitle1" sx={{ margin: '20px', fontWeight: 'bold' }}>
            {t('phoneNumber')} : {user.phoneNumber}
          </Typography>
          <Typography variant="subtitle1" sx={{ margin: '20px', fontWeight: 'bold' }}>
            {t('email')} : {user.email}
          </Typography>
          {user.role === 'user' && <ChangePassword />}
        </>
      )}
    </Paper>
  );
};

export default MyInformation;
