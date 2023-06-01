import React, { useState } from 'react';
import { Alert, Button, Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import NoFoundPage from '../NoFoundPage/NoFoundPage';
import { sendMail } from '../../../features/users/usersThunks';
import Collapse from '@mui/material/Collapse';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTranslation } from 'react-i18next';

const VerifyPage = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [active, setActive] = useState(false);
  const onButtonClick = async () => {
    await dispatch(sendMail());
    setActive(true);
  };
  return (
    <Container>
      {user && !user.isVerified ? (
        <>
          <Typography variant="h3" textAlign="center">
            {t('verifyHeader')}
          </Typography>
          <Typography sx={{ display: 'inline-block' }} variant="body1" textAlign="center">
            {t('verifyMail')}
          </Typography>
          <Button variant="outlined" onClick={onButtonClick} disabled={active}>
            {t('sendMail')}
          </Button>
          <Collapse in={active}>
            <Alert
              iconMapping={{
                success: <CheckCircleOutlineIcon fontSize="inherit" />,
              }}
            >
              {t('sendSuccess')}
            </Alert>
          </Collapse>
        </>
      ) : (
        <NoFoundPage />
      )}
    </Container>
  );
};

export default VerifyPage;
