import { combineReducers } from "redux";
import checkedSubjectsReducer from "./checkedSubjectsReducer";
import pagination from "./pagination";
import entities from "./entities";

const rootReducer = combineReducers({
  practiceExplorerCheckedSubjects: checkedSubjectsReducer,
  pagination,
  entities
});

export default rootReducer;
