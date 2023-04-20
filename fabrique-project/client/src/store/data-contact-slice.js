import { createSlice } from "@reduxjs/toolkit";

const dataContactSlice = createSlice({
  name: "dataContact",
  initialState: {
    contactData: [],
  },
  reducers: {
    setContactData(state, action) {
      const newContactData = action.payload;
      const dataContactArray = state.contactData;
      if (!dataContactArray.length) {
        dataContactArray.push({
          name: newContactData.name,
          surname: newContactData.surname,
          role: newContactData.role,
          bio: newContactData.bio,
          email: newContactData.email,
          phoneNumber: newContactData.phoneNumber,
          slug: newContactData.slug,
          imageUrl: newContactData.imageUrl,
          _id: newContactData._id,
        });
      }
    },
    resetContactData(state) {
      state.contactData = [];
    },
  },
});

export const dataContactActions = dataContactSlice.actions;
export default dataContactSlice;
