import React, {useState} from 'react';
import {SummaryToServer} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {createSummary} from "./summaaryThunks";

import {
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {selectLoadingSummary} from "./summarySlice";


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
    jobTitle: '',
    experience: 0,
    region: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectLoadingSummary);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    if (name === 'experience') {
      setFormState((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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
    setFormState({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      education: '',
      educationalInstitution: '',
      startDate: '',
      expirationDate: '',
      desc: '',
      jobTitle: '',
      experience: 0,
      region: '',
    });
    navigate('/my-cabinet');
  };

  const handleRegionChange = (region: string) => {
    setFormState((prevState) => ({
      ...prevState,
      region: region,
    }));
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{
          backgroundImage: 'url(https://images.wallpaperscraft.ru/image/single/komnata_kabinet_stol_39161_1920x1200.jpg)',
        }}>
          <Container maxWidth="sm">
            <Typography variant="h4" component="h1" align="center" mb={2}>
              Create Resume
            </Typography>
            <form onSubmit={handleSubmit}>
              <Card sx={{p: 2, mb: 2}}>
                <TextField
                  label="Job title"
                  name="jobTitle"
                  value={formState.jobTitle}
                  onChange={handleChange}
                  required
                  fullWidth
                  margin="normal"
                />
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
              </Card>

              <Card sx={{p: 2, mt: 2, mb: 2}}>
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
              </Card>

              <Card sx={{p: 2, mb: 2}}>
                <Typography textAlign={'center'} mb={2}>
                  Опыт работы
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputProps={{
                        min: 1,
                      }}
                      label="Experience"
                      type="number"
                      onChange={handleChange}
                      fullWidth
                      margin="normal"
                      name="experience"
                    />
                  </Grid>
                </Grid>
              </Card>

              <Card sx={{p: 2, mb: 2}}>
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
                <Button disabled={loading} type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Card>
            </form>
          </Container>

        </Grid>
      </Grid>
    </>
  );
};

export default SummaryForm;