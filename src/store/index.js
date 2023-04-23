import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dataContactSlice from "./data-contact-slice";
import dataSelectSlice from "./data-select-slice";
import dataFilmSlice from "./data-film-slice";
import uiMenuSlice from "./ui-menu-slice";
import userLoginSlice from "./data-user-slice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  dataContact: dataContactSlice.reducer,
  dataFilm: dataFilmSlice.reducer,
  dataType: dataSelectSlice.reducer,
  uiSlice: uiMenuSlice.reducer,
  userLogin: userLoginSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
