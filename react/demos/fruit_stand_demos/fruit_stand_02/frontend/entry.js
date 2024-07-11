import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import { addOrange, addApple, clearFruit } from './actions';
import FruitStandContainer from './components/fruit_stand_container';

// TODO just for testing!
window.store = store;
window.addOrange = addOrange;
window.addApple = addApple;
window.clearFruit = clearFruit;

const App = () => (
	<Provider store={store}>
		<FruitStandContainer />
	</Provider>
);

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(
		<App />,
		document.getElementById('root')
	);
});
