import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { connectionTest, login, logout } from './authActions';

interface AuthState {
  isLoggedIn: boolean;
  user: {
    email?: string;
    name?: string;
    imageUrl?: string;
    googleId?: string;
    token?: string;
  } | null;
  massage: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  massage: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.user = { token: action.payload.token };
      state.isLoggedIn = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectionTest.fulfilled, (state, action) => {
        state.massage = action.payload.massage;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
