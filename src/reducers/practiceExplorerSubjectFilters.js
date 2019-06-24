import { subjects as staticSubjects } from "services/constantsSrvc";

const initialState = new Map();

for (let key in staticSubjects) {
  initialState.set(staticSubjects[key], false);
}

const practiceExplorerSubjectFilters = (state = initialState, action) => {
  return state;
};

export default practiceExplorerSubjectFilters;
