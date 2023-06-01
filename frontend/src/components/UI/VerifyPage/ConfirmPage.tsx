import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { reAuthorization, verify } from '../../../features/users/usersThunks';
import { Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ConfirmPage = () => {
  const { t } = useTranslation();
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateToCabinet = async () => {
    await dispatch(reAuthorization());
    navigate('/my-cabinet');
  };
  useEffect(() => {
    if (token) {
      dispatch(verify(token));
    }
    setTimeout(navigateToCabinet, 5000);
  }, [dispatch, token, navigateToCabinet]);
  return (
    <Container>
      <Typography sx={{ display: 'inline-block' }} variant="h4">
        {t('navigateText')}
      </Typography>{' '}
      <Button onClick={navigateToCabinet} variant="text" color="primary">
        {t('navigateButton')}
      </Button>
    </Container>
  );
};

export default ConfirmPage;
