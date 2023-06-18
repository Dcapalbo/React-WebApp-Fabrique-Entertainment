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
		resetFilmData(state) {
			state.filmData = {};
		},
	},
});

export const dataFilmActions = dataFilmSlice.actions;
export default dataFilmSlice;
