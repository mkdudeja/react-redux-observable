import { createAction } from "@reduxjs/toolkit";
import { AuthState, IError } from "../../../shared/interfaces";
import { ILoginRequest } from "../login.iterface";

// defined external actions
export const loginInit = createAction<ILoginRequest>("auth/login");
export const loginError = createAction<IError>("auth/login/error");
export const loginSuccess = createAction<AuthState>("auth/login/success");
