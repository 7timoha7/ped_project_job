import React from 'react';
import {Typography, Paper} from '@mui/material';

const resumeData = {
  nameOrganisation: 'Название организации',
  requirements: 'Требования к кандидату',
  salaries: 'Зарплата',
  vacancyDesc: 'Описание вакансии',
  vacancyName: 'Название вакансии',
};
const Vacancies = () => {
  return (
    <>
      <Paper elevation={3} sx={{padding: '20px', margin: '20px'}}>
        <Typography variant="h4" gutterBottom>
          Резюме
        </Typography>
        <Typography variant="h6" gutterBottom>
          Название вакансии: {resumeData.vacancyName}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Название организации: {resumeData.nameOrganisation}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Описание вакансии: {resumeData.vacancyDesc}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Требования к кандидату: {resumeData.requirements}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Зарплата: {resumeData.salaries}
        </Typography>
      </Paper>
    </>
  );
};

export default Vacancies;