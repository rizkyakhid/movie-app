import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNowPlayingData } from "./nowPlayingFetcher";

interface INowPlaying {
  nowPlayingData: any;
  nowPlayingLoading: boolean;
}

const initialState: INowPlaying = {
  nowPlayingData: {},
  nowPlayingLoading: true,
};

export const getNowPlayingData = createAsyncThunk(
  "nowPlaying/listData",
  async (data: { params: any; token: any }, { rejectWithValue }) => {
    return fetchNowPlayingData(data.params, data.token)
      .then((response) => response)
      .catch((err) => rejectWithValue(err));
  }
);

export const nowPlayingSlice = createSlice({
  name: "nowPlaying",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNowPlayingData.fulfilled, (state, { payload }) => {
      state.nowPlayingData = payload;
      state.nowPlayingLoading = false;
    });
    builder.addCase(getNowPlayingData.pending, (state) => {
      state.nowPlayingLoading = true;
    });
    builder.addCase(getNowPlayingData.rejected, (state, { payload }) => {
      state.nowPlayingData = payload;
      state.nowPlayingLoading = false;
    });
  },
});

export default nowPlayingSlice.reducer;
