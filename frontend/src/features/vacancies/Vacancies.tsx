import React, {useEffect} from 'react';
import {Paper, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectVacanciesOne} from "./VacanciesSlice";
import {useParams} from "react-router-dom";
import {getVacanciesOne} from "./VacanciesThunks";


const Vacancies = () => {
  const vacancies = useAppSelector(selectVacanciesOne);
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getVacanciesOne(id));
    }

  }, [dispatch, id]);

  return (
    <>
      <Paper elevation={3} sx={{padding: '20px', margin: '20px'}}>
        <Typography variant="h4" gutterBottom>
          Job vacancy
        </Typography>
        <Typography variant="h6" gutterBottom>
          Название вакансии: {vacancies?.vacancyName}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Название организации: {vacancies?.nameOrganisation}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Описание вакансии: {vacancies?.vacancyDesc}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Требования к кандидату: {vacancies?.requirements}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Зарплата: {vacancies?.salaries}
        </Typography>
      </Paper>
    </>
  );
};

export default Vacancies;