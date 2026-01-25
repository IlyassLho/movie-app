import { createSlice } from "@reduxjs/toolkit";

// load the watchlist from the local storage if it exists
const loadFromStorage = () => {
  const savedData = localStorage.getItem("myWatchlist");
  return savedData ? JSON.parse(savedData) : [];
};

const initialState = {
  movies: loadFromStorage(),
};

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      const exists = state.movies.find((movie) => movie.id === action.payload.id);
      if (!exists) {
        state.movies.push(action.payload);
        localStorage.setItem("myWatchlist", JSON.stringify(state.movies));
      }
    },
    removeFromWatchlist: (state, action) => {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload.id);
      localStorage.setItem("myWatchlist", JSON.stringify(state.movies));
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;