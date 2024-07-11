import { createStore } from 'redux';
import reducer from './reducer.js';
import { addOrange, addApple } from './actions.js';

const store = createStore(reducer); // instantiate app's store with app's reducer

// put store and actions on the window
window.store = store;
window.addOrange = addOrange;
window.addApple = addApple;
