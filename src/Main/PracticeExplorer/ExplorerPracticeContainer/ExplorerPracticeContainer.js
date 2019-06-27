import { connect } from "react-redux";
import PracticesContainer from "common/PracticesContainer/PracticesContainer";

const mapStateToProps = state => ({
  pagination: state.pagination.practiceExplorer,
  practices: state.pagination.practiceExplorer.ids.map(
    practiceId => state.entities.practices[practiceId]
  )
});

export default connect(mapStateToProps)(PracticesContainer);
