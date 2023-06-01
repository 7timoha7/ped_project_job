import {createSlice} from '@reduxjs/toolkit';
import type {GlobalSuccess, VacanciesToServer, ValidationError} from '../../types';
import {RootState} from "../../app/store";
import {createVacancies} from "./VacanciesThunks";

interface VacanciesState {
  vacancies: VacanciesToServer[];
  loadingVacancies: boolean;
  vacanciesError: ValidationError | null;
  vacanciesSuccess: GlobalSuccess | null;
}

const initialState: VacanciesState = {
  vacancies: [],
  loadingVacancies: false,
  vacanciesError: null,
  vacanciesSuccess: null,
};

export const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(createVacancies.pending, (state) => {
    //   state.loadingVacancies = true;
    //   state.vacanciesError = null;
    // });
    // builder.addCase(createVacancies.fulfilled, (state) => {
    //   state.loadingVacancies = false;
    // });
    // builder.addCase(createVacancies.rejected, (state, {payload: error}) => {
    //   state.loadingVacancies = false;
    //   state.vacanciesError = error || null;
    // });

    builder.addCase(createVacancies.pending, (state) => {
      state.vacanciesError = null;
      state.loadingVacancies = true;
    });
    builder.addCase(createVacancies.fulfilled, (state, {payload: success}) => {
      state.loadingVacancies = false;
      state.vacanciesSuccess = success;
    });
    builder.addCase(createVacancies.rejected, (state, {payload: error}) => {
      state.loadingVacancies = false;
      state.vacanciesError = error || null;
    });


  },
});
export const vacanciesReducer = vacanciesSlice.reducer;

export const selectVacancies = (state: RootState) => state.vacancies.vacancies;
export const selectLoadingCreateVacancies = (state: RootState) => state.vacancies.loadingVacancies;

