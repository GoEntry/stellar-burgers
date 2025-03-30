import { createAsyncThunk, createSlice, AnyAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getUserApi, loginUserApi, logoutApi, registerUserApi, updateUserApi, TLoginData, TRegisterData } from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';

type TAuthState = {
  user: TUser | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  loading: boolean;
  error?: string;
};

const initialState: TAuthState = {
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
  loading: false,
  error: undefined
};

const handleAuthSuccess = (
  state: TAuthState,
  action: { payload: { user: TUser; accessToken: string; refreshToken: string } }
) => {
  state.user = action.payload.user;
  state.isAuthenticated = true;
  state.isAuthChecked = true;
  state.loading = false;
  setCookie('accessToken', action.payload.accessToken);
  localStorage.setItem('refreshToken', action.payload.refreshToken);
};

export const register = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    return {
      user: response.user,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken
    };
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    return {
      user: response.user,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken
    };
  }
);

export const logOut = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  return true;
});

export const fetchUser = createAsyncThunk('auth/fetch', getUserApi);

export const updateUser = createAsyncThunk(
  'auth/update',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, handleAuthSuccess)
      .addCase(login.fulfilled, handleAuthSuccess)
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
        state.loading = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addMatcher(
        (action: AnyAction) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = undefined;
        }
      )
      .addMatcher(
        (action: AnyAction) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.isAuthChecked = true;
          //state.error = action.error?.message || 'Unknown error';
        }
      );
  },
  selectors: {
    selectUser: (state) => state.user,
    selectAuthStatus: (state) => state.isAuthenticated,
    selectAuthChecked: (state) => state.isAuthChecked,
    selectUserName: (state) => state.user?.name
  }
});

export const {
  selectUser,
  selectAuthStatus,
  selectAuthChecked,
  selectUserName
} = authSlice.selectors;
