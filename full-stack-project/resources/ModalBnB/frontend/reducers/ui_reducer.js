import { combineReducers } from 'redux';

import filters from './filters_reducer';
import modal from './modal_reducer';

export default combineReducers({
  filters,
  modal
});
