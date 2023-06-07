import React, {useState} from 'react';
import {SummaryToServer} from "../../types";
import {useAppDispatch} from "../../app/hooks";
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
    experience: '',
    region: '',
  });

  const [experienceState, setExperienceState] = useState<{
    startDate: string;
    expirationDate: string;
    experience: string;
  }>({
    startDate: '',
    expirationDate: '',
    experience: '',
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
      jobTitle: '',
      experience: experienceState.experience,
      region: '',
    });

    await navigate('/my-cabinet');
  };

  const handleStartDateExperienceChange = (date: Date | null) => {
    const startDate = date ? dayjs(date).format('DD.MM.YYYY') : '';
    const expirationDate = experienceState.expirationDate;
    const newExperience = calculateExperience(startDate, expirationDate);

    setExperienceState((prevState) => ({
      ...prevState,
      startDate,
      experience: newExperience,
    }));

    setFormState((prevState) => ({
      ...prevState,
      experience: newExperience,
    }));
  };

  const handleExpirationDateExperienceChange = (date: Date | null) => {
    const startDate = experienceState.startDate;
    const expirationDate = date ? dayjs(date).format('DD.MM.YYYY') : '';
    const newExperience = calculateExperience(startDate, expirationDate);

    setExperienceState((prevState) => ({
      ...prevState,
      expirationDate,
      experience: newExperience,
    }));

    setFormState((prevState) => ({
      ...prevState,
      experience: newExperience,
    }));
  };

  const handleRegionChange = (region: string) => {
    setFormState((prevState) => ({
      ...prevState,
      region: region
    }));
  };

  const calculateExperience = (startDate: string, expirationDate: string): string => {
    if (startDate && expirationDate) {
      const start = dayjs(startDate, 'DD.MM.YYYY');
      const end = dayjs(expirationDate, 'DD.MM.YYYY');
      const yearsDiff = end.diff(start, 'year');
      const monthsDiff = end.diff(start, 'month') % 12;
      const experience =
        yearsDiff + (monthsDiff > 0 ? monthsDiff / 12 : 0);
      return experience.toFixed(1);
    }
    return '';
  };

  return (
    <>
      <Container maxWidth="sm">
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <MobileDatePicker
                    label="Start Date"
                    value={experienceState.startDate ? dayjs(experienceState.startDate, 'DD.MM.YYYY').toDate() : null}
                    onChange={handleStartDateExperienceChange}
                    format="DD.MM.YYYY"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MobileDatePicker
                    label="Expiration Date"
                    value={experienceState.expirationDate ? dayjs(experienceState.expirationDate, 'DD.MM.YYYY').toDate() : null}
                    onChange={handleExpirationDateExperienceChange}
                    format="DD.MM.YYYY"
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Card>

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
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

export default SummaryForm;