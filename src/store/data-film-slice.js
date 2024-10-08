/** @format */

import { createSlice } from '@reduxjs/toolkit';

const dataFilmSlice = createSlice({
	name: 'dataFilm',
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
		removeFilmData(state, action) {
			state.filmsData = state.filmsData.filter(
				(film) => film._id !== action.payload._id
			);
		},
		removeImageKey(state, action) {
			const imageKeyToRemove = action.payload;
			if (state.filmData.cover.coverImageKey === imageKeyToRemove) {
				state.filmData.cover.coverImageKey = null;
				state.filmData.cover.coverImageUrl = null;
			}
			if (state.filmData.pressBook.pressBookPdfKey === imageKeyToRemove) {
				state.filmData.pressBook.pressBookPdfKey = null;
				state.filmData.pressBook.pressBookPdfUrl = null;
			}
		},
		resetFilmData(state) {
			state.filmData = {};
		},
	},
});

export const dataFilmActions = dataFilmSlice.actions;
export default dataFilmSlice;
