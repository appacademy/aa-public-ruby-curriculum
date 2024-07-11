# Fruit Stand App

## Phase 01 - Redux Only

This is simple **Redux** application with a Redux `store`, a `reducer` and
actions.

**NB**: There are no React components in this phase.

---

Let's start by looking at the code you just walked through in the first half of
the Redux Store reading.

- Notable libraries used - `redux`.
- Actions are defined in [`frontend/actions.js`][actions-code].
- The app's `reducer` (i.e. reducing function) is defined in
  [`frontend/reducer.js`][reducer-code].
- The app's Redux store is instantiated in [`frontend/store.js`][store-code].
  - The Redux store constructor `createStore` is imported from `redux`.
  - The app's `reducer` is imported from `frontend/reducer.js`.

Next, it's time to install the demo for yourself! Follow these instructions:

- Download the [zip][zip].
- Unzip and `cd` to the app's root directory.
- Run `npm install` to install the Redux npm packages.
- The `postinstall` script in the `package.json` takes care of running `webpack`,
  but run `npm run webpack` if you plan to make changes to the code.
- `open index.html` to see the app in the browser.

Cool, now let's interact with the app. The app's `store` and actions `addOrange`
and `addApple` are defined on the `window`.

- Open Dev Tools to see the app's Redux store in action.
- Try dispatching actions to see how they change the app's state.

For example,

```
store.getState();
store.dispatch(addOrange);
store.getState();
store.dispatch(addApple);
store.getState();
```

- Create new actions on the `window`.
- Try dispatching them. How do they change the app's state?

For example,

```
const addLychee = { type: 'ADD_FRUIT', fruit: 'lychee' };
store.dispatch(addLychee);
store.getState();
```

In the next phase, we will add React components to render the fruit stored in
the app's state - creating our first React/Redux app.

---

[zip]:
  https://assets.aaonline.io/fullstack/react/demos/fruit_stand_demos/fruit_stand_01/fruit_stand_01.zip
[store-code]:
  https://assets.aaonline.io/fullstack/react/demos/fruit_stand_demos/fruit_stand_01/frontend/store.js
[reducer-code]:
  https://assets.aaonline.io/fullstack/react/demos/fruit_stand_demos/fruit_stand_01/frontend/reducer.js
[actions-code]:
  https://assets.aaonline.io/fullstack/react/demos/fruit_stand_demos/fruit_stand_01/frontend/actions.js
