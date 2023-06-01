import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalSuccess, VacanciesToServer, ValidationError} from "../../types";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";
import {RootState} from "../../app/store";


// export const createVacancies = createAsyncThunk<void, VacanciesToServer, { rejectValue: ValidationError }>(
//   'vacancies/createVacancies',
//   async (vacancies, {rejectWithValue}) => {
//     try {
//       const formData = new FormData();
//       const keys = Object.keys(vacancies) as (keyof VacanciesToServer)[];
//       keys.forEach((key) => {
//         const value = vacancies[key];
//         if (value !== null) {
//           formData.append(key, value);
//         }
//       });
//       console.log(vacancies);
//       const response = await axiosApi.post('/vacancies', vacancies);
//       return response.data;
//     } catch (e) {
//       if (isAxiosError(e) && e.response && e.response.status === 400) {
//         return rejectWithValue(e.response.data as ValidationError);
//       }
//       throw e;
//     }
//   });

export const createVacancies = createAsyncThunk<GlobalSuccess, VacanciesToServer, { state: RootState; rejectValue: ValidationError }>(
  'vacancies/createVacancies',
  async (vacancies, { getState, rejectWithValue }) => {
    const user = getState().users.user;
    try {
      if (user) {
        const response = await axiosApi.post('/vacancies', vacancies);
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

export const getVacancies = createAsyncThunk<VacanciesToServer[]>('vacancies/getVacancies', async () => {
  try {
    const responseOrders = await axiosApi.get<VacanciesToServer[]>('/vacancies');
    return responseOrders.data;
  } catch {
    throw new Error();
  }
});

export const getMyVacancies = createAsyncThunk<VacanciesToServer[]>('vacancies/getMyVacancies', async () => {
  try {
    const responseOrders = await axiosApi.get<VacanciesToServer[]>('/vacancies/myVacancies');
    return responseOrders.data;
  } catch {
    throw new Error();
  }
});
