import { actionConstants } from "services/constantsSrvc";
import subjectTreeSrvc from "services/subjectTreeSrvc";
import { checkedIdsFromSubjectMap } from "services/helpersSrvc";

const updatePracticeExplorer = store => next => action => {
  let result = next(action);
  const { practiceExplorerCheckedSubjects, pagination } = store.getState();

  const noCheckedSubjectsAndHasPractices =
    !checkedIdsFromSubjectMap(practiceExplorerCheckedSubjects).length &&
    pagination.practiceExplorer.ids.length;

  if (
    action.type === actionConstants.PRACTICE_ADDED &&
    (noCheckedSubjectsAndHasPractices ||
      subjectTreeSrvc.checkedSubjectsHasPractice(
        practiceExplorerCheckedSubjects,
        action.practice
      ))
  ) {
    console.log("update practice explorer");
  }
  return result;
};

export default updatePracticeExplorer;
