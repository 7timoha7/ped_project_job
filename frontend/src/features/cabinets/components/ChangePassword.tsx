import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../app/hooks';
import { changePass, logout } from '../../users/usersThunks';

const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleSubscribe = async () => {
    await dispatch(changePass(password));
    await dispatch(logout());
    await handleClose();
    await handleConfirmClose();
  };

  return (
    <Box textAlign={'center'}>
      <Button variant="outlined" onClick={handleClickOpen}>
        {t('changePassword')}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('changePassword')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label={t('password')}
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={handlePasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('cancel')}</Button>
          <Button disabled={password.length < 3} onClick={handleConfirmOpen} color="error">
            {t('changePassword')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>{t('sure')}</DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirmClose}>{t('cancel')}</Button>
          <Button onClick={handleSubscribe} color="error">
            {t('edit')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChangePassword;
