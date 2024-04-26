import { loadState, saveState } from "./local";
import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
  id: loadState("id"),
  token: loadState("token"),
  userName: loadState("userName"),
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    login(state, actions) {
      state.id = actions.payload.id;
      state.token = actions.payload.token;
      state.userName = actions.payload.userName;
      saveState("id", actions.payload.id);
      saveState("token", actions.payload.token);
      saveState("userName", actions.payload.userName);
    },
    logout(state) {
      state.id = null;
      state.token = null;
      state.userName = "";
      saveState("id", null);
      saveState("token", null);
      saveState("userName", "");
    },
  }
});

export const userId = (state) => state.user.id;
export const accessToken = (state) => state.user.token;
export const userName = (state) => state.user.userName;

export const userActions = userSlice.actions;

export default userSlice;
