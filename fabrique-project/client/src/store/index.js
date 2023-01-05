import { configureStore } from "@reduxjs/toolkit";
import dataFilmSlice from "./data-film-slice";
import uiMenuSlice from "./ui-menu-slice";

const store = configureStore({
  reducer: {
    dataFilm: dataFilmSlice.reducer,
    uiSlice: uiMenuSlice.reducer,
  },
});

export default store;
