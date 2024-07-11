# Flux

Flux is a front-end application architecture Facebook developed to use with
React. Flux is not a library or framework. Like MVC, Flux is simply a pattern in
which to structure one’s application. It doesn’t even need to be used with
React! Flux provides unidirectional data flow, which affords more predictability
than the multi-threaded, cascading updates one might encounter in an MVC
application.

## Action

An action begins the flow of data in Flux. An action is a simple object that at
a minimum contains a `type`. An action’s `type` indicates the type of change to
be performed on the application’s state. An action may contain additional data
(the "payload") that’s necessary for changing the application’s former state to
its next one.

## Dispatcher

The dispatcher is a mechanism for distributing (or "dispatching") actions to a
Flux application’s store. The dispatcher is little more than a registry of
callback functions into the store. Redux (the implementation of Flux we’ll use
at App Academy) consolidates the dispatcher into a single `dispatch()` function.

## Store

The store represents the entire state of the application. It’s also responsible
for updating the state of the application appropriately whenever it receives an
action. It does so by registering with the dispatcher a callback function that
receives an action. This callback function uses the action’s type to invoke the
proper function to change the application’s state. After the store has changed
state, it “emits a change,” i.e. the store passes the new state to any views
(explanation incoming) that have registered listeners (callbacks) to it.

## View

A view is a unit of code that’s responsible for rendering the user interface. To
complete the Flux pattern, a view listens to change events emitted by the store.
When a change to the application’s data layer occurs, a view can respond
appropriately, such as by updating its internal state and triggering a re-render.

A view can create actions itself, e.g. in user-triggered events. If a user marks
a todo as complete, a view might call a function that would dispatch an action
to toggle the todo’s state. Creating an action from the view turns our Flux
pattern into a unidirectional loop.

![flux-loop]

Here the original action might (for example) result from an asynchronous request
to fetch todos from the database with a success callback to dispatch our action
to receive those todos and update the application’s state accordingly. It's a
common pattern in Flux to dispatch an action that populates the initial state of
the application, with further modifications coming from the client.

## Redux

Redux is a node package that facilitates a particular implementation of Flux. A
Redux loop behaves slightly differently than a vanilla Flux loop, but the
general concepts remain the same. Redux abides by three principles:

1. **Single Source of Truth**: The entire state of the application is stored in a
   single JavaScript object in a single store. This object is commonly referred to
   as a “state tree” because its values often contain or are objects themselves.
2. **State is Read-Only**: The only way to change the state is to dispatch an action.
   This principle ensures that our Redux loop is never short-circuited and change
   of state remains single-threaded.
3. **Only Pure Functions Change State**: Pure functions known as “reducers” receive the
   previous state and an action and return the next state. They return new state
   objects instead of mutating previous state. Read [more][pure-functions] about
   what makes a function pure.

![redux-loop]

As you've probably already surmised, `React` will be our view layer.

**NB**: Middleware is an ecosystem of utilities that augments the functionality
of `dispatch()`. Among other things, it allows for asynchronous requests in a
Redux application.

We'll learn more about each part in the Redux loop.

[redux-loop]: https://assets.aaonline.io/fullstack/react/assets/redux.gif
[pure-functions]: https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976#.lfv7bgqco
[flux-loop]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/react/assets/flux-loop.png
