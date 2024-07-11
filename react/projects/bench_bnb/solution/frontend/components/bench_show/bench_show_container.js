import { connect } from 'react-redux';

import { fetchBench } from '../../actions/bench_actions';
import { selectReviewsForBench, selectBench } from '../../reducers/selectors';
import BenchShow from './bench_show';

const mapStateToProps = (state, { match }) => {
  const benchId = parseInt(match.params.benchId);
  const bench = selectBench(state.entities, benchId);
  const reviews = selectReviewsForBench(state.entities, bench);
  return {
    benchId,
    bench,
    reviews
  };
};

const mapDispatchToProps = dispatch => ({
  fetchBench: id => dispatch(fetchBench(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BenchShow);
