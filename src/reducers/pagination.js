import { combineReducers } from "redux";
import { actionConstants } from "services/constantsSrvc";
import { arrayUnion } from "services/helpersSrvc";

const paginate = ({ types }) => {
  const { requestType, successType, failureType } = types;

  const initialState = {
    isFetching: false,
    has_next: undefined,
    page: 0,
    practice_ids: []
  };

  return (state = initialState, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        };
      case successType:
        return {
          isFetching: false,
          has_next: action.response.has_next,
          page: state.page + 1,
          practice_ids: arrayUnion(
            state.practice_ids,
            action.response.practices
          )
        };
      case failureType:
        return {
          ...state,
          isFetching: false
        };
      default:
        return state;
    }
  };
};

const pagination = combineReducers({
  practiceExplorer: paginate({
    types: {
      requestType: actionConstants.PRACTICE_EXPLORER_REQUEST,
      successType: actionConstants.PRACTICE_EXPLORER_SUCCESS,
      failureType: actionConstants.PRACTICE_EXPLORER_FAILURE
    }
  })
});

export default pagination;
