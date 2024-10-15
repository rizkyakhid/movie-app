import movieListSlice from "@/features/MovieList/movieListSlice";
import nowPlayingSlice from "@/features/NowPlaying/nowPlayingSlice";
import popularListSlice from "@/features/Popular/popularListSlice";
import topRatedSlice from "@/features/TopRated/topRatedSlice";
import upcomingSlice from "@/features/Upcoming/upcomingSlice";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      movieList: movieListSlice,
      nowPlaying: nowPlayingSlice,
      topRated: topRatedSlice,
      popularList: popularListSlice,
      upcomingMovie: upcomingSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
