import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { AppBar, Box, Container, Grid, IconButton, styled, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { selectUser } from '../../../features/users/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import { useTranslation } from 'react-i18next';
import RUIcon from '../../../assets/images/russiaIcon.png';
import USAIcon from '../../../assets/images/usaIcon.png';
import { ToolBarStyles } from '../../../styles';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
    },
  });

  return (
    <Box mb={3} sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={ToolBarStyles}>
        <Toolbar>
          <Container maxWidth="xl">
            <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
                <Grid container alignItems="center">
                  <Typography variant="h6" component="div" fontWeight="bold" mr={3}>
                    <Link to="/">JOB</Link>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={3} xl={3}>
                <Grid container>
                  <Grid item>
                    <IconButton style={{ width: 35, height: 35, padding: 0 }} onClick={() => changeLanguage('ru')}>
                      <img src={RUIcon} alt="ru language" style={{ width: '100%', height: 'auto' }} />
                    </IconButton>
                    <IconButton style={{ width: 35, height: 35, padding: 0 }} onClick={() => changeLanguage('en')}>
                      <img src={USAIcon} alt="eng language" style={{ width: '100%', height: 'auto' }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                <Grid container>
                  <Grid item ml="auto">
                    {user ? <UserMenu user={user} /> : <AnonymousMenu />}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;
