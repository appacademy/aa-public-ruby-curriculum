# Giphy Search

Today's homework will help you become more comfortable with the full
Redux cycle. You will build out a single Redux cycle for a
Giphy search tool. When a user enters a search term, the app should
use the Giphy API to render an index of the results. Here's a
screenshot of the completed project:

![screenshot](https://assets.aaonline.io/fullstack/react/homeworks/giphy/giphy_screenshot.png)

## Phase 0: Setup

We've created a skeleton with conventional folders for the front-end
files: actions, components, reducers, store, and util. We also have a CSS
folder that has a simple stylesheet made for you.

* Download the [skeleton][skeleton] and familiarize yourself with the file structure
  - Look inside all the front-end folders
  - Check out `webpack.config.js` and `package.json`
  - Find the entry file `giphy_search.jsx`
* Run `npm install`
* Run `npm start` to start `webpack --watch`

[skeleton]: https://assets.aaonline.io/fullstack/react/homeworks/giphy/skeleton.zip

## Component Overview

Now that you're acquainted with the file structure, let's map out
an overview of the components hierarchy:

```
Root
  GiphysSearchContainer
    GiphysSearch
      GiphysIndex
       GiphysIndexItem
```

- `Root`: As usual, it is responsible for connecting our component tree
  with the `store`. It renders the `GiphysSearchContainer`.
- `GiphysSearchContainer`: Container for our `GiphysSearch` component.
- `GiphysSearch`: renders the search bar and handles all of the search
  logic (keeping track of the query and trigger the AJAX request on submit);
  renders the `GiphysIndex`.
- `GiphysIndex`: iterates over the `giphys` in `props`, rendering a `GiphysIndexItem` for each one.


## Phase 1: Redux Cycle

## State Shape

Before we begin to build the project, it is important to think about the
state shape. We know that we want to display giphy results
returned by an AJAX request. This means we will probably want a `giphys`
slice of the state that holds a collection of `giphy` objects.

```js
the state shape will be here
{
  giphys: [
    //giphy objects  
  ]
}

```

### Giphy API Key

Before we start, let's create a Giphy API Key to use in our API requests to
Giphy.

Navigate to the [Giphy API Quick Start Guide][giphy-api] and click
`Create an App`. You will need a Giphy account to do this, so create one if you
do not already have one.

Fill out the form for creating a new app, and only check the option for
`I only want to use the GIPHY API`.

![Giphy Example][giphy-example]

Once you've submitted the form, you'll be taken to a dashboard, and under the
`Your Apps` section, you should see your newly created app with an API Key that
you can use for the rest of this project.

[giphy-api]: https://developers.giphy.com/docs/api/#quick-start-guide
[giphy-example]: https://assets.aaonline.io/fullstack/react/assets/giphy_api_key.png

### API Util

Let's write a function `fetchSearchGiphys` in `api_util.js` to make an AJAX call
to the Giphy API. It will take a single argument, the `searchTerm` entered by a
user. You can check out the [Giphy API docs][giphy-docs] for more details, but
in short, we want to make a `GET` request to
`http://api.giphy.com/v1/gifs/search?q=${search+term}&api_key=${YOUR_GIPHY_API_KEY}&limit=2`
where the `${search-term}` is replaced with our actual query. We tag `limit=2`
onto the end of our query params to tell Giphy we only want two GIFs back. The
giphy API is relatively slow, so keeping the response size down helps our app be
a little faster.

Remember, it's best to test small pieces as we go. Let's test out that AJAX
request to make sure it's doing what we're intending.

You should have already run `webpack -w`. Check to make sure our
`bundle.js` file is getting updated. It has already been sourced for you
in `index.html`.

Open the `index.html` file in the browser. The jQuery `script` tag has already
been added, so `$.ajax` should already be defined.
Import `fetchSearchGiphys` to the entry file, then go ahead and put it
on the window so we have access to it in the console.

Try running this test code:

```js
fetchSearchGiphys("puppies").then((res) => console.log(res.data));
```

This will make the AJAX request, which will return a promise. We chain on
a `then` to log the response data once the response comes back. We should
see an array of two objects. Those are our giphys! Make sure you get this
working before moving on, and don't forget to remove `fetchSearchGiphys` from
the window once you're done testing.

[giphy-docs]: https://github.com/Giphy/GiphyAPI

### Actions

Next, we'll get an action set up to properly receive giphys.
As always, we want to export constants for our action types that
point at strings of the same content:

```js
export const RECEIVE_SEARCH_GIPHYS = 'RECEIVE_SEARCH_GIPHYS';
```

Write and export `receiveSearchGiphys`, a function that
receives `giphys` and returns an action object. The object should have
two keys: one for the `type` and another for the `giphys` data.
Your function should look like the following:

```js
export const receiveSearchGiphys = giphys => {
  return {
    type: RECEIVE_SEARCH_GIPHYS,
    giphys
  }
};
```

Before testing this action creator, we need a reducer.

### giphysReducer

Define `giphysReducer` in `giphys_reducer.js` to receive the previous
state and an action. Recall that a reducer describes how that state
should change based on a dispatched action. It should always return the
new state without mutating the previous state. If the action dispatched to
the reducer should not change the state, the reducer returns `state`.
You will also need to import the `RECEIVE_SEARCH_GIPHYS` constant from
our actions file.

Your reducer should look similar to the this one:

```js
import { RECEIVE_SEARCH_GIPHYS } from '../actions/giphy_actions';

const giphysReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SEARCH_GIPHYS:
      return action.giphys;
    default:
      return state;
  }
};
```

### rootReducer

Recall the state shape we planned earlier in this project.
The `giphysReducer` above should control the `giphys` slice of the
application. We use a `rootReducer` with Redux's `combineReducers`
function to assign control of different slices of state to their
reducers and create the application state.

This project only needs one reducer, but using `combineReducers` would
allow you to easily add more state slices in the future.

We've imported `combineReducers` and `giphysReducer` for you. Your simple
root reducer file should look similar to the following:

```js
import { combineReducers } from 'redux';

import giphysReducer from './giphys_reducer';

export default combineReducers({
  giphys: giphysReducer
});
```


### Store

The store holds the global state of an application, so we need to create it
before we can test our reducer. Remember that Redux provides a `createStore`
method that receives a `reducer`, optional `preloadedState`, and an optional
`enhancer`. We'll begin by writing a `configureStore` function that
passes our `rootReducer` to `createStore`.

```js
//store/store.js
import { createStore } from 'redux';
import RootReducer from '../reducers/root_reducer';

const configureStore = () => {
  return createStore(RootReducer);
};
```

Import `configureStore` in your entry file, then declare

```js
const store = configureStore()
```

inside the `DOMContentLoaded` callback. Now we can test the reducer
and our action creator!

* Put store on the window as `window.store = store`.
* Import the `fetchSearchGiphys` API util and the `receiveSearchGiphys`
action creator, then add them to the window as well.
* Try the following code in the browser's console before you continue.

```js
store.getState();
//should return the initial state object, including the empty giphys array

const fetchSuccess = giphys => store.dispatch(receiveSearchGiphys(giphys))
fetchSearchGiphys("puppies").then(fetchSuccess);

store.getState();
// should return the app state populated with puppy giphys
```

Notice the test above directly makes the API call and uses a promise to
include the `receiveSearchGiphys` action creator. Using this pattern
in our components would make our app difficult to maintain -- each
change to our app state should come from an action creator.

## Thunk Middleware

Let's refactor how we fetch giphys by using a thunk action creator.
Recall that we use a thunk action creator to return a function, that
when called with an argument of dispatch, can dispatch additional actions.

We want this action creator to dispatch `receiveSearchGiphys` after
the Giphy API call is successful.

* Import our API util functions into `actions/giphy_actions.js` as
`import * as APIUtil from '../util/api_util';`
* Export a function `fetchSearchGiphys`that
  - Receives a search term
  - Returns a function that can be called with `dispatch` and uses a
  promise to dispatch `receiveSearchGiphys` with the received data
  after `APIUtil.fetchSearchGiphys` is successful.

Your thunk action creator should look like the following:

```js
export const fetchSearchGiphys = (searchTerm) => {
	return (dispatch) => {
		APIUtil.fetchSearchGiphys(searchTerm)
			.then(giphys => dispatch(receiveSearchGiphys(giphys.data)));
	}
};
```

As always, let's export a constant for the action type.

```js
export const REQUEST_SEARCH_GIPHYS = 'REQUEST_SEARCH_GIPHYS';
```

Refactor your `configureStore` function in `store/store.js` to
incorporate your thunk action creator. Remember that Redux provides
`thunk` middleware from the `redux-thunk` module. We'll import Redux's `thunk` 
middleware and `applyMiddleware` function.

Your `store/store.js` file should now include the following:

```js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/root_reducer';

const configureStore = () => {
  return createStore(RootReducer, applyMiddleware(thunk));
};

export default configureStore;
```

This concludes our redux cycle. Remember to test!

Import `fetchSearchGiphys` from your actions file to your entry and
put it on the window.

Try the following code in the brower's console before continuing to
the next phase:

```js
store.getState(); // should return initial app state
store.dispatch(fetchSearchGiphys("puppies")); //uses the new action creator
store.getState(); // should return the app state populated with giphys
```


## Phase 2: React Components

### Root Component

Create a functional component in `root.jsx` that will render all of the
app's React components. It should receive the app's Redux `store` as a
prop and will wrap our all of our app's components with the `Provider`
from `react-redux`.

Your `Root` component should resemble the following:

```js
import React from 'react';
import { Provider } from 'react-redux';

import GiphysSearchContainer from './giphys_search_container';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <GiphysSearchContainer />
    </Provider>
  );
};

export default Root;
```

Import this Root component into your entry file. Update your
`DOMContentLoaded` callback in the entry file to pass it to the store and
render it.

Your entry file should now look like this:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
	const store = configureStore();
	const root = document.getElementById('root');
	ReactDOM.render(<Root store={store} />, root);
});
```

Go to your browser and test that the root component is rendering!

### Giphys Search

To allow user search, we are going to create a presentational and
container component. Remember that container components subscribe to the
store, read state, and pass props while presentational components
render the user interface.

#### Giphys Search Container

In `components/giphys_search_container.js`, let's create the container
component for search. We've already imported `connect`, `GiphysSearch`,
and `fetchSearchGiphys` for you.

* Define `mapStateToProps`

```js
const mapStateToProps = state => ({
  giphys: state.giphys
});
```

* Define `mapDispatchToProps`

```js
const mapDispatchToProps = dispatch => {
  return { fetchSearchGiphys: (searchTerm) => dispatch(fetchSearchGiphys(searchTerm)) };
};
```

* `connect` the `GiphysSearch` component and export

```js
export default connect(mapStateToProps, mapDispatchToProps)(GiphysSearch);
```

#### Giphys Search Presentation

Now we can write the presentational component for search. It will
render an input search bar and handle the user search interaction.

* In the component's constructor, set `this.state` to hold a search term.
* Render a search form with an input field and submit button
* Create a `handleChange` function that updates the search term state
when a user types in the input field
* Create a`handleSubmit` function that fetches giphys when the submit
button is clicked.

Create `GiphysIndex` and `GiphysIndexItem` functional components to
render the results from your `GiphysSearch`

You can do it!
