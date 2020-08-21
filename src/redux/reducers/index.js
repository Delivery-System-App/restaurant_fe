import { combineReducers } from "redux";
import appState from "./appState";
import NewApi from "./apiReducer";

const allReducers = combineReducers({
  appState: appState,
  newapi: NewApi,
});

export default allReducers;
