import { combineReducers } from "redux";
import { actionConstants, entities } from "services/constantsSrvc";
import { arrayUnion } from "services/helpersSrvc";

export const paginateReducer = ({ types, entity }) => {
  const {
    requestType,
    refreshRequestType,
    successType,
    failureType,
    itemAddedType,
    itemDeletedType
  } = types;

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
      case itemAddedType:
        return {
          ...state,
          ids: [action[entity].id].concat(state.ids)
        };
      case itemDeletedType:
        return {
          ...state,
          ids: state.ids.filter(id => id !== action[entity].id)
        };
      default:
        return state;
    }
  };
};

const practiceExplorer = paginateReducer({
  types: {
    requestType: actionConstants.PRACTICE_EXPLORER_REQUEST,
    refreshRequestType: actionConstants.PRACTICE_EXPLORER_REFRESH_REQUEST,
    successType: actionConstants.PRACTICE_EXPLORER_SUCCESS,
    failureType: actionConstants.PRACTICE_EXPLORER_FAILURE,
    itemAddedType: actionConstants.PRACTICE_ADDED_UPDATE_PRACTICE_EXPLORER,
    itemDeletedType: actionConstants.PRACTICE_DELETED
  },
  entity: entities.PRACTICE
});

const postsPractices = paginateReducer({
  types: {
    requestType: actionConstants.POSTS_PRACTICE_REQUEST,
    refreshRequestType: actionConstants.POSTS_PRACTICE_REFRESH_REQUEST,
    successType: actionConstants.POSTS_PRACTICE_SUCCESS,
    failureType: actionConstants.POSTS_PRACTICE_FAILURE,
    itemAddedType: actionConstants.PRACTICE_ADDED,
    itemDeletedType: actionConstants.PRACTICE_DELETED
  },
  entity: entities.PRACTICE
});

const singlePostPaginateReducer = paginateReducer({
  types: {
    requestType: actionConstants.POST_PRACTICE_REQUEST,
    refreshRequestType: actionConstants.POST_PRACTICE_REFRESH_REQUEST,
    successType: actionConstants.POST_PRACTICE_SUCCESS,
    failureType: actionConstants.POST_PRACTICE_FAILURE,
    itemAddedType: actionConstants.PRACTICE_ADDED,
    itemDeletedType: actionConstants.PRACTICE_DELETED
  },
  entity: entities.PRACTICE
});

const singlePostPractices = (state = {}, action) => {
  switch (action.type) {
    case actionConstants.POST_PRACTICE_REQUEST:
    case actionConstants.POST_PRACTICE_SUCCESS:
      return {
        ...state,
        [action.postId]: singlePostPaginateReducer(state[action.postId], action)
      };
    case actionConstants.PRACTICE_ADDED:
    case actionConstants.PRACTICE_DELETED:
      if (action.practice.post) {
        const postId = action.practice.post.id;

        return {
          ...state,
          [postId]: singlePostPaginateReducer(state[postId], action)
        };
      }

      return state;
    default:
      return state;
  }
};

const pagination = combineReducers({
  practiceExplorer,
  postsPractices,
  singlePostPractices
});

export default pagination;
