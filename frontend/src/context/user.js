import { loadState, saveState } from "./local";
import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
  userName: loadState("userName"),
  password: loadState("password"),
  searchResults: loadState("searchResults"),
  profile: loadState("profile"),
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    login(state, actions) {
      state.userName = actions.payload.userName;
      state.profile = actions.payload.profile;
      state.password = actions.payload.password;
      saveState("userName", actions.payload.userName);
      saveState("profile", actions.payload.profile);
      saveState("password", actions.payload.password);
    },
    logout(state) {
      state.userName = "";
      state.profile = null;
      state.password = "";
      saveState("userName", "");
      saveState("profile", null);
      saveState("password", "");
    },
    updateSearchResults(state, actions) {
      state.searchResults = actions.payload;
      saveState("searchResults", actions.payload);
    },
  }
});


export const userName = (state) => state.user.userName;
export const searchResults = (state) => state.user.searchResults;
export const userProfile = (state) => state.user.profile;
export const userPassword = (state) => state.user.password;

export const userActions = userSlice.actions;

export default userSlice;
