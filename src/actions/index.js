import { actionConstants } from "services/constantsSrvc";
import practiceResource from "services/resources/practiceResource";
import { checkedIdsFromSubjectMap } from "services/helpersSrvc";

export const toggleSubjectFilter = subject => ({
  type: actionConstants.TOGGLE_SUBJECT_FILTER,
  subject
});

export const practiceAdded = response => ({
  type: actionConstants.PRACTICE_ADDED,
  practice: response.data
});

export const practiceAddedUpdatePracticeExplorer = practice => ({
  type: actionConstants.PRACTICE_ADDED_UPDATE_PRACTICE_EXPLORER,
  practice
});

export const practiceSuccessResponse = (actionType, response, postId) => ({
  type: actionType,
  practices: response.data.practices,
  has_next: response.data.has_next,
  ids: response.data.practices.map(practice => practice.id),
  postId
});

const fetchPractices = (
  checkedSubjects,
  page,
  dispatch,
  actionType,
  postId
) => {
  const params = { page, postId };

  if (checkedSubjects) {
    params.subjects = checkedIdsFromSubjectMap(checkedSubjects);
  }

  return practiceResource.getPractices(params).then(response => {
    dispatch(practiceSuccessResponse(actionType, response, postId));
  });
};

export const getExplorerPractices = (checkedSubjects, page) => {
  return dispatch => {
    dispatch({
      type: actionConstants.PRACTICE_EXPLORER_REQUEST
    });

    return fetchPractices(
      checkedSubjects,
      page,
      dispatch,
      actionConstants.PRACTICE_EXPLORER_SUCCESS
    );
  };
};

export const refreshExplorerPractices = checkedSubjects => {
  return dispatch => {
    dispatch({
      type: actionConstants.PRACTICE_EXPLORER_REFRESH_REQUEST
    });

    return fetchPractices(
      checkedSubjects,
      1,
      dispatch,
      actionConstants.PRACTICE_EXPLORER_SUCCESS
    );
  };
};

export const getPostsPractices = page => {
  return dispatch => {
    dispatch({
      type: actionConstants.POSTS_PRACTICE_REQUEST
    });

    return fetchPractices(
      undefined,
      page,
      dispatch,
      actionConstants.POSTS_PRACTICE_SUCCESS
    );
  };
};

export const getSinglePostPractices = (page, postId) => {
  return dispatch => {
    dispatch({
      type: actionConstants.POST_PRACTICE_REQUEST,
      postId
    });

    return fetchPractices(
      undefined,
      page,
      dispatch,
      actionConstants.POST_PRACTICE_SUCCESS,
      postId
    );
  };
};
