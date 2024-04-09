import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  user: {
    email?: string;
    name?: string;
    imageUrl?: string;
    googleId?: string;
    token?: string;
  } | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    // 추가 액션 리듀서들...
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
