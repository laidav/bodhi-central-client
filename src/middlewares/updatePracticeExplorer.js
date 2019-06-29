import { actionConstants } from "services/constantsSrvc";
import subjectTreeSrvc from "services/subjectTreeSrvc";
import { checkedIdsFromSubjectMap } from "services/helpersSrvc";
import { practiceAddedUpdatePracticeExplorer } from "actions";

const updatePracticeExplorer = store => next => action => {
  let result = next(action);
  const { practiceExplorerCheckedSubjects, pagination } = store.getState();
  const { practice } = action;

  const noCheckedSubjectsAndHasPractices =
    !checkedIdsFromSubjectMap(practiceExplorerCheckedSubjects).length &&
    pagination.practiceExplorer.ids.length;

  if (
    action.type === actionConstants.PRACTICE_ADDED &&
    (noCheckedSubjectsAndHasPractices ||
      subjectTreeSrvc.checkedSubjectsHasPractice(
        practiceExplorerCheckedSubjects,
        practice
      ))
  ) {
    // Applying settimeout so applyMiddleWare can complete on store before calling dispatch again
    setTimeout(() =>
      store.dispatch(practiceAddedUpdatePracticeExplorer(practice), 0)
    );
  }
  return result;
};

export default updatePracticeExplorer;
