import { createSlice } from '@reduxjs/toolkit';
import { login, logout, verifyLogin } from './authActions';

interface AuthState {
  isLoggedIn: boolean;
  user: {
    email?: string;
    name?: string;
    imageUrl?: string;
    googleId?: string;
    token?: string;
  } | null;
  message: string;
  isLoading: boolean;
}

interface ErrorResponse {
  message: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  message: '',
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.message = action.payload.message;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.message = action.payload.message;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(verifyLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = action.payload.isLoggedIn;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        const errorMessage = (action.payload as ErrorResponse)?.message || '로그인 실패';
        state.message = errorMessage;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoggedIn = false;
        const errorMessage = (action.payload as ErrorResponse)?.message || '로그아웃 실패';
        state.message = errorMessage;
        state.isLoading = false;
      })
      .addCase(verifyLogin.rejected, (state, action) => {
        state.isLoggedIn = false;
        const errorMessage = (action.payload as ErrorResponse)?.message || '로그인 유효성 검사 실패';
        state.message = errorMessage;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
