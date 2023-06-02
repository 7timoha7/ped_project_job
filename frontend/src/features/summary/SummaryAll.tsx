import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectSummary} from "./summarySlice";
import {getSummary} from "./summaaryThunks";
import SummaryCard from "./SummaryCard";

const SummaryAll = () => {
  const summaryAll = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSummary());
  }, [dispatch]);

  return (
    <>
      {summaryAll.map(item => {
        return <SummaryCard item={item} key={item._id}/>
      })}
    </>
  );
};

export default SummaryAll;