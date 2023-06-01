import React, { useState } from 'react';
import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { styled } from '@mui/material/styles';
import {
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);

  const MyButton = styled(Button)({
    position: 'fixed',
    bottom: 40,
    right: 40,
    width: 50,
    height: 60,
    padding: 0,
    borderRadius: '50%',
    backgroundColor: '#25d366',
    '&:hover': {
      backgroundColor: '#128c7e',
    },
    zIndex: 9999,
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
    },
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    setOpen(false);
    window.open('https://wa.me/996558389288?text=Здравствуйте,%20я%20хочу%20связаться%20с%20вами!', '_blank');
  };

  const { t } = useTranslation();

  return (
    <>
      <ThemeProvider theme={theme}>
        <MyButton onClick={handleClick}>
          <WhatsAppIcon sx={{ color: '#ffffff' }} />
        </MyButton>
      </ThemeProvider>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t('transfer_to_WhatsApp')}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{t('are_you_sure_WhatsApp')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{t('cancel')}</Button>
          <Button onClick={handleConfirm}>{t('continue')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WhatsAppButton;
