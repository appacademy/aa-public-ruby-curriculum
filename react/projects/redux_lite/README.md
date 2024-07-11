# Redux Lite

Today we're going to be building a tool to keep track of global `state` for an
application. We're going to define a "single source of truth" for any global
data we want to share across our application. This source of truth will
essentially be nothing more than a javascript object, but we will define a
strict API for how this object can be modified. We will also implement a
"subscription" feature, that will allow any other part of our application to
specify a callback to be invoked whenever any changes are made to the object.

## Phase 1 - `Store`

Using ES6 class syntax, create a new class, `Store`, that will represent our
global application state. The `Store#constructor` function will take a single
function as an argument, `rootReducer`. The constructor function should define
instance variables to store the `rootReducer` and the global `state` (an empty
object for now). We also need to have a way to read from the `state`. Define a
`Store#getState` function that returns the `state` instance variable. 

Note: Since we want to control how the `state` can be modified , we want to make
sure we don't return the **actual** `state` object, otherwise we could
inadvertently modify it directly. Instead, return a copy of `this.state` using
`Object.assign`.

Another Quick Note: `Object.assign` only creates a "shallow" copy of our state
object. That means that if our state has any nested objects or arrays, the
original and the copy will still point to the same references. We'll ignore this
for now, but come back here at the end of the project and re-write this function
to return a "deep" copy of state!

## Phase 2 - `Reducers`, `rootReducer`, and `combineReducers`

Now it's time to test out some reducer functions and write a `combineReducers`
function.

### Reducers and Actions

Our global `state` object will store keys representing application data. 
+ `reducers` are pure functions that describe how these pieces of data will
  change in response to `action`s. 
+ `actions` are plain old javascript objects that represent a change that should
  be made to the state object.

For instance, if our state object has keys of `user` and `role` (see below), we
could define reducers, `userReducer` and `roleReducer`, that are responsible for
returning the new value of `user` and `role`, respectively, after every
`action`.

```js
  // example of what our global state might look like

  let state = {
    user: "Andy",
    role: "Instructor"
  };
```

An action that modifies the role might look like: 
 
```js
  // actions are objects that have a type representing the type of change they 
  // will make, and any other data needed to make the change

  const action = {
    type: "change role",
    newRole: "Student"
  };
```

A `roleReducer` might look something like this: 

```js
  // the reducer always takes the old value and the action and is responsible 
  // for returning either a new value or the old value, depending on if it 
  // "responds" to that action type
  const roleReducer = (oldRole = null, action) => {
    if (action.type === "change role") {
      return action.newRole;
    } else {
      return oldRole;
    }
  };
```

In the above function, we check the `type` of the incoming `action`, and then
either return the `oldRole` (nothing should change), or return the new data,
`action.newRole` (`role` should change in response to this action). We will
leave it up to the user of our tool to define their own reducers and actions,
but we will make a few assumptions:

  - reducers will be pure functions. They will not modify their arguments and
    will be deterministic (same output from same input)
  - reducers will always take two arguments: the previous value of the key in
    state (`prevState`) and and `action`
  - reducers will have a default value for their `prevState`
  - if a reducer "ignores" an `action`, it will return the unmodified
    `prevState`
  - if a reducer "responds" to an `action`, it will either return something
    completely new (data from the action) or will create a **new copy** of the
    `prevState` before making any changes.

In a separate file, try to write a few actions and reducers of your own and test
them in the browser console. Remember that your reducers can respond to as many
action types as you want. Call a TA over for a code review before moving on to 
the next phase.

## Combining Reducers
It would be pretty annoying for our users to have to call every reducer manually
to update state. Instead, we'll have them define an object that describes which
reducer is responsible for which part of state. Each key in this object should
point to it's respective reducer. An example of what such an object might 
look like is shown below:

```js
  {
    users: reducerForUsers,
    roles: reducerForRoles,
    bananas: reducerForBananas,
    entities: reducerForEntities
  }
```

Write a function, `combineReducers`, that accepts this object as an argument and
returns a single reducer. The returned reducer function should follow the same
rules that we've laid out for all reducers – it should accept a `prevState` and
an `action`, and return either the `prevState` (if nothing changed), or a copy
of `prevState` (if anything changed). Your reducer should use the provided
object to determine the next value of each key in `prevState`. To do this,
you'll need to:

  - accept `prevState` and `action`
  - go through each key in `prevState`
  - find the old value of that key
  - pass that value and the `action` into the appropriate reducer. 
  - return a new object, with all new values returned from the reducers Test
    your code! Try the following:

```js
const myNoiseReducer = (prevState = "peace and quiet", action) => {
  switch(action.type) {
    case "noisy action":
      return action.noise;
    default:
      return prevState;
  }
};

const myNoisyAction = {
  type: "noisy action",
  noise: "Car alarm"
};

const myInconsequentialAction = {
  type: "a type no one cares about",
  data: {
    thisThing: "will not get used anyway"
  }
};

const myInitialState = {
  noise: "peace and quiet"
};

const myRootReducer = combineReducers({
  noise: myNoiseReducer,
});

let newState = myRootReducer(myInitialState, myInconsequentialAction);
// => { noise: "peace and quiet" }

newState = myRootReducer(newState, myNoisyAction)
// => { noise: "Car alarm" }

myRootReducer(newState, myInconsequentialAction)
// => { noise: "Car alarm" }


// The first time you call `myRootReducer` with `myInconsequentialAction`, it 
// returns the initial state. This is because the only reducer, 
// `myNoiseReducer`, doesn't respond to that action type. When we invoke it with
// `newState` and `myNoisyAction`, however, the `noise` key is modified because 
// `myNoiseReducer` returns something other than its `prevState` for the  
// `"noisy action"` action type. When we invoke the `rootReducer`, with  
// `myInconsequentialAction` the second time, the `noise` property doesn't  
// revert back to it's default value, it just doesn't change.
```

Once you think you have it working, call a TA over for a code review!

## Phase 3 - Dispatch

The function we wrote in the last phase allows many reducers to be combined into
one. As a result, our users can create a single reducer that's responsible for
the entire global state! We'll call this main reducer the `rootReducer`. Recall
that, in the first phase, our `Store#constructor` took a `rootReducer` as an
argument - our user can now use `combineReducers` to create a `rootReducer`, and
then use it to create a `Store`. We'll now define a new function,
`Store#dispatch`, that passes `actions` into this `rootReducer`. After
completing your `Store#dispatch` function, you should now be able to do the
following:

```js
// define a reducer for user:
const userReducer = (oldUser = null, action) => {
  if (action.type === "new user") {
    return action.user;
  }
  return oldUser;
};

// create a rootReducer:
const rootReducer = combineReducers({
  user: userReducer
});

// create a store using the rootReducer:
const store = new Store(rootReducer);

// get the state:
store.getState(); // => {}

// invoke the dispatch function to update the user key:
const action = {
  type: "new user",
  user: "Jeffrey Fiddler"
};

store.dispatch(action);
store.getState(); // => { user: "Jeffrey Fiddler" }
```

Notice that the first time we call `getState`, we get an empty object without a
`user` key. This is not an ideal behavior - our state should have a default
value for each property from the beginning. Let's take advantage of the default
value provided for the `prevState` in each reducer. Modify your `Store` class
and/or your `combineReducers` function to handle this. Instead of assigning
state to an empty object in the `Store#constructor`, invoke the `rootReducer` to
create an initial state object. Some helpful hints:

  - `combineReducers` will need to be modified to handle this special case - the
    `rootReducer`, like all reducers, expects a `prevState` and an `action`
  - regular reducers (not necessarily `combineReducers` reducers!) are written
    to return a default value - you just need to give them an action that they
    don't respond to!

To test your code, create a new `Store` with some rootReducer. You should be
able to call `getState` immediately and see your default state! Get a code
review from a TA once you have it working.

## Phase 4 - Subscribing to the store

Now we have a nice API for modifying our global state. The next step is to allow 
different parts of our application to "listen" for these changes, and then 
trigger some callback in response. To do this, we'll keep track of an array of 
functions called `subscriptions`. Initialize this variable in your 
`Store#constructor`. Next, define a `subscribe` function on the `Store` 
prototype that takes a callback and adds it to the array of subscriptions. 
We also want to control when those subscription callbacks get triggered. 
We **could** trigger them every time `dispatch` is called, but this would be a 
waste of resources since we could potentially have actions that don't affect 
state. Instead, we want to trigger the subscriptions *only* when state changes.
To do this, pass the `subscriptions` array as a third argument to `rootReducer`. 
Inside of `rootReducer`, think of a way to determine whether or not the given 
action has modified any keys in your state (Hint: what assumptions are we making 
about our reducers???). If it has, trigger all of the subscription callbacks and 
pass them the next state.

Test your code! You should be able to subscribe a callback to the store. 
Whenever an action triggers a state change, this callback should be triggered. 
However, if the action doesn't result in a state change, nothing should happen. 
Try the following:

```js
  const actionCreator1 = value => ({
    type: "add",
    value
  });

  const actionCreator2 = value => ({
    type: "subtract",
    value
  });

  const actionCreator3 = value => ({
    type: "no change",
    value
  });

  const numberReducer = (num = 0, action) => {
    switch(action.type) {
      case "add":
        return num + action.value;
      case "subtract":
        return num - action.value;
      default:
        return num;
    }
  }

  const rootReducer = combineReducers({
    number: numberReducer
  });

  const store = new Store(rootReducer);

  store.getState() // => { number: 0 }

  const announceStateChange = nextState => {
    console.log(`That action changed the state! Number is now ${nextState.number}`);
  }

  store.subscribe(announceStateChange);

  store.dispatch(actionCreator1(5)); // => "That action changed the state! Number is now 5"
  store.dispatch(actionCreator1(5)); // => "That action changed the state! Number is now 10"
  store.dispatch(actionCreator2(7)); // => "That action changed the state! Number is now 3"
  store.dispatch(actionCreator3(7)); // => Nothing should happen! The reducer doesn't do anything for type "no change"
  store.dispatch(actionCreator1(0)) // => Nothing should happen here either. Even though the reducer checks for the "add" action type, adding 0 to the number won't result in a state change.

  store.getState(); // => { number: 3 }

```

## Bonus 1 - Log State Changes by Applying Middleware

You can't build a proper clone of Redux without middleware! Let's dive in.

### Middleware

According to the redux docs, `middleware` is **some code you can put between the
framework receiving a request, and the framework generating a response**. In the
context of redux, middleware provides **a third-party extension point between
dispatching an action, and the moment it reaches the reducer**. We'll modify our
`Store` class to use middleware functions, so that we can execute some code
between the moment `Store#dispatch` is invoked with an action, and when that
action is eventually passed to our `Store#rootReducer` function. We'll also
allow our middleware to be "chainable", meaning that we can specify an in-order
list of functions to be invoked for each `dispatch`. Once we've invoked all of
the provided middlewares, we'll invoke the `rootReducer` with the provided
action. Like reducers, we'll make some assumptions about the format of our
middleware functions:

```js
// The format of a middleware function:

const aMiddleware = store => next => action => {
  // Do whatever we want with the store
  // Do whatever we want with the action
  // Optionally invoke `next` with the provided `action`
  // to trigger the next middleware 
  // in the chain like so: `next(action)`
  // If all middlewares invoke `next`, 
  // then eventually `next` will be the `rootReducer`
}
```

In the above example, we have a function that takes the `store` as an argument
and returns another function. The returned function also takes a single
argument, the `next` callback and returns another function (`next` is either the
next middleware in the chain, or the `rootReducer` if we're finished). Finally,
this function accepts the `action`, and then does whatever the middleware is
supposed to do. We can stop the `dispatch` event here if we want, or we can
continue by invoking next: `next(action)`. If this seems like a confusing way to
do this, hold on to your horses because it will all become clear in time.

### `applyMiddleware`

Similar to `combineReducers`, we need to define a function that takes some
arbitrary number of middlewares in order, and returns a single function that
handles the logic of invoking each middleware, followed by an eventual callback
(the rest of our normal redux cycle). The function returned from
`applyMiddleware` will be passed as an argument to `store#constructor`, and
eventually used to modify the `Store#dispatch` function. Example:

```js
  const appliedMiddleware = applyMiddleware(
    firstMiddleware, 
    secondMiddleware, 
    lastMiddleware
  );
  const store = new Store(rootReducer, appliedMiddleware);
```

Or, alternatively:

```js
  const store = new Store(
    rootReducer, 
    applyMiddleware(
      firstMiddleware, 
      secondMiddleware, 
      lastMiddleware
    )
  );
```

#### Part 1

Write a function, `applyMiddleware`, that:

- accepts a list of middleware functions (Hint: spread operator)

- returns a function that accepts a `store` and `rootReducer` (since we don't 
yet have the `store` instance or `rootReducer`) and returns another function.

- The returned function should accept an `action`, and:
  + clone the `middlewares` array (to avoid mutating between calls)

  + define an `invokeNextMiddleware` function (leave blank for now, then see below)

  + return and invoke `invokeNextMiddleware`, passing it the provided action.

Use the following template for guidance:

```js
const applyMiddleware = (...middlewares) => (store, rootReducer) => action => {
  // Your Code Here
}
```

#### Part 2

Write out the functionality of `invokeNextMiddleware`. It should remove the next 
middleware from the array and invoke it with all of the appropriate arguments 
(you should have all of them available at this point). (Hint: Pass 
`invokeNextMiddleware` as the `next` callback!). If there **is no** next 
middleware, then at this point we know we're ready to pass control back to 
`dispatch` and the `rootReducer`, so invoke the `rootReducer` (passed to the 
second function) with the `action`.

#### Part 3

As mentioned earlier, we're passing the first returned function as an argument 
to the `Store` constructor. Save this function in an instance variable, 
`this.appliedMiddleware`, so that we can access it in `dispatch`. Then, modify 
`Store#dispatch` to incorporate it. Since we've done most of the work in 
`applyMiddleware`, all we have to do differently here is invoke the 
`appliedMiddleware` function, and pass it a `Store` instance (`this`) and our 
good old `rootReducer`! One last thing though, remember that `appliedMiddleware` 
returns another function that takes the `action`, so invoke the whole thing 
(`this.appliedMiddleware(store, cb)`) with the original `action`:

```js
  this.appliedMiddleware(store, cb)(action);
```

#### Part 4

Test your flashy new functionality with the following simple middleware functions:

```js
  const middleware1 = store => next => action => {
    console.log("Middleware 1!");
    next(action);
  }

  const middleware2 = store => next => action => {
    console.log("Middleware 2!");
    next(action);
  }
```

You should see each middleware log to the console in order each time you pass an 
action to dispatch.

### Writing your first middleware, `reduxLogger`

Now that you have the ability to `applyMiddleware`, let's build a tool that logs 
any changes to state in the console so we can see what's going on. Write a 
middleware, `reduxLogger`, that logs

  - the `prevState`
  - the `action`
  - the `nextState`

and labels them appropriately.

Note: Getting `nextState` will be a little tricky since it will only be
calculated by the `rootReducer`. However, if `reduxLogger` is **the last
middleware**, we could potentially use the return value of `next(action)`. In
order for this to work properly, make sure your functions are returning state in
all necessary places! Once you can log properly, let's make this tool even
flashier by adding some color to the logged output. Some browsers (try chrome)
support adding CSS to `console.log()`'s using the following fisherman's trick
("%c"):

```js
console.log("%c This is a purple message", "color: purple")
```

Make your output pretty, then also add some other stuff you think looks cool. 
Show a TA your final product.
