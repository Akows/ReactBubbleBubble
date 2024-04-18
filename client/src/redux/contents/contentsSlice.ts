import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  contents: [],
  bookmarks: [],
  isLoading: false,
  error: null,
};

// 비동기 함수: 전체 글 데이터를 불러오는 API 호출
export const fetchContents = createAsyncThunk('contents/fetchContents', async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/contents/fetchContents`);
  return response.data;
});

const contentsSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {
    toggleBookmark: (state, action) => {
      const index = state.bookmarks.indexOf(action.payload);
      if (index >= 0) {
        state.bookmarks.splice(index, 1); // 북마크 해제
      } else {
        state.bookmarks.push(action.payload); // 북마크 설정
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contents = action.payload;
        state.error = null;
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleBookmark } = contentsSlice.actions;

export default contentsSlice.reducer;
