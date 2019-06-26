import { actionConstants } from "services/constantsSrvc";
import practiceResource from "services/resources/practiceResource";

export const toggleSubjectFilter = subject => ({
  type: actionConstants.TOGGLE_SUBJECT_FILTER,
  subject
});

export const getExplorerPractices = subjects => {
  return dispatch => {
    dispatch({
      type: actionConstants.PRACTICE_EXPLORER_REQUEST,
      subjects
    });

    return practiceResource.getPractices({ subjects }).then(response => {
      dispatch({ type: actionConstants.Practice_EXPLORER_SUCCESS, response });
    });
  };
};
