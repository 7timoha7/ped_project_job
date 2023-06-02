import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {selectUser, selectUserSuccess, setUserSuccessNull} from './features/users/usersSlice';
import {useAppDispatch, useAppSelector} from './app/hooks';
import Home from './containers/Home';
import MainPage from './containers/MainPage';
import Login from './features/users/Login';
import Register from './features/users/Register';
import ProtectedRoute from './components/UI/ProtectedRoute/ProtectedRoute';
import NoFoundPage from './components/UI/NoFoundPage/NoFoundPage';
import {useSnackbar} from 'notistack';
import {useTranslation} from 'react-i18next';
import VerifyProtectedRoute from './components/UI/ProtectedRoute/VerifyProtectedRoute';
import VerifyPage from './components/UI/VerifyPage/VerifyPage';
import ConfirmPage from './components/UI/VerifyPage/ConfirmPage';
import SummaryForm from "./features/summary/SummaryForm";
import VacanciesForm from "./features/vacancies/VacanciesForm";
import UserCabinet from "./features/cabinets/UserCabinet";
import {selectVacanciesSuccess} from "./features/vacancies/VacanciesSlice";
import Vacancies from "./features/vacancies/Vacancies";
import Summary from "./features/summary/Summary";

function App() {
  const user = useAppSelector(selectUser);
  const userSuccess = useAppSelector(selectUserSuccess);
  const vacanciesSuccess = useAppSelector(selectVacanciesSuccess);
  const dispatch = useAppDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const {i18n} = useTranslation();

  useEffect(() => {
    if (userSuccess) {
      if (i18n.language === 'en') {
        enqueueSnackbar(userSuccess.message.en, {
          variant: 'success',
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar(userSuccess.message.ru, {
          variant: 'success',
          preventDuplicate: true,
        });
      }
    }
    dispatch(setUserSuccessNull());
  }, [userSuccess, i18n.language, dispatch, enqueueSnackbar]);

  useEffect(() => {
    if (vacanciesSuccess) {
      if (i18n.language === 'en') {
        enqueueSnackbar(vacanciesSuccess.message.en, {
          variant: 'success',
          preventDuplicate: true,
        });
      } else {
        enqueueSnackbar(vacanciesSuccess.message.ru, {
          variant: 'success',
          preventDuplicate: true,
        });
      }
    }
    dispatch(setUserSuccessNull());
  }, [vacanciesSuccess, i18n.language, dispatch, enqueueSnackbar]);

  return (
    <Routes>
      <Route path="/" element={<Home/>}>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/vacancies/:id" element={<Vacancies/>}/>
        <Route path="/summary/:id" element={<Summary/>}/>

        <Route
          path="/my-cabinet"
          element={
            <VerifyProtectedRoute isVerify={user && user.isVerified}>
              <UserCabinet/>
            </VerifyProtectedRoute>
          }
        />
        <Route
          path="/verifyPage"
          element={
            <ProtectedRoute isAllowed={user && Boolean(user)}>
              <VerifyPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify/:token"
          element={
            <ProtectedRoute isAllowed={user && Boolean(user)}>
              <ConfirmPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/summaryForm"
          element={
            <ProtectedRoute isAllowed={user && Boolean(user)}>
              <SummaryForm/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vacanciesForm"
          element={
            <ProtectedRoute isAllowed={user && Boolean(user)}>
              <VacanciesForm/>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoFoundPage/>}/>
      </Route>

    </Routes>
  );
}

export default App;
