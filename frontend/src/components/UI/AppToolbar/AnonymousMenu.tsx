import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AccountCircle, LockOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(29,53,4,0.79)',
    },
    secondary: {
      main: 'rgba(29,53,4,0.79)',
    },
  },
});

const AnonymousMenu = () => {
  const { t } = useTranslation();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid item mr={1} mb={1} alignItems="center">
            <Button
              component={NavLink}
              to="/register"
              variant="contained"
              startIcon={<AccountCircle />}
              color="primary"
              sx={{
                backgroundColor: theme.palette.primary.main,
              }}
            >
              <Typography mt={0.5} fontWeight="bold">
                {t('signUp')}
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={NavLink}
              to="/login"
              variant="contained"
              startIcon={<LockOutlined />}
              color="secondary"
              sx={{
                backgroundColor: theme.palette.secondary.main,
              }}
            >
              <Typography mt={0.5} fontWeight="bold">
                {t('signIn')}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default AnonymousMenu;
