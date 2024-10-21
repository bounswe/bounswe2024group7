import { loadState, saveState } from "./local";
import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
  userName: loadState("userName"),
  password: loadState("password"),
  searchResults: loadState("searchResults"),
  profile: loadState("profile"),
  sessionToken: loadState("sessionToken"),
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    login(state, actions) {
      state.userName = actions.payload.userName;
      state.profile = actions.payload.profile;
      state.password = actions.payload.password;
      state.sessionToken = actions.payload.sessionToken;
      saveState("userName", actions.payload.userName);
      saveState("profile", actions.payload.profile);
      saveState("password", actions.payload.password);
      saveState("sessionToken", actions.payload.sessionToken);
    },
    logout(state) {
      state.userName = "";
      state.profile = null;
      state.password = "";
      state.sessionToken = "";
      saveState("userName", "");
      saveState("profile", null);
      saveState("password", "");
      saveState("sessionToken", "");
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
export const userSessionToken = (state) => state.user.sessionToken;

export const userActions = userSlice.actions;

export default userSlice;
