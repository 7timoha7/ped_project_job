import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectSummary} from './summarySlice';
import {getSummary} from './summaaryThunks';
import SummaryCard from './SummaryCard';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {Button} from "@mui/material";

const SummaryAll = () => {
  const summaryAll = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getSummary());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // Добавьте здесь логику поиска
    console.log('Search term:', searchTerm);
  };

  const summarySearch = summaryAll.map((item) => {
    return {label: item.jobTitle};
  });

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={summarySearch}
        getOptionLabel={(option) => option.label}
        sx={{width: 300}}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by specialty"
            value={searchTerm}
            onChange={handleInputChange}
          />
        )}
      />

      <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
        <Button onClick={handleSearch} sx={{mr: 2}}>Найти</Button>
        <TextField
          label="Найти по опыту работы"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </Box>

      {summaryAll.map((item) => {
        return <SummaryCard item={item} key={item._id}/>;
      })}
    </>
  );
};

export default SummaryAll;
