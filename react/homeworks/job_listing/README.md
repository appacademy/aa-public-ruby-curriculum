# Job Listing

Today, we're going to finish building out the architecture for a React job
listing widget to use a Redux store. For this assignment, we won't be using
`Provider` or `connect()`. We will be using the store's three built-in methods:
`subscribe`, `dispatch`, and `getState`.

Take a look at the [live demo][live-demo] to see the app in action. Try clicking
on a location to see the different job listings from Github.

[live-demo]: https://appacademy.github.io/curriculum/job_listing_demo/

Here is a visualization of how the Redux cycle will work within our Job Listing
project.

![Redux Cycle](https://assets.aaonline.io/fullstack/react/assets/redux.gif)

#### Let's Break this down:

- React will render components that will _dispatch_ actions (POJO with a type
  and some data attached).
  - This could be triggered by something like clicking a button.
- The Redux store will pass that action (the POJO) to the root reducer.
  - The root reducer will then pass the action to each of the reducers it has
    access to.
- If the action type matches the type any reducer is listening for, we can
  add/remove/modify the action’s payload (data) into our new redux state (**not
  the same as a React component's local state!**).
- The redux reducer will change the store which will then return a new updated
  redux state.
  - When we get a new redux state, some of your components were reading directly
    from your redux state (these are called props or properties) so they will
    register the changes in state. The components that have new props (because
    of the original dispatched action triggered a change in our redux store)
    will now re-render.

## Phase 0: Setup

To get started, download the [project skeleton][job-skeleton]. Make sure to run
`npm install` to get all the required node modules. Run `npm start` (a handy npm
script we've set up) to start `webpack --watch`. Note, there will be webpack
errors but we'll work on fixing those right now.

[job-skeleton]:
  https://assets.aaonline.io/fullstack/react/homeworks/job_listing/skeleton.zip

Poke around the components in the `frontend/components` folder and get
acquainted with them, especially the `Widget` component. Notice where we call
the store's built-in methods throughout:

- `subscribe` in the constructor
- `dispatch` in the AJAX's success callback
- `getState` in the render function

Now we need to make the actual Redux store so our `Widget` can successfully call
all of those!

## Phase 1: Job Listing Redux Structure

Following the Redux pattern, a store should keep track of our application's
state. This means that when we make our AJAX request to fetch job listings, it
should update the store with its results. This is exactly what the `success`
callback in our `Widget`'s `$.ajax`' call is trying to do. But right now, we
don't have a store to dispatch to!

To make a fully-functional store, we need a reducer function, actions, and the
store itself.

### Creating a `store`

Let's start by defining our app's Redux `store`.

- Open `frontend/store.js`.
- We will need to import `createStore` from `redux`.

* Also import our `reducer` function from `frontend/reducer.js`. This is a dummy
  function which returns the default state, we'll replace it soon.

- Then, all we have to do is call `createStore`, passing in the reducer
  function.
- Don't forget to export it!

The entry file requires our `store` and passes it as a prop to the `Widget`
component. If you refresh the `index.html` page, you'll see a new webpack error:
`selectLocation` is `undefined` in `Widgets`. Let's fix this by creating an
action creator.

### Creating an Action Creator

We need an action creator that will build the action object we pass to
`store.dispatch`. Look in the `Widget` component again. You can see in the
AJAX's success callback that we're using the `selectLocation` function to create
the action passed to the store's `dispatch` call. Time to write that action
creator.

Open `frontend/actions.js`. This is where our app's action creators will live.
Let's define and export a `selectLocation` function that takes as arguments a
`city` string and a `jobs` array. It returns an action (i.e. a POJO, plain old
javascript object) with the following keys and values:

- `type: "SWITCH_LOCATION"`
- `city`
- `jobs`

Set it temporarily on the window (`window.selectLocation = selectLocation`) and
make sure it's working properly in the console before moving on.

### Creating the `reducer`

Open `frontend/reducer.js`. As you know from the [reducers
reading][reducers-reading], a reducer is a function that takes in the current
`state` and an `action`, and returns an updated state based on the action type.

[reducers-reading]: reducers

For our widget, our state needs to keep track of two things: location and a
collection of corresponding job listings. We need to pass some initial/default
values in the case that state is not passed in.

```js
const initialState = { city: "Please Select", jobs: [] };
```

We currently have defined a dummy reducer which always returns the
`initialState`. Now let's build it out by adding a `switch` statement. It's
going to start by looking something like this:

```js
const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
```

Don't forget the export statement!

Right now, we're returning the same state that is passed in. What we want to do
is see if the `action.type` matches something we expect (e.g.
`"SWITCH_LOCATION"`) and return an updated version of the state accordingly. Add
a `case` statement to check for this action type. It should return a new object
with the correct properties. We can grab those off the action (i.e.
`action.jobs` and `action.city`).

At this point, we have created a Redux store that dispatches actions and
responds to dispatched actions. Let's put the reducer on the window
(`window.reducer = reducer`) and then test it out in the browser console. Pass a
test case to the reducer and make sure it returns what we're expecting. For
example,

```js
let action = {
  type: "SWITCH_LOCATION",
  city: "remote",
  jobs: [
    {
      id: 1,
      title: "Test Job",
      company: "Github",
      type: "Full Time",
      location: "remote",
      description: "test description",
      url: "www.github.com/appacademy"
    }
  ]
};
reducer(null, action); //=> {city: "remote", jobs: [{ id: 1, .. }]}
```

Perfect! Make sure to remove the reducer from the window once you're done
testing it.

If you refresh the `index.html` page, you should have a working job listing app!
