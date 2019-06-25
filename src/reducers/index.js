import { combineReducers } from "redux";
import checkedSubjectsReducer from "./checkedSubjectsReducer";
import pagination from "./pagination";

const rootReducer = combineReducers({
  practiceExplorerCheckedSubjects: checkedSubjectsReducer,
  pagination: pagination
});

export default rootReducer;
