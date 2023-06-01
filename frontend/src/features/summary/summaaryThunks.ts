import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalSuccess, SummaryToServer, ValidationError} from "../../types";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";
import {RootState} from "../../app/store";


// export const createSummary = createAsyncThunk<void, SummaryToServer, { rejectValue: ValidationError }>(
//   'summary/createSummary',
//   async (summary, {rejectWithValue}) => {
//     try {
//       const formData = new FormData();
//       const keys = Object.keys(summary) as (keyof SummaryToServer)[];
//       keys.forEach((key) => {
//         const value = summary[key];
//         if (value !== null) {
//           formData.append(key, value);
//         }
//       });
//       console.log(summary);
//       const response = await axiosApi.post('/summary', summary);
//       return response.data;
//     } catch (e) {
//       if (isAxiosError(e) && e.response && e.response.status === 400) {
//         return rejectWithValue(e.response.data as ValidationError);
//       }
//       throw e;
//     }
//   });

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
