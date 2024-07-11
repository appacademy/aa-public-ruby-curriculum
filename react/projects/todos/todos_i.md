# React-Redux Todos Part 1 - Redux

## Overview

[Live Demo!][demo]

In this project, you will create an app that lets people create and manage a
todo list using Redux, React, and Rails. Users of your app will be able to add 
and delete items in their todo list,
as well as mark them as either "done" or "not done". Eventually,
every item in the list will be able to have its own sub-list of "steps" that can
be added, deleted, and marked or unmarked as "done".

Today, you will set up Redux to manage your app's state. Tomorrow, you will 
connect React and Redux. On day 3, you will expand this 
project to use a Rails API backend so that every change made on the frontend
will persist!

The agenda for today includes:

* Create a file system to structure and configure your front end
* Generate a Redux **store** to manage your application's global front end state
* Implement a **reducer** to route different action types to interact with the
  Redux store in different ways
* Set up Redux **actions** and **action creators**
* Implement a full Redux loop for `todos` and `todo steps`
* Use debuggers and bootstrapping to manually test each part of your Redux
  structure
* Use the `store.getState` method to access the data stored in the Redux store
* Use the `store.dispatch` method to dispatch actions to the Redux store

## Phase 1: Frontend Structure

In this phase you will create a file system to structure your frontend,
configure your npm packages and webpack, and test that your frontend
configuration works.

- Model your project folder to look like the directory tree below:

  ```
  index.html
  bundle.js (no need to create this file, webpack will create it for you)
  frontend
    * actions
    * components
    * reducers
    * store
    * util
    todo_redux.jsx
  ```

- Run `npm init -y` and then
  `npm install webpack webpack-cli react react-dom redux react-redux @babel/core babel-loader @babel/preset-react @babel/preset-env`
  to set up React and Redux
  - This command installs the npm packages that you will be using to create your
    React/Redux app.
- Set up your `webpack.config.js` file so that your bundle.js is saved in the
  root directory of your project. If you need to remind yourself how to set up
  the file, refer back to the Webpack reading linked in the sidebar.
- Start `webpack --watch` **Test your setup** - Set up your entry file
  `todo_redux.jsx` to render `<h1>Todos App</h1>` into your root page's
  `#content` container. Open `index.html` and confirm that it worked.

---

## Phase 2: Todos Redux Structure

In this phase you will create a Redux loop, including a store with reducers,
action creators and constants.

### State Shape

You want to build a state that allows you to easily add, remove, and update 
todos. If you stored your list of todos in an array, then querying, updating and 
deleting any todo would be O(n). Using an object to store your todos yields O(1) 
for the same operations given the id of any todo.

So the `todos` slice of your application might look something like this:

```javascript
{
  1: {
    id: 1,
    title: 'wash car',
    body: 'with soap',
    done: false
  },
  2: {
    id: 2,
    title: 'wash dog',
    body: 'with shampoo',
    done: true
  },
}
```

**NB**: `todo.id` is used as the primary identifier i.e. object key.

### Action Creators

An action creator simply returns a Redux action with a defined `type` key and 
optional payload keys. The first one will receive `todos` and populate the 
store, and the second one will receive a single `todo` and either add or update 
a single todo in the store.

Remember that:

- Redux actions are plain-old javascript objects (POJOs) that have a `type`
  property and optional payload keys.
- Action creators don't directly interact with reducers or the `store`, they
  simply return action objects.
- These returned action objects are passed through your `rootReducer` only when
  `store.dispatch(action)` is called.

Create a file `actions/todo_actions.js` that will house your action creators and
action type constants.

#### Action Type Constants

Constants are used to represent action types. They are used whenever action
types are being set or read (i.e. in your action creators and in the `switch`
statements in your reducers and middleware).

It is best practice to use constants for action types, instead of string 
literals. Since the reducer depends on the action's `type` to decipher different 
types of actions, a typo in the reducer or action specifying the type will go 
unseen. For example, imagine if the reducer needs an action with the type 
`CREATE_TODO` to perform the create operation, but there is a typo making the 
reducer listen for the type `'CREATE_TOOD'` instead. When an action of type 
`CREATE_TODO` is dispatched, it will never be evaluated by the reducer listening 
for an action of type `'CREATE_TOOD'`. Creating constants for string literals 
ensures that an error will be thrown for action type typos. 

Create and export `RECEIVE_TODOS` and `RECEIVE_TODO` action types like this:

```javascript
export const RECEIVE_TODOS = "RECEIVE_TODOS";
export const RECEIVE_TODO = "RECEIVE_TODO";
```

#### receiveTodos

This action creator lets your reducer know to reset the list of `todos` and, as
such, will also need to pass along a new set of `todos`. Write your
`receiveTodos` action creator so that it accepts an array argument `todos`. Note
this action creator takes a `todos` _array_ as opposed to a `todos` _object_
because that's how the backend will send the data to your frontend. It will be
the job of the reducer in your frontend to turn this array into an object. The
`receiveTodos` action creator should return an action object with a `type`
property pointing to `RECEIVE_TODOS` and a `todos` property pointing to the
`todos` argument you're passing in. This represents all of your todos data.

It should look something like this:

```javascript
const receiveTodos = (todos) => {
  return {
    type: RECEIVE_TODOS,
    todos,
  };
};
```

You can also have the function implicitly return by removing the function's
curly braces and wrapping the action object's curly braces with parentheses. The
`receiveTodos` code below has the exact same functionality as the code above:

```javascript
const receiveTodos = (todos) => ({
  type: RECEIVE_TODOS,
  todos,
});
```

Although the code looks shorter and cleaner, note that you are unable to use a 
debugger statement to debug a function when it is implicitly returning. You can 
use the VS Code debugger to set a breakpoint, but you won't be able to set a 
breakpoint with a debugger statement.

When working on your React-Redux projects in the future, it'll be helpful to 
keep the return statement so you can easily place a breakpoint with the debugger 
statement to debug the action creator function and make sure a specific action 
is actually being dispatched.

#### receiveTodo

This action creator is formatted in the same way as `receiveTodos`, but accepts
an argument/has a property of just a single `todo`. Write this out now. We will
describe its function later.

### Reducers

#### todosReducer

Redux reducers manage the shape of your application state. Conceptually 
speaking, you can think of the reducer as a function that helps manage the Redux 
store by routing actions based on their `type` attribute. Based on the official 
Redux documentation on the [createStore] method and its parameters, a reducer is 
a "reducing function that returns the next state tree, given the current state 
tree and an action to handle."

- Create and export your `todosReducer` in a file `reducers/todos_reducer.js`.

A Redux reducer accepts two arguments:

- `state` - the previous application state.
- `action` - the action object being dispatched.

Remember that reducers should:

- Return the initial state if the state argument is undefined.
- Return the `state` if the reducer doesn't care about the action.
- Return a new state object if the reducer cares about the `action`.

**N.B.** The reducer must never mutate the previous state. Instead, it should
return a brand new state object with the necessary changes.

Start by setting up your `todosReducer` to return its default state - an
empty object with no todos. **Do not move on to the other cases just yet**:

```js
const todosReducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default todosReducer;
```

#### rootReducer

- Create a new file, `reducers/root_reducer.js`.
  - This file will be responsible for combining your multiple, domain-specific
    reducers. It will `export default` a single `rootReducer`.
- Import `combineReducers` from `redux`.
- Import your `todosReducer` function.
- Create a `rootReducer` using `combineReducers`.

So far, your default application state looks like this:

```js
{
  todos: {
  }
}
```

### Redux Store

A Redux store holds a reference to an application state. The store handles
updating state when actions are dispatched and tells the necessary components to
re-render.

- Create a new file, `store/store.js`
- Refer to the Store reading if needed.
- Import `createStore` from the `redux` library
- Import `rootReducer`
- Create a function `configureStore` which calls `createStore` with the
  `rootReducer`
  - **NB:** While `configureStore` may seem meaningless now, it is a pattern you
    will be following throughout the course. This will come in handy when you
    begin working with `preloadedState` and middlewares, or if you want to use
    hot-module replacement or other snazzy add-ons.
- Export `configureStore`

**Test your code** - Import the store to your entry file. Create your store by
calling `configureStore`, set `window.store = store` in your entry file and then
call `window.store.getState()` in your console. Make sure that this function
returns the initial application state described above. Don't move on until it
does!

**NB**: Keeping your `store` on the `window` while working on a Redux app is a
very handy and quick way to ensure that your state is changing the way you
expect it to given any user interaction, AJAX call, Redux action. However, **you
should only do this while developing**, be sure to remove it later.

Try setting an initial value for state in your `todosReducer`. Feel free to use
this as a template.

```js
// reducers/todos_reducer.js
const initialState = {
  1: {
    id: 1,
    title: "wash car",
    body: "with soap",
    done: false
  },
  2: {
    id: 2,
    title: "wash dog",
    body: "with shampoo",
    done: true
  }
};

const todosReducer = (state = initialState, action) => {
  //...
};
```

It isn't typical to have so much data in the initial state, but it will speed up
your development to have some real todos to test your code on.

**Test your code** - Try calling `window.store.getState()` again from the
console. Does your store's initial state match the default state you defined?

#### Receiving and Reducing `todos`

Now that you have a functioning store, let's test out those actions you created
earlier. Inside of the `todosReducer`, implement the following.

- Import action constants `RECEIVE_TODOS` and `RECEIVE_TODO`.
- Add a new `case` to the `switch` statement in your `todosReducer`
  - This case should execute if the `action.type` is `RECEIVE_TODOS`
  - The `todos` data in your store should be replaced by the data in
    `action.todos`
  - Do not merge the old `todos` state with the new `todos` coming in
  - Remember that `action.todos` is an array of todos. Convert this array into
    an object where the keys are the `id`s of the individual todos and the
    values are the todo objects themselves
- Add another `case` to the `switch` statement to handle `RECEIVE_TODO`
  - This case should return a new state object, adding the `todo` in the
    `action` to the previous state
  - Note that any newly added `todo` will completely replace a `todo` at the
    same object key in the previous state object, so adding a `todo` with the
    same `id` as an old `todo` has the effect of updating the old `todo`
  - You do not need an if/else statement for this functionality.

**NB** Completely replacing the state for the `RECEIVE_TODOS` action is a design
decision we made for this app. Sometimes it makes sense to keep the old data and
merge the new data into it, other times it makes sense to completely replace the
old data with new data. Think about how this decision will affect how your user
interacts with your app.

Remember, you must not mutate state! If you want to change a data structure you
must copy it first. The built-in `Object.assign` method is perfect for this.
Just make sure the first argument is a new blank object to avoid mutations.

Your reducer should look something like this.

```javascript
const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TODOS:
    // return the todos from the action
    case RECEIVE_TODO:
    // Make a new object setting a single key value pair for action.todo
    // Return a new state object by merging your previous state and your
    // new object
    default:
      return state;
  }
};
```

**Test your code!**

You should now be able to run the following in the console:

```javascript
const newTodos = [{ id: 1, ...etc }, { id: 2, ...etc }, ...etc];
store.getState(); // should return default state object
store.dispatch(receiveTodo({ id: 3, title: "New Todo" }));
store.getState(); // should include the newly added todo
store.dispatch(receiveTodos(newTodos));
store.getState(); // should return only the new todos
```

Examine your state object - does it match the state shape shown back in
the reducers section? Specifically, are the `todos` being stored as values in an
object? If it is not, refactor the code in your reducer so that your `todos` are
being stored correctly. **Test again.**

**NB**: You've now implemented a full Redux cycle! Call over a TA for a code
review.

---

### Deleting Todos

Add a new action creator so that you can delete `todo`s.

- Create a new action creator method (in `actions/todo_actions`)
  - `removeTodo`
- Add a new `case` to your reducer's `switch` statement that handles the
  deletion of a todo list item
  - `REMOVE_TODO` should cause that item to be removed from future versions of
    `state.todos`

**Test your code** - You should now be able to create, update, and delete todo
items from the console.

---

## Phase 3: Steps Redux Structure

### Refactoring and Setup

In this phase you will update your app so that each todo list item can have its
own sub-list of `steps`. You will need to build out another Redux cycle for this 
new feature.

Steps will have a `title`, a `todo_id`, and a boolean `done` value.

**You should be testing your code regularly as you add features, like you did
for Todos. It will save you a lot of time if you debug as you code.**

#### Action Creators

In this section you will create essentially parallel action creators to those in
your `todo_actions` file, but for `steps` instead.

- Create a file `actions/step_actions.js`
  - Write action creators `receiveSteps`, `receiveStep`, and `removeStep`
  - Create new `step` constants for each of the action creators
  - Export all of your action creators and constants

**Test your code.**

#### Reducers

- Create another reducer called the `stepsReducer` in
  `reducers/steps_reducer.js`
  - Set a default action to take in its `switch` statement
  - Add this reducer to your `rootReducer` via `combineReducers`

**Test your code.**

#### Update the store

Store your steps the same way as todos, in an object keyed by id. This
structure is the easiest to maintain and helps avoid things like duplicated
data and complex reducers.

Your application state will end up looking like this:

```js
{
  todos: {
    1: {
      id: 1,
      title: 'take a shower',
      body: 'and be clean',
      done: false
    }
  },
  steps: {
    1: { // this is the step with id = 1
      id: 1,
      title: 'walk to store',
      done: false,
      todo_id: 1
    },
    2: { // this is the step with id = 2
      id: 2,
      title: 'buy soap',
      done: false,
      todo_id: 1
    }
  }
}
```

**Test your code:** You should be able to create, toggle, and destroy steps from 
the console.

Here are some example dispatches that you should be able to make:

```javascript
const newTodos = [
  { 
    id: 1, 
    title: 'Learn Redux', 
    body: 'It is fundamental', 
    done: false 
  }, 
  { 
    id: 2, 
    // ...etc 
  }, 
  // ...etc
];
const newSteps = [
  { 
    id: 1, 
    title: 'Dispatch actions', 
    done: false, 
    todo_id: 1 
  }, 
  { 
    id: 2, 
    // ...etc 
  }, 
  // ...etc
];
store.dispatch(receiveTodos(newTodos));
store.dispatch(receiveSteps(newSteps));
store.getState(); // should return only the new todos and steps

store.dispatch(receiveTodo({ id: 3, title: "New Todo" /* ...etc */ }));
store.dispatch(receiveStep({ id: 3, title: "New Step" /* ...etc */ }));
store.getState(); // should include the newly added todo and step

store.dispatch(receiveTodo({ id: 3, title: "Newer Todo" /* ...etc */ }));
store.dispatch(receiveStep({ id: 3, title: "Newer Step" /* ...etc */ }));
store.getState(); // should update the previously added todo and step

store.dispatch(removeTodo({ id: 3, title: "Newer Todo" /* ...etc */ }));
store.dispatch(removeStep({ id: 3, title: "Newer Step" /* ...etc */ }));
store.getState(); // should not include the previously added todo
```

Once you are satisfied, call over a TA for a code review.

[createStore]: https://redux.js.org/api/createstore/
[normalized state shape]: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape/#designing-a-normalized-state
[demo]: https://aa-todos.herokuapp.com/
