import React from 'react';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const MyVacancies = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate('/vacanciesForm')}>Create vacancies</Button>

    </div>
  );
};

export default MyVacancies;