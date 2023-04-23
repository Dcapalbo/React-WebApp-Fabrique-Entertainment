import { createSlice } from "@reduxjs/toolkit";

const dataContactSlice = createSlice({
  name: "dataContact",
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
    addContactData(state, action) {
      state.contactsData.push(action.payload);
    },
    removeContactData(state, action) {
      state.contactsData = state.contactsData.filter(
        (contact) => contact._id !== action.payload._id
      );
    },
    resetContactData(state) {
      state.contactData = {};
    },
  },
});

export const dataContactActions = dataContactSlice.actions;
export default dataContactSlice;
