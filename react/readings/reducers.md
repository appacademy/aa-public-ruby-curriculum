# Reducers

## Overview

As you saw in the Store reading, the `store` has a **reducer** function for
updating its `state` that:

- receives the current `state` and an `action`;
- updates the state appropriately based on the `action.type`;
- and returns the next state.

Recall the reducer from our fruit stand app:

```js
// fruit_reducer.js

const fruitReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case "ADD_FRUIT":
      return [...state, action.fruit];
    default:
      return state;
  }
};

export default fruitReducer;
```

When the store initializes, it calls its reducer with an `undefined` `state`,
allowing the reducer to dictate the store's initial state via the default value
in the `state` parameter.

The bulk of the reducer function then implements updates to the state. First,
the reducer decides what logic to implement based on the `action.type` `switch`.
Then, it creates and returns a new object representing the next state (after
processing the action) if any of the information needs to be changed. The
`state` is returned unchanged if no cases match the `action.type`, meaning that
the reducer doesn't _care_ about that action (e.g.
`{type: 'NEW_TRANSFORMERS_SEQUEL'}`).

In the above example, our reducer's initial state is set to an empty array. The
reducer returns a new array with `action.fruit` appended to the previous `state`
if `action.type` is `"ADD_FRUIT"`. Otherwise, it returns the `state` unchanged.

Let's update our fruit stand app's `reducer` to handle a few more actions:

- `"ADD_FRUITS"` - Add an array of fruits to our inventory of fruits.
- `"SELL_FRUIT"` - Remove the first instance of a fruit if available.
- `"SELL_OUT"` - Someone bought your whole inventory of fruit! Return an empty
  array.

```js
// fruit_reducer.js
const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FRUIT":
      return [...state, action.fruit];
    case "ADD_FRUITS":
      return [...state, ...action.fruits];
    case "SELL_FRUIT":
      const idx = state.indexOf(action.fruit);
      if (idx !== -1) {
        // remove first instance of action.fruit
        return [...state.slice(0, idx), ...state.slice(idx + 1)];
      }
      return state; // if action.fruit is not in state, return previous state
    case "SELL_OUT":
      return [];
    default:
      return state;
  }
};
```

## Immutable State

Inside a Redux reducer, you must never mutate its arguments (i.e. `state` and
`action`). **Your reducer must return a new object if the state changes**.
[Here's why][why-immutable].

Here's an example of a _bad_ reducer which mutates the previous state.

```js
// bad reducer
const badReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT_COUNTER":
      state.count++;
      return state;
    default:
      return state;
  }
};
```

And here's an example of a good one which uses `Object.assign` to create a 
shallow dup of the previous `state`. (Your state should never be deeply nested 
so a shallow dup will work fine):

```js
// good reducer

const goodReducer = (state = { count: 0 }, action) => {
  Object.freeze(state);
  switch (action.type) {
    case "INCREMENT_COUNTER":
      let nextState = Object.assign({}, state);
      nextState.count++;
      return nextState;
    default:
      return state;
  }
};
```

Note the use of `Object.freeze()`. Even though `fruitReducer` doesn't mutate the
state, `Object.freeze()` will ensure that state can't be accidentally mutated.
Get in the habit of using `Object.freeze` at the top of every reducer you write!
Check out the Object.freeze reading to learn more.

## Combining Reducers

Now say our fruit stand is extremely successful and it grows so much that we
need multiple farmers helping us. Our app's state will need to grow to store not
only an array of `fruits` but also a `farmers` object that keeps track of our
farmers.

Here's a sample state tree of our new app:

```js
{
	farmers: {
		"1": {
			id: 1,
			name: "Ol' McDonald",
			paid: false,
		},
		"2": {
			id: 2,
			name: "Rabbit",
			paid: true
		}
	},
	fruits: [
		"orange",
		"orange",
		"apple",
		"lychee",
		"grapefruit"
	]
}
```

Our store now needs to handle new action types like `"HIRE_FARMER"` and
`"PAY_FARMER"` by updating the `farmers` slice of our state. We could add more
cases to our reducer, but eventually this would become unwieldy. The solution is
to split our `reducer` into separate `fruits` and `farmers` reducers.

Splitting up our reducer into multiple reducers handling separate, independent
'slices' of information is called **reducer composition**, and it is the
fundamental pattern of building Redux apps. Because each reducer only handles a
single 'slice' of state, its `state` param corresponds only to the part of the
state that it manages, and it only responds to actions that concern that slice
of state.

Let's split up our popular fruit stand app's `reducer` into two reducers:

- `fruits` - A reducing function that handles actions updating the `fruits`
  slice of our app state.
- `farmers` - A reducing function that handles actions updating the new
  `farmers` slice of our app state.

```js
// reducers/fruits_reducer.js

const fruitsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case "ADD_FRUIT":
      return [...state, action.fruit];
    case "ADD_FRUITS":
      return [...state, ...action.fruits];
    case "SELL_FRUIT":
      const idx = state.indexOf(action.fruit);
      if (idx !== -1) {
        return [...state.slice(0, idx), ...state.slice(idx + 1)];
      }
      return state;
    case "SELL_OUT":
      return [];
    default:
      return state;
  }
};

export default fruitsReducer;
```

```js
// reducers/farmers_reducer.js
const farmersReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case "HIRE_FARMER":
     // shallow dup previous state
      const farmer = {
        // create new farmer object
        id: action.id,
        name: action.name,
        paid: false
      };
      nextState[action.id] = farmer; // add new farmer to state
      return nextState;
    case "PAY_FARMER":
      let farmer = nextState[action.id];
      farmer.paid = !farmer.paid;
      return nextState;
    default:
      return state;
  }
};

export default farmersReducer;
```

Our reducer setup is now much more modular. However, `createStore()` only takes
one `reducer` argument, so we must combine our reducers back into a single
reducer to pass to the store. To do this we will use `combineReducers()` from
the `redux` package and pass it an object that maps state keys to the reducers
that handle those slices of state. `combineReducers()` returns a single
`reducer` that you can use to create your app store.

```js
// reducers/root_reducer.js
import { combineReducers } from "redux";
import fruitsReducer from "./fruits_reducer";
import farmersReducer from "./farmers_reducer";

const rootReducer = combineReducers({
  fruits: fruitsReducer,
  farmers: farmersReducer
});

export default rootReducer;
```

```js
// store/store.js
import { createStore } from "redux";
import rootReducer from "./reducers/root_reducer.js";

const store = createStore(rootReducer);

// initial state
store.getState(); // { fruits: [], farmers: {} }
```

## Delegating to Reducers

Another aspect of reducer composition involves delegating reducer functions to
subordinate reducers. Consider the farmer example. Let's modify it so that the
`farmers` (plural) reducer delegates to a `farmer` (singular) reducer whenever a
single farmer's attributes need to be modified (in this case whether he has been
paid):

```js
// reducers/farmers_reducer.js
const farmerReducer = (state, action) => {
  // state is a farmer object
  Object.freeze(state);
  switch (action.type) {
    case "HIRE_FARMER":
      return {
        id: action.id,
        name: action.name,
        paid: false
      };
    case "PAY_FARMER":
      return Object.assign({}, state, {
        paid: !state.paid
      });
    default:
      return state;
  }
};

const farmersReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case "HIRE_FARMER":
      nextState[action.id] = farmerReducer(undefined, action);
      return nextState;
    case "PAY_FARMER":
      nextState[action.id] = farmerReducer(nextState[action.id], action);
      return nextState;
    default:
      return state;
  }
};

export default farmersReducer;
```

## Official Documentation

You can find more documentation on reducers [here][redux-js].

[redux-js]: http://redux.js.org/docs/basics/Reducers.html
[why-immutable]: https://github.com/reactjs/redux/issues/758
