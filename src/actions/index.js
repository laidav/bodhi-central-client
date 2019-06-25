import { actionConstants } from "services/constantsSrvc";

export const toggleSubjectFilter = subject => ({
  type: actionConstants.TOGGLE_SUBJECT_FILTER,
  subject
});
