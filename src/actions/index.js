import { actionConstants } from "services/constantsSrvc";
import practiceResource from "services/resources/practiceResource";
import { checkedIdsFromSubjectMap } from "services/helpersSrvc";

export const toggleSubjectFilter = subject => ({
  type: actionConstants.TOGGLE_SUBJECT_FILTER,
  subject
});

export const getExplorerPractices = checkedSubjects => {
  return dispatch => {
    dispatch({
      type: actionConstants.PRACTICE_EXPLORER_REQUEST
    });

    return practiceResource
      .getPractices({ subjects: checkedIdsFromSubjectMap(checkedSubjects) })
      .then(response => {
        dispatch({
          type: actionConstants.PRACTICE_EXPLORER_SUCCESS,
          practices: response.data.practices,
          has_next: response.data.has_next,
          ids: response.data.practices.map(practice => practice.id)
        });
      });
  };
};
