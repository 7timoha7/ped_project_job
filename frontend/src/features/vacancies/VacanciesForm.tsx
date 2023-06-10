import React, {useState} from 'react';
import {VacanciesToServer} from "../../types";
import {useAppDispatch} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {Button, Container, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {createVacancies} from "./VacanciesThunks";

const VacanciesForm = () => {
  const [formState, setFormState] = useState<VacanciesToServer>({
    nameOrganisation: '',
    requirements: '',
    vacancyDesc: '',
    vacancyName: '',
    salariesFrom: 0,
    salariesTo: 0,
    region: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createVacancies(formState));
    await setFormState({
      nameOrganisation: '',
      requirements: '',
      vacancyDesc: '',
      vacancyName: '',
      salariesFrom: 0,
      salariesTo: 0,
      region: '',
    });

    await navigate('/my-cabinet');
  };

  const handleRegionChange = (region: string) => {
    setFormState((prevState) => ({
      ...prevState,
      region: region
    }));
  };

  return (
    <>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Vacancy name"
            name="vacancyName"
            value={formState.vacancyName}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name Organisation"
            name="nameOrganisation"
            value={formState.nameOrganisation}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Requirements"
            name="requirements"
            value={formState.requirements}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Salaries from"
            name="salariesFrom"
            value={formState.salariesFrom}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            type="number"
            inputProps={{
              min: '0',
              step: '1',
            }}
            error={Number(formState.salariesFrom) < 0}
            helperText={Number(formState.salariesFrom) < 0 ? 'Invalid value' : ''}
          />
          <TextField
            label="Salaries to"
            name="salariesTo"
            value={formState.salariesTo}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            type="number"
            inputProps={{
              min: '0',
              step: '1',
            }}
            error={Number(formState.salariesTo) < 0 || Number(formState.salariesTo) < Number(formState.salariesFrom)}
            helperText={
              (Number(formState.salariesTo) < 0 || Number(formState.salariesTo) < Number(formState.salariesFrom)) ?
                'Invalid value' : ''
            }
          />

          <FormControl fullWidth sx={{mt: 2}}>
            <InputLabel>{'region'}</InputLabel>
            <Select
              value={formState.region}
              onChange={(e) => handleRegionChange(e.target.value as string)}
              label={'region'}
              required
            >
              <MenuItem value="Bishkek">{'Bishkek'}</MenuItem>
              <MenuItem value="Osh">{'Osh'}</MenuItem>
              <MenuItem value="Narin">{'Narin'}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Vacancy description"
            name="vacancyDesc"
            multiline
            value={formState.vacancyDesc}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            rows={4}
          />

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

export default VacanciesForm;