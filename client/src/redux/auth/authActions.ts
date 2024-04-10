import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 테스트
export const test = createAsyncThunk(
  'users/test',
  async () => {
    console.log('리덕스까지 옴');
    try {
      const response = await axios.get('users/test');
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
      const response = await axios.post('users/login', { idToken });
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
    await axios.post('users/logout');
    return {};
  } catch (error) {
    return Promise.reject(error.response.data);
  }
});
