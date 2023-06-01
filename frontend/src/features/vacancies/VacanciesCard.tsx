import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';
import {VacanciesOnServer} from "../../types";

interface Props {
  item: VacanciesOnServer
}

const VacanciesCard: React.FC<Props> = ({item}) => {
  return (
    <>
      <Card variant="outlined" sx={{maxWidth: '100%', margin: '20px auto'}}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {item.vacancyName}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            {item.nameOrganisation}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default VacanciesCard;