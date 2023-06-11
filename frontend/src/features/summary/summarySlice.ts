import {createSlice} from '@reduxjs/toolkit';
import type {GlobalSuccess, ValidationError} from '../../types';
import {SummaryOnServer} from "../../types";
import {RootState} from "../../app/store";
import {createSummary, getMySummary, getSummary, getSummaryOne, removeSummary} from "./summaaryThunks";

interface SummaryState {
  summary: SummaryOnServer[];
  mySummary: SummaryOnServer[];
  summaryOne: SummaryOnServer | null;
  loadingSummary: boolean;
  loadingRemove: false | string;
  summaryError: ValidationError | null;
  summarySuccess: GlobalSuccess | null;
}

const initialState: SummaryState = {
  summary: [],
  mySummary: [],
  summaryOne: null,
  loadingSummary: false,
  loadingRemove: false,
  summaryError: null,
  summarySuccess: null,
};

export const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createSummary.pending, (state) => {
      state.summaryError = null;
      state.loadingSummary = true;
    });
    builder.addCase(createSummary.fulfilled, (state, {payload: success}) => {
      state.loadingSummary = false;
      state.summarySuccess = success;
    });
    builder.addCase(createSummary.rejected, (state, {payload: error}) => {
      state.loadingSummary = false;
      state.summaryError = error || null;
    });

    builder.addCase(getSummary.pending, (state) => {
      state.summary = [];
      state.loadingSummary = true;
    });
    builder.addCase(getSummary.fulfilled, (state, {payload: summary}) => {
      state.loadingSummary = false;
      state.summary = summary;
    });
    builder.addCase(getSummary.rejected, (state) => {
      state.loadingSummary = false;
    });

    builder.addCase(getMySummary.pending, (state) => {
      state.mySummary = [];
      state.loadingSummary = true;
    });
    builder.addCase(getMySummary.fulfilled, (state, {payload: summary}) => {
      state.loadingSummary = false;
      state.mySummary = summary;
    });
    builder.addCase(getMySummary.rejected, (state) => {
      state.loadingSummary = false;
    });

    builder.addCase(removeSummary.pending, (state, { meta }) => {
      state.loadingRemove = meta.arg;
    });
    builder.addCase(removeSummary.fulfilled, (state, { payload: success }) => {
      state.loadingRemove = false;
      state.summarySuccess = success;
    });
    builder.addCase(removeSummary.rejected, (state) => {
      state.loadingRemove = false;
    });

    builder.addCase(getSummaryOne.pending, (state) => {
      state.loadingSummary = true;
    });
    builder.addCase(getSummaryOne.fulfilled, (state, action) => {
      state.loadingSummary = false;
      state.summaryOne = action.payload;
    });
    builder.addCase(getSummaryOne.rejected, (state) => {
      state.loadingSummary = false;
    });


  },
});
export const summaryReducer = summarySlice.reducer;

export const selectSummary = (state: RootState) => state.summary.summary;
export const selectMySummary = (state: RootState) => state.summary.mySummary;
export const selectSummaryOne = (state: RootState) => state.summary.summaryOne;
export const selectLoadingSummary = (state: RootState) => state.summary.loadingSummary;
export const selectLoadingRemoveSummary = (state: RootState) => state.summary.loadingRemove;
export const selectSummarySuccess = (state: RootState) => state.summary.summarySuccess;


