import React, {useState} from 'react';
import {SummaryToServer} from "../../types";
import {useAppDispatch} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {createSummary} from "./summaaryThunks";
import {Button, Container, Grid, TextField} from "@mui/material";
import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


const SummaryForm = () => {
  const [formState, setFormState] = useState<SummaryToServer>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    education: '',
    educationalInstitution: '',
    startDate: '',
    expirationDate: '',
    desc: '',
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

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      const startDateString = dayjs(date).format('YYYY-MM-DD');
      setFormState((prevState) => ({
        ...prevState,
        startDate: startDateString,
      }));
    }
  };

  const handleExpirationDateChange = (date: Date | null) => {
    if (date) {
      const expirationDateString = dayjs(date).format('YYYY-MM-DD');
      setFormState((prevState) => ({
        ...prevState,
        expirationDate: expirationDateString,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createSummary(formState));
    await setFormState({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      education: '',
      educationalInstitution: '',
      startDate: '',
      expirationDate: '',
      desc: '',
    });

    await navigate('/myCabinet');
  };

  return (
    <>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formState.phoneNumber}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Education"
            name="education"
            value={formState.education}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Educational Institution"
            name="educationalInstitution"
            value={formState.educationalInstitution}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MobileDatePicker
                  label="Start Date"
                  value={formState.startDate ? dayjs(formState.startDate).toDate() : null}
                  onChange={handleStartDateChange}
                  format="DD.MM.YYYY"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MobileDatePicker
                  label="Expiration Date"
                  value={formState.expirationDate ? dayjs(formState.expirationDate).toDate() : null}
                  onChange={handleExpirationDateChange}
                  format="DD.MM.YYYY"
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
          <TextField
            label="Description"
            name="desc"
            multiline
            value={formState.desc}
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

export default SummaryForm;