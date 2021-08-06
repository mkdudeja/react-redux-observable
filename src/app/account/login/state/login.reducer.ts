import { createReducer } from "@reduxjs/toolkit";
import { RequestState } from "../../../shared";
import { LoginState } from "../login.iterface";
import * as loginActions from "./login.actions";

const initialState: LoginState = {
  loading: RequestState.idle,
  error: null,
};

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginActions.loginInit, (state) => {
      return {
        ...state,
        error: null,
        loading: RequestState.pending,
      };
    })
    .addCase(loginActions.loginSuccess, (state) => {
      return {
        ...state,
        error: null,
        loading: RequestState.idle,
      };
    })
    .addCase(loginActions.loginError, (state, action) => {
      return {
        ...state,
        loading: RequestState.idle,
        error: action.payload.message,
      };
    });
});

export default loginReducer;
