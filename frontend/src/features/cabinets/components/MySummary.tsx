import React from 'react';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const MySummary = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate('/summaryForm')}>Create summary</Button>
    </div>
  );
};

export default MySummary;