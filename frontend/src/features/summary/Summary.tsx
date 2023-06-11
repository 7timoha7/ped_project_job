import React, {useEffect} from 'react';
import {Paper, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../app/hooks";

import {useParams} from "react-router-dom";
import {getSummaryOne} from "./summaaryThunks";
import {selectLoadingSummary, selectSummaryOne} from "./summarySlice";
import Spinner from "../../components/UI/Spinner/Spinner";


const Summary = () => {
  const summary = useAppSelector(selectSummaryOne);
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const loading = useAppSelector(selectLoadingSummary);

  useEffect(() => {
    if (id) {
      dispatch(getSummaryOne(id));
    }

  }, [dispatch, id]);

  return (
    <>
      {loading ? <Spinner/> : <>
        <Paper elevation={3} sx={{padding: '20px', margin: '20px'}}>
          <Typography variant="h4" gutterBottom>
            Summary
          </Typography>
          <Typography variant="body1" gutterBottom>
            Job title: {summary?.jobTitle}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Name: {summary?.firstName} {summary?.lastName}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Email: {summary?.email}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Phone number: {summary?.phoneNumber}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Education: {summary?.education}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Educational institution: {summary?.educationalInstitution}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Start date: {summary?.startDate}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Expiration date: {summary?.expirationDate}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Description: {summary?.desc}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Region: {summary?.region}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Experience: {summary?.experience}
          </Typography>
        </Paper>
      </>}
    </>
  );
};

export default Summary;