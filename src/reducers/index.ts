import { combineReducers } from "redux";
import dittoReducer from "./dittoReducer";

export default combineReducers({
  ditto: dittoReducer
});
