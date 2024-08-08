# Redux Fundamentals Quiz

<quiz>
  <question multiple>
    <p>A React component's `#render` method will be invoked whenever:</p>
    <answer correct>The component's state changes</answer>
    <answer correct>The component's props change</answer>
    <answer correct>The component's parent re-renders</answer>
    <explanation>All three will trigger `render` for the component!</explanation>
  </question>
</quiz>

```js
function UserReducer(oldState = {}, action) {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "LOGOUT":
      return {};
    case "UPDATE_FRIENDS":
      oldState.friends = action.friends;
      return oldState;
    default:
      return oldState;
  }
}
```

<quiz>
  <question>
    <p>What is wrong with the above reducer?</p>
    <answer>It does not return the default state when invoked the first time.</answer>
    <answer correct>It mutates the old state.</answer>
    <answer>It does not return the oldState when passed irrelevant actions.</answer>
    <answer>It does not `switch` on the correct property.</answer>
    <explanation>Reducers should **never mutate** old state. If a slice of state in a reducer is going to be updated then that reducer should return an entirely new object.</explanation>
  </question>
</quiz>

<quiz>
  <question>
    <p>The `connect` function connects which two entities?</p>
    <answer correct>React components and the store</answer>
    <answer>React components and action-creators</answer>
    <answer>The store and action-creators</answer>
    <answer>The store and api endpoints</answer>
    <answer>Api endpoints and action-creators</answer>
    <explanation>`connect` connects the store to our React component!</explanation>
  </question>
</quiz>

<quiz>
  <question>
    <p>The purpose of the provider is to:</p>
    <answer>Provide customer support by calling a toll-free hotline</answer>
    <answer>Provide action-creators to the store with</answer>
    <answer correct>Provide the store to the component hierarchy</answer>
    <answer>Provide api endpoints to the store</answer>
    <explanation>`Provider` gives the component hirearchy access to the Redux store we create.</explanation>
  </question>
</quiz>

<quiz>
  <question>
    <p>How does a React component gain access to the state?</p>
    <answer correct>The container component connects the component to the store, passing select pieces of the state as props to the component </answer>
    <answer>`connect` takes the store as an argument and curries it along to the component</answer>
    <answer>The store must be explicitly passed down from parent component to child component until it reaches its destination, where it can be used</answer>
    <explanation>We need to connect the React component to the store in the container for the component to have access to the state!</explanation>
  </question>
</quiz>

```js
// frontend/actions/cats_actions.js
export const RECEIVE_CATS = "RECEIVE_CATS";
export const REQUEST_CATS = "REQUEST_CATS";

//...
```

<quiz>
  <question multiple>
    <p>The file above exports multiple objects. How would you import `RECEIVE_CATS` and `REQUEST_CATS` in another file?</p>
    <answer>```import RECEIVE_CATS from '../actions/cats_actions'; 
                import REQUEST_CATS from '../actions/cats_actions';```</answer>
    <answer correct>`import * as CatActions from '../actions/cats_actions';`</answer>
    <answer correct>`import { RECEIVE_CATS, REQUEST_CATS } from '../actions/cats_actions';`</answer>
    <answer>`import RECEIVE_CATS, REQUEST_CATS from '../actions/cats_actions';`</answer>
    <explanation>Because `RECEIVE_CATS` AND `REQUEST_CATS` are exported individually from the `cat_actions.js`, we can either import all of the things exported from `cats_actions.js` (`import * as CatActions from '../actions/cats_actions';`) or we can destructure to explicity pull out the items we want to import by running (`import { RECEIVE_CATS, REQUEST_CATS } from '../actions/cats_actions';`)</explanation>
  </question>
</quiz>

```js
// frontend/reducers/cats_reducer.js
const cats = (state = {}, action) => {
  //...
};

export default cats;
```

<quiz>
  <question multiple>
    <p>Above is a file that exports one object. How could you import `cats` in another file?</p>
    <answer>`import * as CatReducer from './cats';`</answer>
    <answer correct>`import cats from './cats';`</answer>
    <answer>`import { cats } from './cats';`</answer>
    <answer>`import from './cats'`</answer>
    <explanation>When we export a single object using `export default` we just need to name the object we are importing - no destruturing by running `import cats from './cats';`</explanation>
  </question>
</quiz>
