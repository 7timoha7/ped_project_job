import {createSlice} from '@reduxjs/toolkit';
import type {GlobalSuccess, ValidationError} from '../../types';
import {VacanciesOnServer} from "../../types";
import {RootState} from "../../app/store";
import {createVacancies, getMyVacancies, getVacancies, getVacanciesOne, removeVacancies} from "./vacanciesThunks";

interface VacanciesState {
  vacancies: VacanciesOnServer[];
  myVacancies: VacanciesOnServer[];
  vacanciesOne: VacanciesOnServer | null;
  loadingVacancies: boolean;
  loadingRemove: false | string;
  vacanciesError: ValidationError | null;
  vacanciesSuccess: GlobalSuccess | null;
}

const initialState: VacanciesState = {
  vacancies: [],
  myVacancies: [],
  vacanciesOne: null,
  loadingVacancies: false,
  loadingRemove: false,
  vacanciesError: null,
  vacanciesSuccess: null,
};

export const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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

    builder.addCase(getVacancies.pending, (state) => {
      state.vacancies = [];
      state.loadingVacancies = true;
    });
    builder.addCase(getVacancies.fulfilled, (state, {payload: vacancies}) => {
      state.loadingVacancies = false;
      state.vacancies = vacancies;
    });
    builder.addCase(getVacancies.rejected, (state) => {
      state.loadingVacancies = false;
    });

    builder.addCase(getMyVacancies.pending, (state) => {
      state.myVacancies = [];
      state.loadingVacancies = true;
    });
    builder.addCase(getMyVacancies.fulfilled, (state, {payload: vacancies}) => {
      state.loadingVacancies = false;
      state.myVacancies = vacancies;
    });
    builder.addCase(getMyVacancies.rejected, (state) => {
      state.loadingVacancies = false;
    });

    builder.addCase(removeVacancies.pending, (state, { meta }) => {
      state.loadingRemove = meta.arg;
    });
    builder.addCase(removeVacancies.fulfilled, (state, { payload: success }) => {
      state.loadingRemove = false;
      state.vacanciesSuccess = success;
    });
    builder.addCase(removeVacancies.rejected, (state) => {
      state.loadingRemove = false;
    });

    builder.addCase(getVacanciesOne.pending, (state) => {
      state.loadingVacancies = true;
    });
    builder.addCase(getVacanciesOne.fulfilled, (state, action) => {
      state.loadingVacancies = false;
      state.vacanciesOne = action.payload;
    });
    builder.addCase(getVacanciesOne.rejected, (state) => {
      state.loadingVacancies = false;
    });
  },
});
export const vacanciesReducer = vacanciesSlice.reducer;

export const selectVacancies = (state: RootState) => state.vacancies.vacancies;
export const selectMyVacancies = (state: RootState) => state.vacancies.myVacancies;
export const selectVacanciesOne = (state: RootState) => state.vacancies.vacanciesOne;
export const selectLoadingVacancies = (state: RootState) => state.vacancies.loadingVacancies;
export const selectLoadingRemoveVacancies = (state: RootState) => state.vacancies.loadingRemove;
export const selectVacanciesSuccess = (state: RootState) => state.vacancies.vacanciesSuccess;


