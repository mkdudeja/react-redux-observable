import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../auth/state";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
