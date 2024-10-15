import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMovieListData } from "./movieListFetcher";

interface IMovieList {
  counter: number;

  movieListData: any;
  movieListLoading: boolean;

  nowPlayingData: any;
  nowPlayingLoading: boolean;
}

const initialState: IMovieList = {
  counter: 0,

  movieListData: {},
  movieListLoading: true,

  nowPlayingData: {},
  nowPlayingLoading: true,
};

export const getMovieListData = createAsyncThunk(
  "movieList/listData",
  async (data: { params: any; token: any }, { rejectWithValue }) => {
    return fetchMovieListData(data.params, data.token)
      .then((response) => response)
      .catch((err) => rejectWithValue(err));
  }
);

export const movieListSlice = createSlice({
  name: "movieList",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.counter += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovieListData.fulfilled, (state, { payload }) => {
      state.movieListData = payload;
      state.movieListLoading = false;
    });
    builder.addCase(getMovieListData.pending, (state) => {
      state.movieListLoading = true;
    });
    builder.addCase(getMovieListData.rejected, (state, { payload }) => {
      state.movieListData = payload;
      state.movieListLoading = false;
    });
  },
});

export const { increment } = movieListSlice.actions;
export default movieListSlice.reducer;
