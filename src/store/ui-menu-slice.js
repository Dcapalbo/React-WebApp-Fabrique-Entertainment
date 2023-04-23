import { createSlice } from "@reduxjs/toolkit";

const uiMobileMenuSlice = createSlice({
  name: "ui-mobile-menu",
  initialState: { mobileMenuIsVisible: false },
  reducers: {
    toggle(state) {
      state.mobileMenuIsVisible = !state.mobileMenuIsVisible;
    },
  },
});

export const uiMobileMenuActions = uiMobileMenuSlice.actions;
export default uiMobileMenuSlice;
