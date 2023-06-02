import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getVacancies} from "./VacanciesThunks";
import {selectVacancies} from "./VacanciesSlice";
import VacanciesCard from "./VacanciesCard";

const VacanciesAll = () => {
  const vacanciesAll = useAppSelector(selectVacancies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVacancies());
  }, [dispatch]);

  return (
    <>
      {vacanciesAll.map(item => {
        return <VacanciesCard item={item} key={item._id}/>
      })}
    </>
  );
};

export default VacanciesAll;