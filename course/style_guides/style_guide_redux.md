# App Academy Redux Style Guide

## Instructions

Instructions **must** follow the following pattern:

### Backend / Redux:

1. Backend

1. Util

1. Design State Shape

1. Action Creators

1. Reducer -> RootReducer

1. Store

1. Middleware

1. Selectors

### React (first time through):

1. App

1. Root -> Provider

1. Container

1. Presentational

1. Router -> AppRouter

### React (second+ time through):

1. AppRouter / Parent Component (add reference to new component)

1. Container

1. Presentational

## Store

1. Export `configureStore` rather than a store itself to the entry 
file. `configureStore` should accept a parameter for `preloadedState`.

## Routing

1. Prefer `<Link>` to `router.push` to change the path.

1. Produce component hooks via higher order components that use `
connect` to hook into the store.

## Bootstrapping Data

1. Pass the boot-strapped `window.currentUser` in as `preloadedState`.

1. Remove `currentUser` from the window after bootstrapping.

## Organization

1. `ReactDOM.render` should take a `Root` component that takes `store` 
and `history` props and returns an application wrapped in `Provider` 
and `Router`.

1. Utilize an index reducer file that is imported and given to the 
store (same for middlewares when using multiple ones).

1. Export action type constants from the appropriate actions file.

1. Prefer `FETCH_BENCHES` vs `BenchActions.FETCH_BENCHES` for `
actionTypes`.

## Containers

1. Containers vs Presentational: Your route level components should 
contain, others should present. This is a rule of thumb that can be 
deviated from when appropriate.

1. Naming Container Components: `BenchIndexContainer`, not `BenchIndex`.

1. Containers live in the same folder as their presentational 
counterparts.

1. Containers will have to be wrapped in `withRouter` (to receive `router.push` as a prop) from `react-router` to allow their presentational components to change the path.

## Components 

1. `Root` should be the top-level component passed to `ReactDOM.render()`.

1. Form components should keep internal state.

## Naming Conventions

1. Use `rootReducer` for the top-level reducer.

1. Use `<Root>` for the top-level component.

1. Filenames should be explicit and not directory-dependent.

```js

import benchesReducer from `./reducers/benches_reducer.js`;

combineReducers({
	benches: benchesReducer
});
```

## Mutating Objects

1. Use `Object.assign` to duplicate state

## Syntax Conventions.

1. Use object destructuring to access attributes of `props` / `state`.

```js
const { user, bench, params: { pathname }} = this.props;
```

## Routing

1. Use `ReactRouter` > 4.0. 

1. Components can change the path via `router.push`.

```jsx
class Komp extends React.Component {

  save { ... }
  
  submit(e) {
    e.preventDefault();
    this.save()
    .then(this.props.router.push('/'));
  }
}

export default withRouter(Komp);
```

## Reducers

1. Use selectors. Selectors should receive the entire state and destructure it in its function definition.

```js
// components/todo_index_container.js
import allTodos from '../reducers/selectors';

const mapStateToProps = state => ({
  todos: allTodos(state),
  filters: state.filters,
  // ...
});
```

```js
// reducers/selectors.js

const allTodos = ({ todos }) => (
  Object.keys(todos).map(id => todos[id]);
);
```

1. Each reducer should maintain its own initial state. Avoid using 
`preloadedState` for this.

```js
// good

const benches = ( state = [], action ) => { ... };
const currentUser = ( state = nil, action ) => { ... };
const reducer = combineReducers({ benches, currentUser });

const store = createStore(reducer);

// bad

const benches = (state, action) => { ... };
const currentUser = (state, action) => { ... };
const reducer = combineReducers({benches, currentUser});

const preloadedState = { benches: [], currentUser: nil };
const store = createStore(reducer, preloadedState);
```

## Middleware

1. The plural of middlware is middlewares, not middleware.

## Readings

1. Add summaries and code snippets to each reading for easy reference from projects

1. Each code snippet should start with a comment that says the file path

[orst]: https://babeljs.io/docs/plugins/transform-object-rest-spread/
