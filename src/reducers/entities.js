import { combineReducers } from "redux";
import { actionConstants } from "services/constantsSrvc";

const practices = (state = {}, action) => {
  switch (action.type) {
    case actionConstants.PRACTICE_EXPLORER_SUCCESS:
      const practiceMap = {};
      action.practices.forEach(practice => {
        practiceMap[practice.id] = practice;
      });

      return Object.assign({}, state, practiceMap);
    default:
      return state;
  }
};

const entities = combineReducers({
  practices
});

export default entities;
