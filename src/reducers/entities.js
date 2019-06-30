import { combineReducers } from "redux";
import { actionConstants } from "services/constantsSrvc";
import subjectTreeSrvc from "services/subjectTreeSrvc";

export const practicesReducer = (state = {}, action) => {
  const practiceMap = {};

  switch (action.type) {
    case actionConstants.POST_PRACTICE_SUCCESS:
    case actionConstants.POSTS_PRACTICE_SUCCESS:
    case actionConstants.PRACTICE_EXPLORER_SUCCESS:
      action.practices.forEach(practice => {
        practiceMap[practice.id] = practice;
      });

      return Object.assign({}, state, practiceMap);
    case actionConstants.PRACTICE_ADDED:
      practiceMap[action.practice.id] = action.practice;
      return Object.assign({}, state, practiceMap);
    case actionConstants.PRACTICE_EDITED:
      const { practiceId, data } = action.practiceParams;

      const newPractice = {
        ...state[practiceId],
        ...data,
        subjects: data.subjects.map(subjectId =>
          subjectTreeSrvc.nodeMapper.get(subjectId)
        )
      };
      return {
        ...state,
        [practiceId]: newPractice
      };
    default:
      return state;
  }
};

const entities = combineReducers({
  practices: practicesReducer
});

export default entities;
