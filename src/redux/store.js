import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.reducer";
import flashReducer from "./flash/flash.reducer";
import logger from "redux-logger";

const store = configureStore({
  reducer: { user: userReducer, flash: flashReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
