import React from 'react';
import { AppBar, Box, Container, Grid, Link, Toolbar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FooterStyle } from '../../../styles';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ flexGrow: 1, mt: 1 }}>
      <AppBar position="static" sx={FooterStyle}>
        <Toolbar sx={{ paddingY: '10px' }}>
          <Container maxWidth="xl">
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid container item direction="column" xs={12} md={3}>
                <Typography variant="body1" component="div" style={{ margin: 'auto' }}>
                  +996 558 389288 <WhatsAppIcon />
                </Typography>
                <Typography variant="body1" component="div" style={{ margin: 'auto' }}>
                  +996 556 829978
                  <CallIcon />
                </Typography>
                <Typography variant="body1" component="div" style={{ margin: 'auto' }}>
                  +996 505 000024
                  <CallIcon />
                </Typography>
              </Grid>
              <Grid container item xs={12} md={3}>
                <Link href="http://www.eventm.kg/" style={{ margin: 'auto' }}>
                  <img style={{ maxWidth: '250px' }} src="/logo.png" alt="logo" />
                </Link>
              </Grid>
              <Grid container item direction="column" xs={12} md={5}>
                <Typography variant="body1" component="div" style={{ margin: 'auto' }}>
                  <EmailIcon /> conference@eventm.kg
                </Typography>
                <Typography variant="body1" component="div" style={{ margin: 'auto' }}>
                  <Link href="https://www.instagram.com/eventm_agency" color="#FFF" underline="none">
                    <InstagramIcon /> Eventm_agency
                  </Link>
                </Typography>
                <Typography variant="body1" component="div" style={{ margin: 'auto' }}>
                  {t('footerAddress')}
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Footer;
