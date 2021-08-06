import { of } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { IError } from "../../shared/interfaces";
import { appActions, AppEpic } from "../../state";
import * as authService from "../auth.service";
import * as authActions from "./auth.actions";

const loginEpic$: AppEpic = (action$) =>
  action$.pipe(
    filter(authActions.login.match),
    switchMap((action) => {
      return authService.login(action.payload).pipe(
        map((result) => authActions.loginSuccess(result)),
        catchError((error: IError) => of(appActions.error(error)))
      );
    })
  );

const authEpics = [loginEpic$];
export default authEpics;
