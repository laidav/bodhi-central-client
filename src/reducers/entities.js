import { combineReducers } from "redux";
import { actionConstants } from "services/constantsSrvc";

export const practicesReducer = (state = {}, action) => {
  switch (action.type) {
    case actionConstants.PRACTICE_SUCCESS:
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
  practices: practicesReducer
});

export default entities;
