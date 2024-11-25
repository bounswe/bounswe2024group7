import { loadState, saveState } from "./local";
import { createSlice } from "@reduxjs/toolkit";

/*const initialUser = {
  isLoggedIn: loadState("isLoggedIn"),
  userName: loadState("userName"),
  password: loadState("password"),
  searchResults: null,
  profile: loadState("profile"),
  sessionToken: loadState("sessionToken"),
};*/
const initialUser = {
  isLoggedIn: false,
  userName: "",
  password: "",
  searchResults: null,
  profile: null,
  sessionToken: ""
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    login(state, actions) {
      state.userName = actions.payload.userName;
      state.password = actions.payload.password;
      state.sessionToken = actions.payload.sessionToken;
      state.isLoggedIn = true;
      saveState("userName", actions.payload.userName);
      saveState("password", actions.payload.password);
      saveState("sessionToken", actions.payload.sessionToken);
      saveState("isLoggedIn",true); 
    },
    logout(state) {
      state.userName = "";
      state.profile = null;
      state.password = "";
      state.sessionToken = "";
      state.isLoggedIn = true;
      saveState("userName", "");
      saveState("profile", null);
      saveState("password", "");
      saveState("sessionToken", "");
      saveState("isLoggedIn",false); 
    },
    updateSearchResults(state, actions) {
      state.searchResults = actions.payload.searchResults;
      saveState("searchResults", actions.payload.searchResults);
    },
    saveProfile(state, actions) {
      state.profile = actions.payload.profile;
      saveState("profile", actions.payload.profile);
    }
  }
});


export const userName = (state) => state.user.userName;
export const searchResults = (state) => state.user.searchResults;
export const userProfile = (state) => state.user.profile;
export const userPassword = (state) => state.user.password;
export const userSessionToken = (state) => state.user.sessionToken;
export const isLoggedIn = (state) => state.user.isLoggedIn;

export const userActions = userSlice.actions;

export default userSlice;
