import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface LoginPayload {
  token: string;
}

// 액션: 로그인
export const login = createAsyncThunk(
  'users/login',
  async ({ token }: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, { token });
      
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(response.data.user));

      return response.data; 
    } catch (error) {
      // 오류 정보 처리
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

// 액션: 로그아웃
export const logout = createAsyncThunk(
  'users/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`);

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // 백엔드 응답의 메시지를 상태에 포함하여 반환
      return { message: response.data.message };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

// 액션: 로그인 유효성 검사
export const verifyLogin = createAsyncThunk(
  'users/verifylogin',
  async (_, { rejectWithValue }) => {
    try {

      const token = localStorage.getItem('token');

      if (token !== null) {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/verifylogin`, { token });

        // 세션 기반 인증에서는 서버 응답을 상태에 반영
        return { user: response.data.user, isLoggedIn: true };
      }

    } catch (error) {
      const axiosError = error as AxiosError;

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      return rejectWithValue({ isLoggedIn: false, message: axiosError.response?.data });
    }
  }
);
