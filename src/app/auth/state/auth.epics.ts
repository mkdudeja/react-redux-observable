import { filter, map, mergeMap } from "rxjs/operators";
import { AppEpic } from "../../state";
import * as authService from "../auth.service";
import * as authActions from "./auth.actions";

const loginEpic$: AppEpic = (action$) =>
  action$.pipe(
    filter(authActions.login.match),
    mergeMap((action) => {
      console.log("action", action);
      return authService
        .login(action.payload)
        .pipe(map((result) => authActions.loginSuccess(result)));
    })
  );

const authEpics = [loginEpic$];
export default authEpics;
