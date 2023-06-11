import React, {useEffect} from 'react';
import {Paper, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLoadingVacancies, selectVacanciesOne} from "./vacanciesSlice";
import {useParams} from "react-router-dom";
import {getVacanciesOne} from "./vacanciesThunks";
import Spinner from "../../components/UI/Spinner/Spinner";


const Vacancies = () => {
  const vacancies = useAppSelector(selectVacanciesOne);
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const loading = useAppSelector(selectLoadingVacancies);

  useEffect(() => {
    if (id) {
      dispatch(getVacanciesOne(id));
    }

  }, [dispatch, id]);

  return (
    <>
      {loading ? <Spinner/> : <>
        <Paper elevation={3} sx={{padding: '20px', margin: '20px'}}>
          <Typography variant="h4" gutterBottom>
            Job vacancy
          </Typography>
          <Typography variant="h6" gutterBottom>
            Job Title: {vacancies?.vacancyName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Name of the organization: {vacancies?.nameOrganisation}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Vacancy description: {vacancies?.vacancyDesc}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Requirements for a candidate: {vacancies?.requirements}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Region: {vacancies?.region}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Salary: {vacancies?.salariesFrom + ' - ' + vacancies?.salariesTo}
          </Typography>
        </Paper>
      </>}
    </>
  );
};

export default Vacancies;