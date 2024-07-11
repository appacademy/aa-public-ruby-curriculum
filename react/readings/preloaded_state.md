# Preloaded State

So far, our stores have initialized with no initial state. Sometimes, though, 
you may want to take pre-existing data and pass it into the store upon 
intialization, such as when user is already logged in to your application. 
Such data can be passed in to the `preloadedState` argument of `createStore()`.

```js

const preloadedState = { user: window.currentUser };

const store = createStore(reducer, preloadedState, enhancers);

```

It's all pretty simple, but there are a few things to note.
*	The `preloadedState` must match the state shape (as produced by the
reducers).
*	`preloadedState` is not the same as default state. Default state should always be set in your reducers themselves.
