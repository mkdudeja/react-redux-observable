import { combineEpics } from "redux-observable";
import { authEpics } from "../auth/state";

const rootEpic = combineEpics(...authEpics);

export default rootEpic;
