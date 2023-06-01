import React from 'react';
import {useAppSelector} from '../../app/hooks';
import {selectUser} from '../users/usersSlice';
import UserCabinet from './UserCabinet';
import {Navigate} from 'react-router-dom';


const Cabinet = () => {
  const user = useAppSelector(selectUser);

  let showCabinet;

  switch (user?.role) {
    case 'user':
      showCabinet = <UserCabinet/>;
      break;
    default:
      showCabinet = <Navigate to="/login"/>;
  }
  return <div>{showCabinet}</div>;
};

export default Cabinet;
