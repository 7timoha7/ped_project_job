import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalSuccess, ResponseOnServer, ResponseToServer, SummaryOnServer, ValidationError} from "../../types";
import {RootState} from "../../app/store";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";

export const createResponse = createAsyncThunk<GlobalSuccess, ResponseToServer, {
  state: RootState;
  rejectValue: ValidationError
}>(
  'response/createResponse',
  async (responseToServer, {getState, rejectWithValue}) => {
    const user = getState().users.user;
    try {
      if (user) {
        const response = await axiosApi.post('/response', responseToServer);
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

export const getMyResponse = createAsyncThunk<ResponseOnServer[]>('response/getMyResponse', async () => {
  try {
    const responseOrders = await axiosApi.get<ResponseOnServer[]>('/response/myResponse');
    return responseOrders.data;
  } catch {
    throw new Error();
  }
});

export const getSummaryUser = createAsyncThunk<SummaryOnServer[], string>('response/getSummaryUser', async (id) => {
  try {
    const response = await axiosApi.get<SummaryOnServer[]>('/response/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});

export const responseNew = createAsyncThunk<void, string>('response/responseNew', async (id) => {
  try {
  await axiosApi.patch('/response/responseNew/' + id);
  } catch {
    throw new Error();
  }
});



