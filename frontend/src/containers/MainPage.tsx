import React from 'react';
import {useTranslation} from 'react-i18next';
import {Container, Paper, Typography} from "@mui/material";
import summaryImg from "../../src/assets/images/resume.jpg";
import vacanciesImg from "../../src/assets/images/vacacies.jpg"

const MainPage = () => {
  const {t} = useTranslation();
  return (
    <>
      <Container>
        <Paper
          elevation={3}
          sx={{
            position: 'relative',
            padding: '20px',
            margin: '20px',
            backgroundImage: `url(${summaryImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '300px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <a href="/summaryAll" style={{color: 'white', textDecoration: 'none'}}>
              <Typography variant="h4">
                {t('forEmployers')}
              </Typography>
            </a>
          </div>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            position: 'relative',
            padding: '20px',
            margin: '20px',
            backgroundImage: `url(${vacanciesImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '300px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <a href="/vacanciesAll" style={{color: 'white', textDecoration: 'none'}}>
              <Typography variant="h4">
                {t('jobSearch')}
              </Typography>
            </a>
          </div>
        </Paper>
      </Container>

    </>
  );
};

export default MainPage;
