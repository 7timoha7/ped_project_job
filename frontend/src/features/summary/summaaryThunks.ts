import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalSuccess, SummaryToServer, SummaryOnServer, ValidationError, SearchType} from "../../types";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";
import {RootState} from "../../app/store";

export const createSummary = createAsyncThunk<GlobalSuccess, SummaryToServer, { state: RootState; rejectValue: ValidationError }>(
  'summary/createSummary',
  async (summary, { getState, rejectWithValue }) => {
    const user = getState().users.user;
    try {
      if (user) {
        const response = await axiosApi.post('/summary', summary);
        return response.data;
      }
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);

export const getSummary = createAsyncThunk<SummaryOnServer[], SearchType | undefined>('summary/getSummary', async ( search) => {
  try {
    if (search?.experience) {
      const response = await axiosApi.get<SummaryOnServer[]>('summary?experience=' + search.experience);
      return response.data;
    } else if (search?.region) {
      const response = await axiosApi.get<SummaryOnServer[]>('summary?region=' + search.region);
      return response.data;
    }
    const response = await axiosApi.get<SummaryOnServer[]>('/summary');
    return response.data;
  } catch {
    throw new Error();
  }
});

export const getMySummary = createAsyncThunk<SummaryOnServer[]>('summary/getMySummary', async () => {
  try {
    const responseOrders = await axiosApi.get<SummaryOnServer[]>('/summary/mySummary');
    return responseOrders.data;
  } catch {
    throw new Error();
  }
});

export const getSummaryOne = createAsyncThunk<SummaryOnServer, string>('summary/getSummaryOne', async (id) => {
  try {
    const responseOrders = await axiosApi.get<SummaryOnServer>('/summary/' + id);
    return responseOrders.data;
  } catch {
    throw new Error();
  }
});

export const removeSummary = createAsyncThunk<GlobalSuccess, string>('summary/removeSummary', async (id) => {
  try {
    const response = await axiosApi.delete<GlobalSuccess>('/summary/summaryDelete/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});
