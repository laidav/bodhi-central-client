import { combineReducers } from "redux";
import { actionConstants } from "services/constantsSrvc";
import { arrayUnion } from "services/helpersSrvc";

export const paginateReducer = ({ types }) => {
  const { requestType, refreshRequestType, successType, failureType } = types;

  const initialState = {
    isFetching: false,
    has_next: undefined,
    page: 1,
    ids: []
  };

  return (state = initialState, action) => {
    switch (action.type) {
      case requestType:
        return {
          ...state,
          isFetching: true
        };
      case refreshRequestType:
        return {
          ...initialState,
          isFetching: true
        };
      case successType:
        return {
          isFetching: false,
          has_next: action.has_next,
          page: state.page + 1,
          ids: arrayUnion(state.ids, action.ids)
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

const singlePostPaginateReducer = paginateReducer({
  types: {
    requestType: actionConstants.POST_PRACTICE_REQUEST,
    refreshRequestType: actionConstants.POST_PRACTICE_REFRESH_REQUEST,
    successType: actionConstants.POST_PRACTICE_SUCCESS,
    failureType: actionConstants.POST_PRACTICE_FAILURE
  }
});

const singlePostPractices = (state = {}, action) => {
  switch (action.type) {
    case actionConstants.POST_PRACTICE_REQUEST:
    case actionConstants.POST_PRACTICE_SUCCESS:
      return {
        ...state,
        [action.postId]: singlePostPaginateReducer(state[action.postId], action)
      };
    default:
      return state;
  }
};

const pagination = combineReducers({
  practiceExplorer: paginateReducer({
    types: {
      requestType: actionConstants.PRACTICE_EXPLORER_REQUEST,
      refreshRequestType: actionConstants.PRACTICE_EXPLORER_REFRESH_REQUEST,
      successType: actionConstants.PRACTICE_EXPLORER_SUCCESS,
      failureType: actionConstants.PRACTICE_EXPLORER_FAILURE
    }
  }),
  postsPractices: paginateReducer({
    types: {
      requestType: actionConstants.POSTS_PRACTICE_REQUEST,
      refreshRequestType: actionConstants.POSTS_PRACTICE_REFRESH_REQUEST,
      successType: actionConstants.POSTS_PRACTICE_SUCCESS,
      failureType: actionConstants.POSTS_PRACTICE_FAILURE
    }
  }),
  singlePostPractices
});

export default pagination;
