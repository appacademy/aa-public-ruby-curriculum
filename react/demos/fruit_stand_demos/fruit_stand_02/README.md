# Fruit Stand App - Part 2

An intro **Redux/React** app with a Redux `store`, `reducer`, `actions`, and a ***connected*** React component.

---
Let's look at and run the code that you just walked through in our React/Redux 
video demo.

1. [Download zip][zip].
1. Unzip and `cd` to the app's root directory.
1. Run `npm install` to install the Redux/React npm packages.
1. The `postinstall` script in the `package.json` take care of running `webpack`,
   but run `npm run webpack` if you plan to make changes to the code
1. `open index.html` to see the app in the browser.
1. Open Dev Tools to see the app's Redux store in action.
  + Available for testing on the `window` are the app `store`, and actions-creators `addOrange()`, `addApple()`, and `clearFruit()`.
  + Try `store.dispatch(addOrange())` in the console. How did the DOM change in **reaction**?
  + Try `store.dispatch(addApple())` in the console. How did the DOM change in **reaction**?
  + Try `store.dispatch(clearFruit())` in the console. How did the DOM change in **reaction**?

Check out `entry.js` (this demo's entry file):
+ Import `React` and `ReactDom` to use React in our app.
+ Check out the app's `store` defined in `frontend/store.js`.
+ Check out the app's actions defined in `frontend/actions.js`.
+ Check out our app's React component `FruitStand` defined in `frontend/components/fruit_stand.jsx`.
  + This React component is ***connected*** to the `store` via its container: `frontend/components/fruit_stand_container.js`.
  + Whenever our application state changes, our container generates new props for our `FruitStand` component

[zip]: https://assets.aaonline.io/fullstack/react/demos/fruit_stand_demos/fruit_stand_02/fruit_stand_02.zip
