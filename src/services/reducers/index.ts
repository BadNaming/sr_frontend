import { combineReducers } from "redux";
import { testReducers, testActions } from "./testReducer";

export const rootReducer = combineReducers({
  test: testReducers,
});
