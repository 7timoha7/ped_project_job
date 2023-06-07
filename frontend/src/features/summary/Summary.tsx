import React, {useEffect} from 'react';
import {Paper, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../app/hooks";

import {useParams} from "react-router-dom";
import {getSummaryOne} from "./summaaryThunks";
import {selectSummaryOne} from "./summarySlice";


const Summary = () => {
  const summary = useAppSelector(selectSummaryOne);
  const dispatch = useAppDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getSummaryOne(id));
    }

  }, [dispatch, id]);

  return (
    <>
      <Paper elevation={3} sx={{ padding: '20px', margin: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Резюме
        </Typography>
        <Typography variant="body1" gutterBottom>
          Должность: {summary?.jobTitle}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Имя: {summary?.firstName} {summary?.lastName}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Email: {summary?.email}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Номер телефона: {summary?.phoneNumber}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Образование: {summary?.education}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Учебное заведение: {summary?.educationalInstitution}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Дата начала: {summary?.startDate}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Дата окончания: {summary?.expirationDate}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Описание: {summary?.desc}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Регион: {summary?.region}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Опыт: {summary?.experience}
        </Typography>
      </Paper>
    </>
  );
};

export default Summary;