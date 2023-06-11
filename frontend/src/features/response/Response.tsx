import React, {useEffect} from 'react';
import {Container} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getMyResponse} from "./ResponseThunks";
import {selectMyResponse} from "./ResponseSlice";
import ResponseCard from "./ResponseCard";

const Response = () => {
  const dispatch = useAppDispatch();
  const response = useAppSelector(selectMyResponse);
  useEffect(() => {
    dispatch(getMyResponse());
  }, [dispatch]);
  return (
    <>
      <Container>
        {response.map(item=>{
          return <ResponseCard item={item} key={item._id}/>
        })}
      </Container>
    </>
  );
};

export default Response;