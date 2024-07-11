# React-Redux: `connect()`

The `react-redux` package allows us to access the store `context` set by the
`Provider` in a powerful and convenient way via the `connect()` method. Using
`connect()`, we can pass specific slices of the store's state and specific
action-dispatches to a React component as `props`. A component's `props` then
serve as its API to the store, making the component more modular and less
burdened by Redux boilerplate.

## Signature

`connect()` is a _higher-order function_. It takes two arguments (plus a couple
optional arguments you can read more about in the [docs][docs]) and returns a
function:

```js
const createConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
);
```

`createConnectedComponent` then takes your React component and returns a new
React component:

```js
const ConnectedComponent = createConnectedComponent(MyComponent);
```

`ConnectedComponent` will render `MyComponent`, passing along `props` as
determined by the `mapStateToProps` and `mapDispatchToProps` arguments.
`mapStateToProps` and `mapDispatchToProps` will need to be functions. We will
write them as follows:

## mapStateToProps(state, [ownProps])

This first argument to `connect()` is a function, `mapStateToProps`. It tells
`connect()` how to map the `state` into your component's `props`.

It must take as an argument the store's `state` (supplied by the `Provider`'s
store `context`) and return an object containing the relevant `props` for your
component.

```jsx
const MyComponent = ({ name }) => (
	<div>{name}</div>
);

const mapStateToProps = state => ({
	name: state.name;
});

const ConnectedComponent = connect(mapStateToProps)(MyComponent);
```

In the example above, `ConnectedComponent` will render `MyComponent`, passing
`name` as a prop.

### ownProps (optional)

A component with explicit `props` passed down from its parent (e.g.
`<ConnectedComponent lastName={'Wozniak'}/>`) can merge those `props` with
slices of `state` via `ownProps`, an optional second argument to
`mapStateToProps`:

```js
const mapStateToProps = (state, ownProps) => ({
  firstName: state.name,
  initials: `${state.name[0]}. ${ownProps.lastName[0]}.`
});

ConnectedComponent = connect(mapStateToProps)(MyComponent);
```

## mapDispatchToProps

`mapDispatchToProps` is the second argument to `connect()`. It is a function
that accepts the store's `dispatch` method and returns an object containing
functions that can be called to dispatch actions to the store. These action
dispatchers are then passed as `props` to the component.

```js
const deleteTodo = id => ({ type: "DELETE_TODO", id }); // action creators
const addTodo = msg => ({ type: "ADD_TODO", msg });

const mapDispatchToProps = dispatch => ({
  handleDelete: id => dispatch(deleteTodo(id)),
  handleAdd: msg => dispatch(addTodo(msg))
});
```

## Putting it all together

```js
const MyComponent = ({ firstName, initials, handleAdd, handleDelete }) => {
  return <div>...</div>;
};

const mapStateToProps = (state, ownProps) => ({
  firstName: state.name,
  initials: `${state.name[0]}. ${ownProps.lastName[0]}.`
});

const mapDispatchToProps = dispatch => ({
  handleDelete: id => dispatch(deleteTodo(id)),
  handleAdd: msg => dispatch(addTodo(msg))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponent);
```

`MyComponent` will receive `firstName`, `initials`, `handleDelete`, and
`handleAdd` as `props`.

## A Model for Understanding

Here is a fake, simplified version of the connect function. The real connect has
a lot more going on, but this is generally how it works.

```jsx
function connect(mapStateToProps, mapDispatchToProps) {
  // Returns a function that takes your component as an argument
  return function(YourAwesomeComponent) {
    // Leaving out some details, but basically we have access to
    // the store via the context set up by the Provider

    // Your mapStateToProps function gets called with the store's state
    const stateProps = mapStateToProps(store.getState());
    // Your mapDispatchToProps function gets called with the store's dispatch function
    const dispatchProps = mapDispatchToProps(store.dispatch);

    // Returns a React component that renders your component with all the props
    return function Connect(moreProps) {
      const props = Object.assign(stateProps, dispatchProps, moreProps);

      return <YourAwesomeComponent {...props} />;
    };
  };
}
```

[docs]: https://react-redux.js.org/using-react-redux/connect-mapstate#ownprops-optional
