# Middleware And Thunks Quiz

```js
const thunkMiddleware = ({ dispatch, getState }) => next => action => {
  if (typeof action === "function") {
    return dispatch(action);
  }
  return next(action);
};
```

<quiz>
  <question>
    <p>What is wrong with the above thunk middleware?</p>
    <answer>thunkMiddleware should condition on `typeof action == 'object'`</answer>
    <answer>thunkMiddleware should `dispatch(action)` and then return `next(action)`</answer>
    <answer correct>thunkMiddleware should return `action(dispatch)` </answer>
    <answer>thunkMiddleware's first arguments should be `({ dispatch, getState }, next)`</answer>
    <explanation>Thunk should pass dispatch as an argument to the action instead of the other way around.</explanation>
  </question>
</quiz>

<quiz>
  <question>
    <p>Redux middleware receives action dispatches _______ the reducer.</p>
    <answer correct>Before</answer>
    <answer>After</answer>
    <explanation>When an action is dispatched, the redux middleware in your application will determine if a side effect (or some operation) is needed before sending the action to the reducer.</explanation>
  </question>
</quiz>

```js
export const createKitten = (parentId, kitten) => dispatch =>
  CatAPIUtil.createKitten(parentId, kitten).then(kitten =>
    dispatch(receiveCat(kitten))
  );
```

<quiz>
  <question>
    <p>What is wrong with the above action creator?</p>
    <answer>Action creators should return POJOs.</answer>
    <answer correct>There is nothing wrong with `createKitten`.</answer>
    <answer>`then` needs a second argument.</answer>
    <answer>Functional action creators should return a promise.</answer>
    <explanation>There's nothing wrong!</explanation>
  </question>
</quiz>

<quiz>
  <question>
    <p>When the user clicks a button on the view layer to load an index page, what is the order in which different pieces of code are triggered?</p>
    <answer correct>Button clicked => Dispatch (Request) Action => Middleware => API => Dispatch (Response) Action => Middleware => Reducer => Component re-renders</answer>
    <answer>Button clicked => Dispatch (Request) Action => Middleware => Reducer => API => Component re-renders</answer>
    <answer>Button clicked => Dispatch (Response) Action => Reducer => Middleware => Reducer =>
  Component re-renders</answer>
    <explanation>When the button is clicked, the `onClick` function will get invoked. This function will dispatch the request action to fetch all the items for the index page. The middleware will see the action, then use the API to fetch that data from the backend. A response action will be dispatched with the response received from the backend. The middleware will see this action, recognize it is a POJO, and send it to the Reducer, which will update the state. The state update then triggers a re-render!</explanation>
  </question>
</quiz>

<quiz>
  <question>
    <p>What is the purpose of thunks?</p>
    <answer correct>To handle asynchronous events in Redux</answer>
    <answer>To allow the store to have asynchronous function calls in the reducer</answer>
    <answer>To allow actions to contain functions</answer>
    <answer>To allow an application to make calls to `async` functions</answer>
    <explanation>Thunks are action creators that allow you to make asynchronous function calls. The resulting _thunk actions_ are then intercepted by a thunk middleware that invokes the asynchronous function and dispatches a normal action to the reducers with the result.</explanation>
  </question>
</quiz>

<quiz>
  <question>
    <p>What is _Redux thunk_?</p>
    <answer correct>A middleware that allows you to call action creators that return a function</answer>
    <answer>A special kind of object that is dispatched whenever you want to handle asynchronous events</answer>
    <answer>A function that returns an array of objects</answer>
    <answer>The only function that updates state</answer>
    <explanation>_Redux thunk_ is a middleware that allows you to call action creators that return a function.</explanation>
  </question>
</quiz>
