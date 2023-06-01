import React, {useEffect} from 'react';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {getMyVacancies} from "../../vacancies/VacanciesThunks";
import {selectMyVacancies} from "../../vacancies/VacanciesSlice";

const MyVacancies = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const vacancies = useAppSelector(selectMyVacancies);

  useEffect(()=>{
    dispatch(getMyVacancies());
  }, [dispatch])
  return (
    <div>
      <Button onClick={() => navigate('/vacanciesForm')}>Create vacancies</Button>
    </div>
  );
};

export default MyVacancies;