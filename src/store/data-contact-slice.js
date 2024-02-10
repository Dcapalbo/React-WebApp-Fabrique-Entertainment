/** @format */

import { createSlice } from '@reduxjs/toolkit';

const dataContactSlice = createSlice({
	name: 'dataContact',
	initialState: {
		contactData: {},
		contactsData: [],
	},
	reducers: {
		setContactsData(state, action) {
			state.contactsData = action.payload;
		},
		setContactData(state, action) {
			state.contactData = action.payload;
		},
		removeContactData(state, action) {
			state.contactsData = state.contactsData.filter(
				(contact) => contact._id !== action.payload._id
			);
		},
		removeImageKey(state, action) {
			const imageKeyToRemove = action.payload;
			if (imageKeyToRemove) {
				state.contactData.profileCover.contactImageKey = null;
				state.contactData.profileCover.contactImageUrl = null;
			}
		},
		resetContactData(state) {
			state.contactData = {};
		},
	},
});

export const dataContactActions = dataContactSlice.actions;
export default dataContactSlice;
