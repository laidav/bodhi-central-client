import { combineReducers } from "redux";
import { actionConstants } from "services/constantsSrvc";

const practices = (state = {}, action) => {
  return state;
};

const entities = combineReducers({
  practices
});

export default entities;
