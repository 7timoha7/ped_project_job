import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getVacancies} from "./VacanciesThunks";
import {selectVacancies} from "./VacanciesSlice";
import VacanciesCard from "./VacanciesCard";
import {SearchType} from "../../types";
import {Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

const VacanciesAll = () => {
  const [searchTerm, setSearchTerm] = useState<SearchType>({
    salary: {
      salariesFrom: null,
      salariesTo: null,
    },
    region: null,
  });
  const vacanciesAll = useAppSelector(selectVacancies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVacancies());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setSearchTerm((prevState) => ({
      ...prevState,
      salary: {
        salariesFrom: name === 'salariesFrom' ? (value !== '' ? parseInt(value) : null) : prevState.salary?.salariesFrom ?? null,
        salariesTo: name === 'salariesTo' ? (value !== '' ? parseInt(value) : null) : prevState.salary?.salariesTo ?? null,
      },
    }));
  };

  const handleRegionChange = (region: string) => {
    setSearchTerm({
      region: region,
      salary: {
        salariesFrom: null,
        salariesTo: null,
      }
    });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(getVacancies(searchTerm));
  };

  return (
    <>
      <Card sx={{p: 2, mb: 2}}>
        <form onSubmit={handleSearch}>
          <Grid container alignItems="center" justifyContent={"space-between"} textAlign={"center"}>
            <Card sx={{p: 2, mb: 2}}>
              <Typography>Find by salary fork</Typography>
              <Grid item sx={{mt: 2}}>
                <TextField
                  label="Salaries from"
                  value={searchTerm.salary?.salariesFrom ? searchTerm.salary?.salariesFrom : ''}
                  onChange={handleInputChange}
                  type="number"
                  name="salariesFrom"
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item mt={2}>
                <TextField
                  label="Salaries to"
                  value={searchTerm.salary?.salariesTo ? searchTerm.salary?.salariesTo : ''}
                  onChange={handleInputChange}
                  type="number"
                  name="salariesTo"
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
            </Card>

            <Grid item>
              <Button type={"submit"} color="success" variant="contained">
                <ContentPasteSearchIcon/>
              </Button>
            </Grid>
          </Grid>
        </form>

        <form onSubmit={handleSearch}>
          <Grid container spacing={2} alignItems="center" mt={2} justifyContent={"space-between"} sx={{borderTop: '2px solid gray'}}>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel>By region</InputLabel>
                <Select
                  value={searchTerm.region ?? ''}
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
            <Grid item>
              <Button type={"submit"} color="success" size="medium" variant="contained">
                <ContentPasteSearchIcon/>
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>

      {vacanciesAll.map(item => {
        return <VacanciesCard item={item} key={item._id}/>
      })}
    </>
  );
};

export default VacanciesAll;