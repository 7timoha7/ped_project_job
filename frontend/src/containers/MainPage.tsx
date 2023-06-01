import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { HeaderStyles } from '../styles';

const MainPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h2" textAlign="center" mt={3} style={HeaderStyles}>
        {t('specialOffersForYou')}
      </Typography>
    </>
  );
};

export default MainPage;
