import { createReducer } from "@reduxjs/toolkit";
import * as authActions from "./auth.actions";
import { IAuthState, IUserData } from "../auth.interface";

const initialState: IAuthState = {
  token: null,
  user: {} as IUserData,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(authActions.logout, () => initialState)
    .addCase(authActions.loginSuccess, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
});

export default authReducer;
