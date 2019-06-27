import { connect } from "react-redux";
import PracticesContainer from "common/PracticesContainer/PracticesContainer";

const mapStateToProps = state => ({
  allPractices: state.entities.practices,
  pagination: state.pagination.practiceExplorer
});

export default connect(mapStateToProps)(PracticesContainer);
