import { connect } from "react-redux";
import PracticesContainer from "common/PracticesContainer/PracticesContainer";

const mapStateToProps = state => ({
  pagination: state.pagination.postsPractices,
  practices: state.pagination.postsPractices.ids.map(
    practiceId => state.entities.practices[practiceId]
  )
});

export default connect(mapStateToProps)(PracticesContainer);
