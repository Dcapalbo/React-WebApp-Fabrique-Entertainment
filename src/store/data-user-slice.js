/** @format */

import { createSlice } from '@reduxjs/toolkit';

const dataUserSlice = createSlice({
	name: 'dataUser',
	initialState: false,
	reducers: {
		setAuth(state, action) {
			return action.payload ? true : false;
		},

		removeAuth(state, action) {
			return false;
		},
	},
});

export const dataUserActions = dataUserSlice.actions;
export default dataUserSlice;
