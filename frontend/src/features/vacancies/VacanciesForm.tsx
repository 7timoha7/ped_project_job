import React, {useState} from 'react';
import {VacanciesToServer} from "../../types";
import {useAppDispatch} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {Button, Container, TextField} from "@mui/material";
import {createVacancies} from "./VacanciesThunks";


const VacanciesForm = () => {
  const [formState, setFormState] = useState<VacanciesToServer>({
    nameOrganisation: '',
    requirements: '',
    salaries: '',
    vacancyDesc: '',
    vacancyName: '',
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
      salaries: '',
      vacancyDesc: '',
      vacancyName: '',
    });

    await navigate('/myCabinet');
  };

  return (
    <>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
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
            label="Salaries"
            name="salaries"
            value={formState.salaries}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Vacancy description"
            name="vacancyDesc"
            value={formState.vacancyDesc}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Vacancy name"
            name="vacancyName"
            value={formState.vacancyName}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
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