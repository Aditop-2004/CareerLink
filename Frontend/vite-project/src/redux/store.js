import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
  },
});
export default store;
