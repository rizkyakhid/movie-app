import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMovieListData, fetchSearchMovieListData } from "./movieListFetcher";

interface IMovieList {
  movieListData: any;
  movieListLoading: boolean;
}

const initialState: IMovieList = {
  movieListData: {},
  movieListLoading: true,
};

export const getMovieListData = createAsyncThunk(
  "movieList/listData",
  async (data: { params: any; token: any }, { rejectWithValue }) => {
    return fetchMovieListData(data.params, data.token)
      .then((response) => response)
      .catch((err) => rejectWithValue(err));
  }
);

export const getSearchMovieListData = createAsyncThunk(
  "movieList/searchListData",
  async (data: { params: any; token: any }, { rejectWithValue }) => {
    return fetchSearchMovieListData(data.params, data.token)
      .then((response) => response)
      .catch((err) => rejectWithValue(err));
  }
);

export const movieListSlice = createSlice({
  name: "movieList",
  initialState: initialState,
  reducers: {},
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

    builder.addCase(getSearchMovieListData.fulfilled, (state, { payload }) => {
      state.movieListData = payload;
      state.movieListLoading = false;
    });
    builder.addCase(getSearchMovieListData.pending, (state) => {
      state.movieListLoading = true;
    });
    builder.addCase(getSearchMovieListData.rejected, (state, { payload }) => {
      state.movieListData = payload;
      state.movieListLoading = false;
    });
  },
});

export default movieListSlice.reducer;
