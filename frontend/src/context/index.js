import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";

const store = configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
    },
})

export default store;
