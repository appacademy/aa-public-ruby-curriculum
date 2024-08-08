# Middleware And Thunks Quiz

```js
const thunkMiddleware = ({ dispatch, getState }) => next => action => {
  if (typeof action === "function") {
    return dispatch(action);
  }
  return next(action);
};
```

What is wrong with the above thunk middleware?
- [ ] thunkMiddleware should condition on `typeof action == 'object'`
- [ ] thunkMiddleware should `dispatch(action)` and then return `next(action)`
- [ ] thunkMiddleware should return `action(dispatch)` 
- [ ] thunkMiddleware's first arguments should be `({ dispatch, getState }, next)`

<details><summary>Answer:</summary>

thunkMiddleware should return `action(dispatch)`</details>
<details><summary>Explanation:</summary>

Thunk should pass dispatch as an argument to the action instead of the other way around.</details>

Redux middleware receives action dispatches _______ the reducer.
- [ ] Before
- [ ] After

<details><summary>Answer:</summary>

Before</details>
<details><summary>Explanation:</summary>

When an action is dispatched, the redux middleware in your application will determine if a side effect (or some operation) is needed before sending the action to the reducer.</details>

```js
export const createKitten = (parentId, kitten) => dispatch =>
  CatAPIUtil.createKitten(parentId, kitten).then(kitten =>
    dispatch(receiveCat(kitten))
  );
```

What is wrong with the above action creator?
- [ ] Action creators should return POJOs.
- [ ] There is nothing wrong with `createKitten`.
- [ ] `then` needs a second argument.
- [ ] Functional action creators should return a promise.

<details><summary>Answer:</summary>

There is nothing wrong with `createKitten`.</details>
<details><summary>Explanation:</summary>

There's nothing wrong!</details>

When the user clicks a button on the view layer to load an index page, what is the order in which different pieces of code are triggered?
- [ ] Button clicked => Dispatch (Request) Action => Middleware => API => Dispatch (Response) Action => Middleware => Reducer => Component re-renders
- [ ] Button clicked => Dispatch (Request) Action => Middleware => Reducer => API => Component re-renders
- [ ] Button clicked => Dispatch (Response) Action => Reducer => Middleware => Reducer =>
  Component re-renders

<details><summary>Answer:</summary>

Button clicked => Dispatch (Request) Action => Middleware => API => Dispatch (Response) Action => Middleware => Reducer => Component re-renders</details>
<details><summary>Explanation:</summary>

When the button is clicked, the `onClick` function will get invoked. This function will dispatch the request action to fetch all the items for the index page. The middleware will see the action, then use the API to fetch that data from the backend. A response action will be dispatched with the response received from the backend. The middleware will see this action, recognize it is a POJO, and send it to the Reducer, which will update the state. The state update then triggers a re-render!</details>

What is the purpose of thunks?
- [ ] To handle asynchronous events in Redux
- [ ] To allow the store to have asynchronous function calls in the reducer
- [ ] To allow actions to contain functions
- [ ] To allow an application to make calls to `async` functions

<details><summary>Answer:</summary>

To handle asynchronous events in Redux</details>
<details><summary>Explanation:</summary>

Thunks are action creators that allow you to make asynchronous function calls. The resulting _thunk actions_ are then intercepted by a thunk middleware that invokes the asynchronous function and dispatches a normal action to the reducers with the result.</details>

What is _Redux thunk_?
- [ ] A middleware that allows you to call action creators that return a function
- [ ] A special kind of object that is dispatched whenever you want to handle asynchronous events
- [ ] A function that returns an array of objects
- [ ] The only function that updates state

<details><summary>Answer:</summary>

A middleware that allows you to call action creators that return a function</details>
<details><summary>Explanation:</summary>

_Redux thunk_ is a middleware that allows you to call action creators that return a function.</details>
