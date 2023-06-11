import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist/es/constants';
import storage from 'redux-persist/lib/storage';
import {usersReducer} from '../features/users/usersSlice';
import {summaryReducer} from "../features/summary/summarySlice";
import {vacanciesReducer} from "../features/vacancies/VacanciesSlice";
import {responseReducer} from "../features/response/ResponseSlice";

const usersPersistConfig = {
  key: 'job:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  summary: summaryReducer,
  vacancies: vacanciesReducer,
  response: responseReducer,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
