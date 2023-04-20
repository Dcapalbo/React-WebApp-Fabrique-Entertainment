import { configureStore } from "@reduxjs/toolkit";
import dataContactSlice from "./data-contact-slice";
import dataSelectSlice from "./data-select-slice";
import dataFilmSlice from "./data-film-slice";
import uiMenuSlice from "./ui-menu-slice";
import userLoginSlice from "./data-user-slice";

const store = configureStore({
  reducer: {
    dataContact: dataContactSlice.reducer,
    dataFilm: dataFilmSlice.reducer,
    dataType: dataSelectSlice.reducer,
    uiSlice: uiMenuSlice.reducer,
    userLogin: userLoginSlice.reducer,
  },
});

export default store;
