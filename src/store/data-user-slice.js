import { createSlice } from "@reduxjs/toolkit";

const dataUserSlice = createSlice({
  name: "userLogin",
  initialState: {
    isLoggedIn: false,
    userId: null,
    token: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
  },
});

export const dataUserActions = dataUserSlice.actions;
export default dataUserSlice;
