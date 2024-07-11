import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer';

const configureStore = (preloadedState = {}) => {
  const store = createStore(
    rootReducer,
    preloadedState,

    // Phase 3: Using Redux applyMiddleware
    applyMiddleware(addLoggingToDispatch, sillyMiddleware)
  );
  store.subscribe(() => {
    localStorage.state = JSON.stringify(store.getState());
  });
  return store;
};

// Phase 3: Using Redux applyMiddleware
const addLoggingToDispatch = store => next => action => {
  console.log(store.getState());
  console.log(action);
  next(action);
  console.log(store.getState());
};

// Bonus Phase: Add an extra middleware!
const sillyMiddleware = store => next => action => {
  console.log("Silly");
  next(action);
};

export default configureStore;
