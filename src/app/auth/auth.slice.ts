import {
  createAction,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  IAuthState,
  ILoginRequest,
  ILoginResponse,
  IUserData,
} from "./auth.interface";

const initialState: IAuthState = {
  token: null,
  user: {} as IUserData,
};

const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: function () {
      return initialState;
    },
    loginSuccess: function (state, action: PayloadAction<ILoginResponse>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

// define auth selectors
const selectSelf = (state: RootState) => state.auth;
const isAuthorized = createSelector(selectSelf, (state) => !!state.token);
const authUser = createSelector(selectSelf, (state) => state.user);

// defined external actions
const login = createAction<ILoginRequest>("auth/login");

const authReducerKey = auth.name,
  authActions = {
    login,
    ...auth.actions,
  },
  authSelectors = {
    isAuthorized,
    authUser,
  };

// named exports
export { authActions, authSelectors, authReducerKey };

// default export
export default auth.reducer;
