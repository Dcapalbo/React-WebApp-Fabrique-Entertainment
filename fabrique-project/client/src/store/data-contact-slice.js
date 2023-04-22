import { createSlice } from "@reduxjs/toolkit";

const dataContactSlice = createSlice({
  name: "dataContact",
  initialState: {
    contactData: [],
  },
  reducers: {
    setContactsData(state, action) {
      state.contactData = action.payload;
    },
    setContactData(state, action) {
      state.contactData = action.payload;
    },
    resetContactData(state) {
      state.contactData = [];
    },
  },
});

export const dataContactActions = dataContactSlice.actions;
export default dataContactSlice;
