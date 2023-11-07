import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      console.log("login reducer");
    },
    logout: (state) => {
      state.isLoggedIn = false;
      console.log("logout reducer");
    }
  }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;