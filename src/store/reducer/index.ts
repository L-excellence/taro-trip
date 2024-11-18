import { combineReducers } from "redux";
import flightIndex from "./flightIndex";
import user from "./user";

export default combineReducers({
  flightIndex,
  user,
});
