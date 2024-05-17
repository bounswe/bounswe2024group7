import { loadState, saveState } from "./local";
import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
  userName: loadState("userName"),
  searchResults: loadState("searchResults"),
  profile: loadState("profile"),
  artifactLabels: loadState("artifactLabels"),
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    login(state, actions) {
      state.userName = actions.payload.userName;
      state.profile = actions.payload.profile;
      state.artifactLabels = actions.payload.artifactLabels;
      saveState("userName", actions.payload.userName);
      saveState("profile", actions.payload.profile);
      saveState("artifactLabels", actions.payload.artifactLabels);
    },
    logout(state) {
      state.userName = "";
      state.profile = null;
      saveState("userName", "");
      saveState("profile", null);
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
export const artifactLabels = (state) => state.user.artifactLabels;

export const userActions = userSlice.actions;

export default userSlice;
