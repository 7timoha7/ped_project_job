import React, {useEffect} from 'react';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectMySummary} from "../../summary/summarySlice";
import {getMySummary} from "../../summary/summaaryThunks";
import SummaryCard from "../../summary/SummaryCard";

const MySummary = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const summery = useAppSelector(selectMySummary);

  useEffect(() => {
    dispatch(getMySummary());
  }, [dispatch])

  return (
    <div>
      <Button onClick={() => navigate('/summaryForm')}>Create summary</Button>
      {summery.map(item => {
        return <SummaryCard item={item} key={item._id}/>
      })}
    </div>
  );
};

export default MySummary;