import { createAction } from "@reduxjs/toolkit";
import { ILoginRequest, ILoginResponse } from "../auth.interface";

// defined external actions
export const login = createAction<ILoginRequest, "auth/login">("auth/login");
export const logout = createAction("auth/logout");
export const loginSuccess = createAction<ILoginResponse, "auth/loginSuccess">(
  "auth/loginSuccess"
);
