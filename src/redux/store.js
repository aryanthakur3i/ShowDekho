import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";

// create the redux store and register the movie reducer
export const store = configureStore({
  reducer: {
    // access movie state using state.movies
    movies: movieReducer,
  },
});
