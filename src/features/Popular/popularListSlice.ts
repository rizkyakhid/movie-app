import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPopularListData } from "./popularListFetcher";

interface IPopularList {
  popularListData: any;
  popularListLoading: boolean;
}

const initialState: IPopularList = {
  popularListData: {},
  popularListLoading: true,
};

export const getPopularListData = createAsyncThunk(
  "popularList/listData",
  async (data: { params: any; token: any }, { rejectWithValue }) => {
    return fetchPopularListData(data.params, data.token)
      .then((response) => response)
      .catch((err) => rejectWithValue(err));
  }
);

export const popularListSlice = createSlice({
  name: "popularList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPopularListData.fulfilled, (state, { payload }) => {
      state.popularListData = payload;
      state.popularListLoading = false;
    });
    builder.addCase(getPopularListData.pending, (state) => {
      state.popularListLoading = true;
    });
    builder.addCase(getPopularListData.rejected, (state, { payload }) => {
      state.popularListData = payload;
      state.popularListLoading = false;
    });
  },
});

export default popularListSlice.reducer;
