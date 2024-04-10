import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 프론트엔드 <-> 백엔드 연결 테스트
export const connectionTest = createAsyncThunk(
  'users/test',
  async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/test`);
      const { massage } = response.data;
      console.log(response);
      return { massage };
    } catch (error) {
      return error;
    }
  }
);

// 로그인
export const login = createAsyncThunk(
  'users/login',
  async (idToken, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, { idToken });
      const { user, token } = response.data;
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 로그아웃
export const logout = createAsyncThunk('users/logout', async () => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`);
    return {};
  } catch (error) {
    return Promise.reject(error.response.data);
  }
});
