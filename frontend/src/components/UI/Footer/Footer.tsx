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
                  +996 555 555555 <WhatsAppIcon />
                </Typography>
                <Typography variant="body1" component="div" style={{ margin: 'auto' }}>
                  +996 555 555555
                  <CallIcon />
                </Typography>
              </Grid>
              <Grid container item xs={12} md={3}>
              </Grid>
              <Grid container item direction="column" xs={12} md={5}>
                <Typography variant="body1" component="div" style={{ margin: 'auto' }}>
                  <EmailIcon /> job@gmail.com
                </Typography>
                <Typography variant="body1" component="div" style={{ margin: 'auto' }}>
                  <Link href="https://www.instagram.com/eventm_agency" color="#FFF" underline="none">
                    <InstagramIcon /> Job_Original
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
