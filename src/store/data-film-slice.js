/** @format */

import { createSlice } from '@reduxjs/toolkit';

const dataFilmSlice = createSlice({
	name: 'dataFilm',
	initialState: {
		filmData: {},
		filmsData: [],
	},
	reducers: {
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
			state.filmsData = state.filmsData.map((film) => {
				if (film.coverImageKey === imageKeyToRemove) {
					return {
						...film,
						coverImageKey: null,
						coverImageUrl: null,
					};
				}
				if (film.pressBookPdfKey === imageKeyToRemove) {
					return {
						...film,
						pressBookPdfKey: null,
						pressBookPdfUrl: null,
					};
				}
				return film;
			});
		},
		resetFilmData(state) {
			state.filmData = {};
		},
	},
});

export const dataFilmActions = dataFilmSlice.actions;
export default dataFilmSlice;
