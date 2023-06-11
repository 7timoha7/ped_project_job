import React, {useEffect} from 'react';
import {Container} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getMyResponse} from "./ResponseThunks";
import {selectLoadingCreateResponse, selectMyResponse} from "./ResponseSlice";
import ResponseCard from "./ResponseCard";
import Spinner from "../../components/UI/Spinner/Spinner";

const Response = () => {
  const dispatch = useAppDispatch();
  const response = useAppSelector(selectMyResponse);
  const loading = useAppSelector(selectLoadingCreateResponse);

  useEffect(() => {
    dispatch(getMyResponse());
  }, [dispatch]);
  return (
    <>
      {loading ? <Spinner/> :
        <Container>
          {response.map(item => {
            return <ResponseCard item={item} key={item._id}/>
          })}
        </Container>}
    </>
  );
};

export default Response;