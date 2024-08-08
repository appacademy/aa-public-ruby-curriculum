# Redux Fundamentals Quiz

A React component's `#render` method will be invoked whenever:
- [ ] The component's state changes
- [ ] The component's props change
- [ ] The component's parent re-renders

<details><summary>Answer:</summary>

- The component's state changes
- The component's props change
- The component's parent re-renders</details>
<details><summary>Explanation:</summary>

All three will trigger `render` for the component!</details>

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

What is wrong with the above reducer?
- [ ] It does not return the default state when invoked the first time.
- [ ] It mutates the old state.
- [ ] It does not return the oldState when passed irrelevant actions.
- [ ] It does not `switch` on the correct property.

<details><summary>Answer:</summary>

It mutates the old state.</details>
<details><summary>Explanation:</summary>

Reducers should **never mutate** old state. If a slice of state in a reducer is going to be updated then that reducer should return an entirely new object.</details>

The `connect` function connects which two entities?
- [ ] React components and the store
- [ ] React components and action-creators
- [ ] The store and action-creators
- [ ] The store and api endpoints
- [ ] Api endpoints and action-creators

<details><summary>Answer:</summary>

React components and the store</details>
<details><summary>Explanation:</summary>

`connect` connects the store to our React component!</details>

The purpose of the provider is to:
- [ ] Provide customer support by calling a toll-free hotline
- [ ] Provide action-creators to the store with
- [ ] Provide the store to the component hierarchy
- [ ] Provide api endpoints to the store

<details><summary>Answer:</summary>

Provide the store to the component hierarchy</details>
<details><summary>Explanation:</summary>

`Provider` gives the component hirearchy access to the Redux store we create.</details>

How does a React component gain access to the state?
- [ ] The container component connects the component to the store, passing select pieces of the state as props to the component 
- [ ] `connect` takes the store as an argument and curries it along to the component
- [ ] The store must be explicitly passed down from parent component to child component until it reaches its destination, where it can be used

<details><summary>Answer:</summary>

The container component connects the component to the store, passing select pieces of the state as props to the component </details>
<details><summary>Explanation:</summary>

We need to connect the React component to the store in the container for the component to have access to the state!</details>

```js
// frontend/actions/cats_actions.js
export const RECEIVE_CATS = "RECEIVE_CATS";
export const REQUEST_CATS = "REQUEST_CATS";

//...
```

The file above exports multiple objects. How would you import `RECEIVE_CATS` and `REQUEST_CATS` in another file?
- [ ] ```import RECEIVE_CATS from '../actions/cats_actions'; 
                import REQUEST_CATS from '../actions/cats_actions';```
- [ ] `import * as CatActions from '../actions/cats_actions';`
- [ ] `import { RECEIVE_CATS, REQUEST_CATS } from '../actions/cats_actions';`
- [ ] `import RECEIVE_CATS, REQUEST_CATS from '../actions/cats_actions';`

<details><summary>Answer:</summary>

- `import * as CatActions from '../actions/cats_actions';`
- `import { RECEIVE_CATS, REQUEST_CATS } from '../actions/cats_actions';`</details>
<details><summary>Explanation:</summary>

Because `RECEIVE_CATS` AND `REQUEST_CATS` are exported individually from the `cat_actions.js`, we can either import all of the things exported from `cats_actions.js` (`import * as CatActions from '../actions/cats_actions';`) or we can destructure to explicity pull out the items we want to import by running (`import { RECEIVE_CATS, REQUEST_CATS } from '../actions/cats_actions';`)</details>

```js
// frontend/reducers/cats_reducer.js
const cats = (state = {}, action) => {
  //...
};

export default cats;
```

Above is a file that exports one object. How could you import `cats` in another file?
- [ ] `import * as CatReducer from './cats';`
- [ ] `import cats from './cats';`
- [ ] `import { cats } from './cats';`
- [ ] `import from './cats'`

<details><summary>Answer:</summary>

`import cats from './cats';`</details>
<details><summary>Explanation:</summary>

When we export a single object using `export default` we just need to name the object we are importing - no destruturing by running `import cats from './cats';`</details>
