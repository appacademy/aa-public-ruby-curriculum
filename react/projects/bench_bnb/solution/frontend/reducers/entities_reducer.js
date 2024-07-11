import { combineReducers } from 'redux';

import benches from './benches_reducer';
import reviews from './reviews_reducer';
import users from './users_reducer';

export default combineReducers({
  benches,
  reviews,
  users,
});
