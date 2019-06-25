import { combineReducers } from "redux";
import checkedSubjectsReducer from "./checkedSubjectsReducer";

const rootReducer = combineReducers({
  practiceExplorerCheckedSubjects: checkedSubjectsReducer
});

export default rootReducer;
