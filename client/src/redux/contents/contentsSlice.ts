import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  contents: [],
  page: 1,
  hasMore: true,
  isLoading: false,
  error: null
};

// 비동기 함수: 전체 글 데이터를 불러오는 API 호출
export const fetchContents = createAsyncThunk(
  'contents/fetchContents',
  async ({ searchTerm = '', sortOrder = 'desc', page = 1, limit = 10 }, { getState }) => {
    const url = `${import.meta.env.VITE_API_URL}/contents/fetchContents`;
    const response = await axios.get(url, {
      params: { searchTerm, sortOrder, page, limit }
    });
    return {
      data: response.data.contents,
      total: response.data.total
    };
  }
);

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
    resetContents: (state) => {
      state.contents = [];
      state.page = 1;
      state.hasMore = true;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.isLoading = false;
        const newContents = action.payload.data;
        state.contents = [...state.contents, ...newContents];
        state.page += 1;
        state.hasMore = state.contents.length < action.payload.total;
        state.error = null;
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleBookmark, resetContents, setSearchTerm, setSortOrder } = contentsSlice.actions;

export default contentsSlice.reducer;