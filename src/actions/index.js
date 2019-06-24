import { actionConstants } from "/services/constantsSrvc";

const toggleSubjectFilter = subjectId => ({
  type: actionConstants.TOGGLE_SUBJECT_FILTER,
  subjectId
});
