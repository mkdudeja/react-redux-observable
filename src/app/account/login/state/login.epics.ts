import { of } from "rxjs";
import { catchError, filter, mergeMap, switchMap } from "rxjs/operators";
import { IError } from "../../../shared/interfaces";
import { appActions, AppEpic } from "../../../state";
import { authActions } from "../../../state/auth";
import * as accountService from "../../account.service";
import * as loginActions from "./login.actions";

const loginEpic$: AppEpic = (action$) =>
  action$.pipe(
    filter(loginActions.loginInit.match),
    switchMap((action) => {
      return accountService.login(action.payload).pipe(
        mergeMap((result) =>
          of(
            authActions.setCredentials(result),
            loginActions.loginSuccess(result)
          )
        ),
        catchError((error: IError) =>
          of(appActions.error(error), loginActions.loginError(error))
        )
      );
    })
  );

const loginEpics = [loginEpic$];
export default loginEpics;
