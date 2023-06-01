import {createSlice} from '@reduxjs/toolkit';
import type {GlobalSuccess, SummaryToServer, ValidationError} from '../../types';
import {RootState} from "../../app/store";
import {createSummary} from "./summaaryThunks";

interface SummaryState {
  summary: SummaryToServer[];
  loadingSummary: boolean;
  summaryError: ValidationError | null;
  summarySuccess: GlobalSuccess | null;
}

const initialState: SummaryState = {
  summary: [],
  loadingSummary: false,
  summaryError: null,
  summarySuccess: null,
};

export const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(createSummary.pending, (state) => {
    //   state.loadingSummary = true;
    //   state.summaryError = null;
    // });
    // builder.addCase(createSummary.fulfilled, (state) => {
    //   state.loadingSummary = false;
    // });
    // builder.addCase(createSummary.rejected, (state, {payload: error}) => {
    //   state.loadingSummary = false;
    //   state.summaryError = error || null;
    // });

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


  },
});
export const summaryReducer = summarySlice.reducer;

export const selectSummary = (state: RootState) => state.summary.summary;
export const selectLoadingCreateSummary = (state: RootState) => state.summary.loadingSummary;

