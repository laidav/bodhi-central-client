import {
  subjects as staticSubjects,
  actionConstants
} from "services/constantsSrvc";

const initialState = new Map();

for (let key in staticSubjects) {
  initialState.set(staticSubjects[key], false);
}

const practiceExplorerCheckedSubjects = (state = initialState, action) => {
  switch (action.type) {
    case actionConstants.TOGGLE_SUBJECT_FILTER:
      const newState = new Map(state);
      const subjectId = action.subject.id;

      newState.set(subjectId, !state.get(subjectId));

      return newState;
    default:
      return state;
  }
};

export default practiceExplorerCheckedSubjects;
