import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import contentsReducer from './contents/contentsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contents: contentsReducer,
    // 다른 리듀서들을 여기에 추가
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
