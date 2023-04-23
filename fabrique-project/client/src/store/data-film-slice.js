import { createSlice } from "@reduxjs/toolkit";

const dataFilmSlice = createSlice({
  name: "dataFilm",
  initialState: {
    filmData: {},
    filmsData: [],
  },
  reducers: {
    setFilmsData(state, action) {
      state.filmsData = action.payload;
    },
    setFilmData(state, action) {
      state.filmData = action.payload;
    },
    addFilmData(state, action) {
      state.filmsData.push(action.payload);
    },
    removeFilmData(state, action) {
      state.filmsData = state.filmsData.filter(
        (film) => film._id !== action.payload._id
      );
    },
    resetFilmData(state) {
      state.filmData = {};
    },
  },
});

export const dataFilmActions = dataFilmSlice.actions;
export default dataFilmSlice;
