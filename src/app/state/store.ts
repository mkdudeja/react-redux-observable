import { AnyAction, configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware, Epic } from "redux-observable";
import rootEpic from "./epics";
import rootReducer from "./reducer";

export type RootState = ReturnType<typeof rootReducer>;
export type AppEpic = Epic<AnyAction, AnyAction, RootState>;
export type AppDispatch = typeof store.dispatch;

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
