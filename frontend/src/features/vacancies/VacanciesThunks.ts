import {createAsyncThunk} from "@reduxjs/toolkit";
import {
  GlobalSuccess,
  SearchType,
  SummaryOnServer,
  VacanciesOnServer,
  VacanciesToServer,
  ValidationError
} from "../../types";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";
import {RootState} from "../../app/store";

export const createVacancies = createAsyncThunk<GlobalSuccess, VacanciesToServer, {
  state: RootState;
  rejectValue: ValidationError
}>(
  'vacancies/createVacancies',
  async (vacancies, {getState, rejectWithValue}) => {
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

// export const getVacancies = createAsyncThunk<VacanciesOnServer[]>('vacancies/getVacancies', async () => {
//   try {
//     const responseOrders = await axiosApi.get<VacanciesOnServer[]>('/vacancies');
//     return responseOrders.data;
//   } catch {
//     throw new Error();
//   }
// });

export const getVacancies = createAsyncThunk<VacanciesOnServer[], SearchType | undefined>('vacancies/getVacancies', async (search) => {
  try {
    if (search?.region) {
      const response = await axiosApi.get<VacanciesOnServer[]>('vacancies?region=' + search.region);
      return response.data;
    } else if (search?.salary) {
      const {salariesFrom, salariesTo} = search.salary;
      const response = await axiosApi.get<VacanciesOnServer[]>('vacancies?salaryFrom=' + salariesFrom + '&salaryTo=' + salariesTo);
      return response.data;
    }
    const response = await axiosApi.get<VacanciesOnServer[]>('/summary');
    return response.data;
  } catch {
    throw new Error();
  }
});

export const getMyVacancies = createAsyncThunk<VacanciesOnServer[]>('vacancies/getMyVacancies', async () => {
  try {
    const responseOrders = await axiosApi.get<VacanciesOnServer[]>('/vacancies/myVacancies');
    return responseOrders.data;
  } catch {
    throw new Error();
  }
});

export const getVacanciesOne = createAsyncThunk<VacanciesOnServer, string>('vacancies/getVacanciesOne', async (id) => {
  try {
    const responseOrders = await axiosApi.get<VacanciesOnServer>('/vacancies/' + id);
    return responseOrders.data;
  } catch {
    throw new Error();
  }
});

export const removeVacancies = createAsyncThunk<GlobalSuccess, string>('vacancies/removeVacancies', async (id) => {
  try {
    const response = await axiosApi.delete<GlobalSuccess>('/vacancies/vacanciesDelete/' + id);
    return response.data;
  } catch {
    throw new Error();
  }
});
