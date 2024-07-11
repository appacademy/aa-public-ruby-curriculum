# react-redux: <Provider/>

So far we have introduced and used the `redux` node package, which
allows us to create Redux `store` objects with `dispatch()`, `getState()`, and
`subscribe()` methods via `createStore()`. Using these methods alone,
we can create a fully-functional React-Redux application. However,
the creators of `redux` also give us `react-redux`, a node package with
[**bindings**][bindings] simplifying the most common React-Redux interactions,
that we will also use.

## Setup

```
npm install react-redux
```

```js
import { Provider } from "react-redux";
```

## Threading Props: An Anti-Pattern

Oftentimes, a deeply nested component will need access to the store, while its
parents do not. Using vanilla React, these parents would have to receive
the `store` prop in order to pass it down to its child.

Consider the example below:

```jsx
// app.jsx
import React from 'react';

const UserInfo = ({ store }) => (
  <div>
    {store.getState().username}
  </div>
);

const Header = ({ store }) => (
  <div>
    <UserInfo store={store} />
  </div>
);

const App = ({ store }) => (
  <div>
    <Header store={store} />
  </div>;
);

export default App;
```

```jsx
// entry.js
import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import reducer from "./reducer.js";
import App from "./app.jsx";

document.addEventListener("DOMContentLoaded", () => {
  const store = createStore(reducer);
  const rootEl = document.getElementById("root");
  ReactDOM.render(<App store={store} />, rootEl);
});
```

The `store` is created in the entry file, but the `UserInfo` component that needs
to access it is deeply nested. Thus, the store must be passed as a prop
down the entire component tree, even though components such as the `Header`
do not need to access the store.

This pattern, called **prop-threading**, is tedious and error-prone. We can 
avoid it by using the `Provider`/`connect()` API provided by `react-redux`.

## Provider: Setting `context`

Using the `Provider` component defined by the `react-redux` package, we can
pass the store to deeply nested components without explicit threading.

We'll create a `Root` component which takes as an argument `store` and
wraps our `App` component with the `Provider` component like so:

```jsx
// root.jsx
import React from "react";
import { Provider } from "react-redux";
import App from "./app.jsx";

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
```

Thus in our entry file, we'll render a `Root` component which passes
the store to all nested components 'invisibly'.

```jsx
// entry.js
import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import reducer from "./reducer.js";
import Root from "./root.jsx";

document.addEventListener("DOMContentLoaded", () => {
  const store = createStore(reducer);
  const rootEl = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, rootEl);
});
```

**NB**: The `Provider` is simply a React component in which we wrap the rest
of the application. It receives the `store` as a `prop`. The `Provider` then 
sets a `store` `context` (i.e. an invisible prop), which is passed down to all
of its children. Because we wrapped the entire `App` in the Provider, all
our components will receive the store context.

Components that need to access the store context will have to `connect()`,
which converts the `store` context into a `store` prop. We'll discuss how
`connect()` works in the next reading.

Read more on `context` if you are curious. You can check out the
[official documentation][context]. However, you don't really need to
know exactly how it works to use the `react-redux` API, so feel free to skip it.

[context]: https://reactjs.org/docs/context.html
[bindings]: https://en.wikipedia.org/wiki/Language_binding
