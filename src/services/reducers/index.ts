import { combineReducers } from "redux";
import { testReducers } from "./testReducer";

export { testActions } from "./testReducer";

export const rootReducer = combineReducers({
  test: testReducers,
});
