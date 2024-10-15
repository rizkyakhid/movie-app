import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchMovieCreditsData,
  fetchMovieDetailsData,
} from "./movieDetailsFetcher";

interface IMovieList {
  movieDetailsData: any;
  movieDetailsLoading: boolean;

  movieCreditsData: any;
  movieCreditsLoading: boolean;
}

const initialState: IMovieList = {
  movieDetailsData: {},
  movieDetailsLoading: true,

  movieCreditsData: {},
  movieCreditsLoading: true,
};

export const getMovieDetailsData = createAsyncThunk(
  "movieDetails/details",
  async (data: { params: { id: number }; token: any }, { rejectWithValue }) => {
    return fetchMovieDetailsData(data.params, data.token)
      .then((response) => response)
      .catch((err) => rejectWithValue(err));
  }
);

export const getMovieCreditsData = createAsyncThunk(
  "movieDetails/credits",
  async (data: { params: { id: number }; token: any }, { rejectWithValue }) => {
    return fetchMovieCreditsData(data.params, data.token)
      .then((response) => response)
      .catch((err) => rejectWithValue(err));
  }
);

export const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovieDetailsData.fulfilled, (state, { payload }) => {
      state.movieDetailsData = payload;
      state.movieDetailsLoading = false;
    });
    builder.addCase(getMovieDetailsData.pending, (state) => {
      state.movieDetailsLoading = true;
    });
    builder.addCase(getMovieDetailsData.rejected, (state, { payload }) => {
      state.movieDetailsData = payload;
      state.movieDetailsLoading = false;
    });

    builder.addCase(getMovieCreditsData.fulfilled, (state, { payload }) => {
      state.movieCreditsData = payload;
      state.movieCreditsLoading = false;
    });
    builder.addCase(getMovieCreditsData.pending, (state) => {
      state.movieCreditsLoading = true;
    });
    builder.addCase(getMovieCreditsData.rejected, (state, { payload }) => {
      state.movieCreditsData = payload;
      state.movieCreditsLoading = false;
    });
  },
});

export default movieDetailsSlice.reducer;
