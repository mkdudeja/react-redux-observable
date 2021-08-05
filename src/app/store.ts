import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  createAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { combineEpics, createEpicMiddleware, Epic } from "redux-observable";
import authEpics from "./auth/auth.epic";
import authReducer, { authReducerKey } from "./auth/auth.slice";

const rootReducer = combineReducers({
    [authReducerKey]: authReducer,
  }),
  rootEpic = combineEpics(...authEpics);

export type RootState = ReturnType<typeof rootReducer>;
export type AppEpic = Epic<AnyAction, AnyAction, RootState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: false,
    }).concat(epicMiddleware);
  },
});

// register epic middleware
epicMiddleware.run(rootEpic);
export const epicEmpty = createAction("dispatch/empty");
