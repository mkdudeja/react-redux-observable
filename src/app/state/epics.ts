import { AnyAction } from "@reduxjs/toolkit";
import { combineEpics, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { authEpics } from "../auth/state";
import { RootState } from "./store";

const rootEpic = (
  action$: Observable<AnyAction>,
  store$: StateObservable<RootState>,
  dependencies: void
) =>
  combineEpics(...authEpics)(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    })
  );

export default rootEpic;
