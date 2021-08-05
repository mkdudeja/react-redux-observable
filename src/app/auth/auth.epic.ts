import { filter, map, mergeMap } from "rxjs/operators";
import { AppEpic } from "../store";
import * as loginService from "./auth.service";
import { authActions } from "./auth.slice";

const loginEpic$: AppEpic = (action$) =>
  action$.pipe(
    filter(authActions.login.match),
    mergeMap((action) => {
      console.log("action", action);
      return loginService
        .login(action.payload)
        .pipe(map((result) => authActions.loginSuccess(result)));
    })
  );

const authEpics = [loginEpic$];
export default authEpics;
