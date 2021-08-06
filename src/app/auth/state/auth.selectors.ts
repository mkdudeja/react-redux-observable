import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../state/store";

// define auth selectors
const selectSelf = (state: RootState) => state.auth;
export const isAuthorized = createSelector(
  selectSelf,
  (state) => !!state.token
);
export const authUser = createSelector(selectSelf, (state) => state.user);
