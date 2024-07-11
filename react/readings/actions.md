# Actions

As you've already learned from the Redux Store reading, **actions** are the only
way for view components to trigger changes to the store. Remember, actions are
simple POJOs with a mandatory `type` key and optional payload keys containing
new information. They get sent using `store.dispatch()` and are the primary
drivers of the Redux loop.

## Action Creators

When an action is dispatched, any new state data must be passed along as the
**payload**:

```js
// actions/fruit_actions.js

const addOrange = {
  type: "ADD_FRUIT",
  fruit: "orange"
};

store.dispatch(addOrange);
store.getState(); // ['orange']
```

However, when these action payloads are generated dynamically, it becomes
necessary to extrapolate the creation of the action object into a function.
These functions are called **action creators**. The javascript objects they
return are the **actions**. To initiate a dispatch, you pass the result of
calling an action creator to `store.dispatch()`.

For example:

```js
// actions/fruit_actions.js

const addFruit = fruit => ({
  type: "ADD_FRUIT",
  fruit
});
```

Now we can add any `fruit` to the store using our action creator
`addFruit(fruit)`, instead of having to define an action object for each fruit.

```js
store.dispatch(addFruit("Apple"));
store.dispatch(addFruit("Strawberry"));
store.dispatch(addFruit("Lychee"));
store.getState(); // [ 'orange', 'apple', 'strawberry', 'lychee' ]
```

## Example

Let's update our actions to include `"ADD_FRUIT"`, `"ADD_FRUITS"`,
`"SELL_FRUIT"` like in the Reducers reading.

```js
// actions/fruit_actions.js

export const ADD_FRUIT = "ADD_FRUIT";
export const ADD_FRUITS = "ADD_FRUITS";
export const SELL_FRUIT = "SELL_FRUIT";

export const addFruit = fruit => ({
  type: ADD_FRUIT,
  fruit
});

export const addFruits = fruits => ({
  type: ADD_FRUITS,
  fruits
});

export const sellFruit = fruit => ({
  type: SELL_FRUIT,
  fruit
});
```

Note that we created constants for all of our fruit action types. Say we
accidentally typed "ADD FRIUT" in our reducer's case statement later on - the
lines of code following it would never be evaluated. By creating constants for
our string literals we ensure that we will get a error thrown were we to write
`ADD_FRIUT`.

## Official Documentation

View the official documentation [here][redux-js]

[redux-js]: http://redux.js.org/docs/basics/Actions.html