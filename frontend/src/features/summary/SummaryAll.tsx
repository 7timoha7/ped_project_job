import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectLoadingSummary, selectSummary} from './summarySlice';
import {getSummary} from './summaaryThunks';
import SummaryCard from './SummaryCard';
import TextField from '@mui/material/TextField';
import {Button, Card, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import {SearchType} from "../../types";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import Spinner from "../../components/UI/Spinner/Spinner";

const SummaryAll = () => {
  const [searchTerm, setSearchTerm] = useState<SearchType>({
    experience: null,
    region: null,
  });
  const summaryAll = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoadingSummary);

  useEffect(() => {
    dispatch(getSummary());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    if (name === 'experience') {
      setSearchTerm({
        [name]: parseInt(value),
        region: null,
      });
    }
  };

  const handleRegionChange = (region: string) => {
    setSearchTerm({
      region: region,
      experience: null,
    });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(getSummary(searchTerm));
  };

  return (
    <>
      <Card sx={{p: 2, mb: 2}}>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <TextField
                label="By experience"
                value={searchTerm.experience ?? ''}
                onChange={handleInputChange}
                type="number"
                name="experience"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4}>
              <Button color="success" type={'submit'} variant="contained">
                <ContentPasteSearchIcon/>
              </Button>
            </Grid>
          </Grid>
        </form>

        <form onSubmit={handleSearch}>
          <Grid container spacing={2} alignItems="center" mt={2}>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel>By region</InputLabel>
                <Select
                  value={searchTerm.region ? searchTerm.region : ''}
                  onChange={(e) => handleRegionChange(e.target.value as string)}
                  label="By region"
                  required
                >
                  <MenuItem value="Bishkek">Bishkek</MenuItem>
                  <MenuItem value="Osh">Osh</MenuItem>
                  <MenuItem value="Narin">Narin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Button color="success" size="medium" type={'submit'} variant="contained">
                <ContentPasteSearchIcon/>
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>

      {loading ? <Spinner/> :
        <Card sx={{p: 2, mb: 2}}>
          {summaryAll.map((item) => {
            return <SummaryCard item={item} key={item._id}/>;
          })}
        </Card>}
    </>
  );
};

export default SummaryAll;
