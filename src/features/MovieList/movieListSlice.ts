import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMovieList {
  counter: number;
}

const initialState: IMovieList = {
  counter: 0,
};

export const movieListSlice = createSlice({
  name: "movieList",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
		incrementByAmount: (state, action: PayloadAction<number>) => {
      state.counter += action.payload
    },
  },
});

export const { increment } = movieListSlice.actions;
export default movieListSlice.reducer;
