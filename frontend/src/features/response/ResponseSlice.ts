import {createSlice} from '@reduxjs/toolkit';
import type {GlobalSuccess, SummaryOnServer, ValidationError} from '../../types';
import {ResponseOnServer} from "../../types";
import {RootState} from "../../app/store";
import {createResponse, getMyResponse, getSummaryUser} from "./ResponseThunks";

interface ResponseState {
  myResponse: ResponseOnServer[];
  userSummary: SummaryOnServer[];
  loadingResponse: boolean;
  responseError: ValidationError | null;
  responseSuccess: GlobalSuccess | null;
}

const initialState: ResponseState = {
  myResponse: [],
  userSummary: [],
  loadingResponse: false,
  responseError: null,
  responseSuccess: null,
};

export const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createResponse.pending, (state) => {
      state.responseError = null;
      state.loadingResponse = true;
    });
    builder.addCase(createResponse.fulfilled, (state, {payload: success}) => {
      state.loadingResponse = false;
      state.responseSuccess = success;
    });
    builder.addCase(createResponse.rejected, (state, {payload: error}) => {
      state.loadingResponse = false;
      state.responseError = error || null;
    });

    builder.addCase(getMyResponse.pending, (state) => {
      state.myResponse = [];
      state.loadingResponse = true;
    });
    builder.addCase(getMyResponse.fulfilled, (state, {payload: response}) => {
      state.loadingResponse = false;
      state.myResponse = response;
    });
    builder.addCase(getMyResponse.rejected, (state) => {
      state.loadingResponse = false;
    });

    builder.addCase(getSummaryUser.pending, (state) => {
      state.loadingResponse = true;
    });
    builder.addCase(getSummaryUser.fulfilled, (state, {payload: summary}) => {
      state.loadingResponse = false;
      state.userSummary = summary;
    });
    builder.addCase(getSummaryUser.rejected, (state) => {
      state.loadingResponse = false;
    });


  },
});
export const responseReducer = responseSlice.reducer;

export const selectMyResponse = (state: RootState) => state.response.myResponse;
export const selectLoadingCreateResponse = (state: RootState) => state.response.loadingResponse;
export const selectResponseSuccess = (state: RootState) => state.response.responseSuccess;


