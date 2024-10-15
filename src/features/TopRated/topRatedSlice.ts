import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTopRatedData } from "./topRatedFetcher";

interface ITopRated {
  topRatedData: any;
  topRatedLoading: boolean;
}

const initialState: ITopRated = {
  topRatedData: {},
  topRatedLoading: true,
};

export const getTopRatedData = createAsyncThunk(
  "topRated/listData",
  async (data: { params: any; token: any }, { rejectWithValue }) => {
    return fetchTopRatedData(data.params, data.token)
      .then((response) => response)
      .catch((err) => rejectWithValue(err));
  }
);

export const topRatedSlice = createSlice({
  name: "topRated",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopRatedData.fulfilled, (state, { payload }) => {
      state.topRatedData = payload;
      state.topRatedLoading = false;
    });
    builder.addCase(getTopRatedData.pending, (state) => {
      state.topRatedLoading = true;
    });
    builder.addCase(getTopRatedData.rejected, (state, { payload }) => {
      state.topRatedData = payload;
      state.topRatedLoading = false;
    });
  },
});

export default topRatedSlice.reducer;
