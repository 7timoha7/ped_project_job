import {createSlice} from '@reduxjs/toolkit';
import {GlobalError, GlobalSuccess, User, ValidationError} from '../../types';
import {
  changeFavorites,
  changePass,
  googleLogin,
  login,
  logout,
  reAuthorization,
  register,
  restorePassword,
  sendMail,
  verify,
} from './usersThunks';
import {RootState} from '../../app/store';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  logoutLoading: boolean;
  loginError: GlobalError | null;
  Success: GlobalSuccess | null;
  userLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  logoutLoading: false,
  Success: null,
  loginError: null,
  userLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
    setUserSuccessNull: (state) => {
      state.Success = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(register.fulfilled, (state, {payload: user}) => {
      state.registerLoading = false;
      state.user = user;
    });
    builder.addCase(register.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, {payload: user}) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(login.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
    builder.addCase(logout.pending, (state) => {
      state.logoutLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.logoutLoading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.logoutLoading = false;
    });
    builder.addCase(reAuthorization.fulfilled, (state, {payload: user}) => {
      state.user = user;
    });
    builder.addCase(changeFavorites.fulfilled, (state, {payload: success}) => {
      state.Success = success;
    });
    builder.addCase(sendMail.fulfilled, (state, {payload: success}) => {
      state.Success = success;
    });
    builder.addCase(verify.fulfilled, (state, {payload: success}) => {
      state.Success = success;
    });
    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(googleLogin.fulfilled, (state, {payload: user}) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(googleLogin.rejected, (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
    builder.addCase(restorePassword.fulfilled, (state, {payload: success}) => {
      state.Success = success;
    });
    builder.addCase(changePass.fulfilled, (state, {payload: success}) => {
      state.Success = success;
    });
  },
});

export const usersReducer = usersSlice.reducer;

export const {unsetUser, setUserSuccessNull} = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectLogoutLoading = (state: RootState) => state.users.logoutLoading;
export const selectUsersLoading = (state: RootState) => state.users.userLoading;
export const selectUserSuccess = (state: RootState) => state.users.Success;
