/** @format */

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import dataArticleSlice from './data-article-slice';
import dataContactSlice from './data-contact-slice';
import dataSelectSlice from './data-select-slice';
import storage from 'redux-persist/lib/storage';
import dataFilmSlice from './data-film-slice';
import dataUserSlice from './data-user-slice';

const persistConfig = {
	key: 'root',
	storage,
};

const rootReducer = combineReducers({
	dataArticle: dataArticleSlice.reducer,
	dataContact: dataContactSlice.reducer,
	dataType: dataSelectSlice.reducer,
	dataUser: dataUserSlice.reducer,
	dataFilm: dataFilmSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
