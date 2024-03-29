import { actionConstants } from "services/constantsSrvc";
import subjectTreeSrvc from "services/subjectTreeSrvc";
import { checkedIdsFromSubjectMap } from "services/helpersSrvc";
import {
  practiceAddedUpdatePracticeExplorer,
  refreshExplorerPractices
} from "actions";

const updatePracticeExplorer = store => next => action => {
  let result = next(action);

  switch (action.type) {
    case actionConstants.PRACTICE_ADDED:
      const { practiceExplorerCheckedSubjects, pagination } = store.getState();
      const { practice } = action;

      const noCheckedSubjectsAndHasPractices =
        !checkedIdsFromSubjectMap(practiceExplorerCheckedSubjects).length &&
        pagination.practiceExplorer.ids.length;

      if (
        noCheckedSubjectsAndHasPractices ||
        subjectTreeSrvc.checkedSubjectsHasPractice(
          practiceExplorerCheckedSubjects,
          practice
        )
      ) {
        // Applying setTimeout so applyMiddleWare can complete on store before calling dispatch again for consistency
        setTimeout(() =>
          store.dispatch(practiceAddedUpdatePracticeExplorer(practice), 0)
        );
      }
      break;
    case actionConstants.PRACTICE_EDITED:
      setTimeout(() => {
        const { practiceExplorerCheckedSubjects } = store.getState();
        store.dispatch(
          refreshExplorerPractices(practiceExplorerCheckedSubjects),
          0
        );
      });
      break;
    default:
  }

  return result;
};

export default updatePracticeExplorer;
