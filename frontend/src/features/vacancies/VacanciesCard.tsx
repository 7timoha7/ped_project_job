import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';

const resumeData = {
  nameOrganisation: 'Название организации',
  requirements: 'Требования к кандидату',
  salaries: 'Зарплата',
  vacancyDesc: 'Описание вакансии',
  vacancyName: 'Название вакансии',
};

const VacanciesCard = () => {
  return (
    <>
      <Card variant="outlined" sx={{maxWidth: '100%', margin: '20px auto'}}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {resumeData.vacancyName}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            {resumeData.nameOrganisation}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default VacanciesCard;