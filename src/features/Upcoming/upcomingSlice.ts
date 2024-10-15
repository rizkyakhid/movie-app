import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUpcomingMoviesData } from "./upcomingFetcher";

interface IUpcoming {
  upcomingData: any;
  upcomingLoading: boolean;
}

const initialState: IUpcoming = {
  upcomingData: {},
  upcomingLoading: true,
};

export const getUpcomingData = createAsyncThunk(
  "upcoming/listData",
  async (data: { params: any; token: any }, { rejectWithValue }) => {
    return fetchUpcomingMoviesData(data.params, data.token)
      .then((response) => response)
      .catch((err) => rejectWithValue(err));
  }
);

export const upcomingSlice = createSlice({
  name: "upcoming",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUpcomingData.fulfilled, (state, { payload }) => {
      state.upcomingData = payload;
      state.upcomingLoading = false;
    });
    builder.addCase(getUpcomingData.pending, (state) => {
      state.upcomingLoading = true;
    });
    builder.addCase(getUpcomingData.rejected, (state, { payload }) => {
      state.upcomingData = payload;
      state.upcomingLoading = false;
    });
  },
});

export default upcomingSlice.reducer;
