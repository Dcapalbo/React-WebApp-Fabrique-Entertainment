/** @format */

import { createSlice } from '@reduxjs/toolkit';

const dataUserSlice = createSlice({
	name: 'userLogin',
	initialState: {
		isLoggedIn: false,
		userId: null,
		token: null,
		name: null,
	},
	reducers: {
		login(state, action) {
			state.isLoggedIn = true;
			state.userId = action.payload.userId;
			state.token = action.payload.token;
			state.name = action.payload.name;
		},
		logout(state) {
			state.isLoggedIn = false;
			state.userId = null;
			state.token = null;
			state.name = null;
		},
	},
});

export const dataUserActions = dataUserSlice.actions;
export default dataUserSlice;
