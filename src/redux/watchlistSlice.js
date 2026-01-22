import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      const exists = state.movies.find((movie) => movie.id === action.payload.id);
      if (!exists) {
        state.movies.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload.id);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;