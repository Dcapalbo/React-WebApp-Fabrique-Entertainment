import { createSlice } from "@reduxjs/toolkit";

const dataFilmSlice = createSlice({
  name: "dataFilm",
  initialState: {
    filmData: [],
  },
  reducers: {
    setFilmsData(state, action) {
      state.filmData = action.payload;
    },
    setFilmData(state, action) {
      state.filmData = action.payload;
    },
    resetFilmData(state) {
      state.filmData = [];
    },
  },
});

export const dataFilmActions = dataFilmSlice.actions;
export default dataFilmSlice;
