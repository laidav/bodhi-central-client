import { actionConstants } from "services/constantsSrvc";
import practiceResource from "services/resources/practiceResource";
import { checkedIdsFromSubjectMap } from "services/helpersSrvc";

export const toggleSubjectFilter = subject => ({
  type: actionConstants.TOGGLE_SUBJECT_FILTER,
  subject
});

export const practiceSuccessResponse = (actionType, response) => ({
  type: actionType,
  practices: response.data.practices,
  has_next: response.data.has_next,
  ids: response.data.practices.map(practice => practice.id)
});

const fetchPractices = (checkedSubjects, page, dispatch) => {
  return practiceResource
    .getPractices({
      subjects: checkedIdsFromSubjectMap(checkedSubjects),
      page
    })
    .then(response => {
      dispatch(
        practiceSuccessResponse(
          actionConstants.PRACTICE_EXPLORER_SUCCESS,
          response
        )
      );
    });
};

export const getExplorerPractices = (checkedSubjects, page) => {
  return dispatch => {
    dispatch({
      type: actionConstants.PRACTICE_EXPLORER_REQUEST
    });

    return fetchPractices(checkedSubjects, page, dispatch);
  };
};

export const refreshExplorerPractices = checkedSubjects => {
  return dispatch => {
    dispatch({
      type: actionConstants.PRACTICE_EXPLORER_REFRESH_REQUEST
    });

    return fetchPractices(checkedSubjects, 1, dispatch);
  };
};
