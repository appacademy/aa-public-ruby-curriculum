# Redux

Redux is a JavaScript framework for managing the frontend state of a web
application. It allows us to store information in an organized manner in a web
app and to quickly retrieve that information from anywhere in the app. Redux is
modeled on a few previous web technologies including Elm and Flux.

Advantages of Redux include:

* It simplifies some of the more cumbersome aspects of Flux
* It is very lightweight; the library only takes up 2 kbs
* It is very fast (the time to insert or retrieve data is low)
* It is predictable (interacting with the data store in the same way repeatedly
  will produce the same effect)

## Where did Redux come from?

Redux was created by Dan Abramov in 2015. It was initially intended as an
experiment to create a simplified version of Flux. Abramov wanted to remove some
of what he saw as the unnecessary boilerplate code that was required to create a
Flux app.

Abramov also wanted to eliminate some of the aspects of development he found
frustrating. When trying to debug a web app, one must often go through the
series of steps that cause the bug to occur each time the code is changed. This
quickly becomes repetitive and frustrating. Abramov envisioned dev tools that
would allow one to undo or replay a series of actions at the click of a button.
This idea became the Redux dev tools.

The reason this works is that Redux updates the state using pure functions
called reducers (see below for definitions), so one can simply replay a series
of actions and be guaranteed to arrive at the same final state. As Redux was
developed it also became more convenient to use a single object to store the
state, as opposed to traditional Flux which uses multiple stores.

These design choices allowed for the creation of an ecosystem of powerful Redux
tools and extensions. Over time three principles were recognized as central to
the philosophy of Redux. They are:

* **A Single Source of Truth** The state for an entire Redux app is stored in a
  single, plain JavaScript object.

* **State is Read Only** The state object can not be directly modified. Instead
  it is modified by dispatching actions.

* **Changes Are Made with Pure Functions** The reducers that receive the actions
  and return updated state are pure functions of the old state and the action.

Beyond this, a guiding meta-philosophy of Redux is the idea that in a software
library restrictions can be just as important as features. Redux deliberately
places significant restrictions on the way state can be stored and updated, but
in return it allows easy implementation of a number of powerful features that
would be extremely difficult to write using a less restrictive framework.

Since its creation Redux has rapidly grown in popularity, quickly moving beyond
its initial plan as an experiment. As of early 2016 it had over 3,000,000
downloads. The Redux repository on github has over 25,000 stars, and Redux is
now used by a number of companies including Exana, Patreon, and ClassPass.

## Alternative Frameworks

There are a variety of options for managing the front-end state of a web app.
For this course we have chosen Redux. Here is a brief survey of some other
options that are available.

* **Flux:**

  Flux is a coding pattern rather than a library. It is an approach to
  structuring the storage of frontend data. Flux was developed by Facebook in
  2014 to complement React, and it is now used by many companies that also use
  React including Expedia, Yahoo, Trapit, and Khan Academy. One key to the
  design of Flux is the unidirectional flow of information. Actions are
  dispatched, they modify the state, and that state is passed on to 'views',
  which make it available to the React components. This is the inspiration for
  the unidirectional flow in Redux: action -> reducer -> store -> view. Flux
  applications also maintain a central data store which is modified by
  dispatching actions.

  Unlike Redux apps, Flux apps can have multiple stores. Often actions must be
  dispatched to these stores in a particular order. To manage this, Flux apps
  have an additional component not found in Redux apps called a _dispatcher_.
  The dispatcher's job is to route each action to the correct store and keep the
  stores in sync. Stores register functions with the dispatcher that are used to
  modify the store based on actions. These functions play a role similar to
  Redux reducers; however, they need not be pure functions. This can make the
  result of dispatching an action on the state hard to predict and even harder
  to reverse. Redux solves this problem by requiring reducers to be pure
  functions.

* **Elm**

  Elm is a frontend language that is compiled to JavaScript. It includes
  libraries and programing patterns for frontend development. Elm was designed
  by Evan Czaplicki for his thesis in 2012 and is now managed by the Elm
  Software Foundation.

  Elm is a statically typed functional programing language. This means a few
  things. All its data types are immutable; they can't be modified after they
  are created. Each function expects to receive arguments of a certain type, and
  the code won't compile if that expectation isn't satisfied. All Elm functions
  are pure. This last fact influenced the use of pure reducers in Redux. In
  fact, much of the overall design pattern for Redux was inspired by Elm.

  Elm is still in its early stages, but it has been adopted by a few companies
  including Permutive and RideCell, and more companies are in the process of
  transitioning from JavaScript to Elm.

* **GraphQL**

  All the frameworks we have discussed thus far assume that we want to store and
  manage some data in the frontend of our web app. In general, of course, this
  doesn't have to be true. If we are dealing with a full-stack web application
  then presumably all the information stored in the frontend will have been
  fetched from our backend web server. One direction we could take would be to
  choose not to manage any information in the frontend, and simply fetch data
  from the backend as we needed to display it, hopefully already correctly
  formatted.

  This is precisely the functionality that GraphQL aims to provide. GraphQL is a
  powerful and convenient query language that makes it easy to request exactly
  what you need from the backend server. In a web app built around GraphQL the
  frontend becomes a presentational wrapper for data stored in the database, and
  holds very little state of its own.

  Of course, one could use GraphQL in combination with a state manager such as
  Redux. In that scenario, GraphQL would replace the use of, say, jQuery to make
  AJAX requests. Once fetched, however, the data would still be managed by a
  frontend library and manipulated before being displayed or saved to the
  database.

  GraphQL is used by a number of major companies including Facebook, ZeeMee, and
  EventGeek.

* **MobX**

  Web development is always a rapidly changing landscape, so it's only fitting
  to conclude this brief review with a technology that's even newer than Redux.
  MobX was developed a few months after Redux. The inspiration for MobX comes
  from spreadsheet programs such as Microsoft Excel. In such a program, one can
  simply define the value of one cell in terms of another cell, and when the
  second cell is changed, the first will be updated as well. There is no need
  either to worry about the way the cell was changed, or about letting dependent
  cells know that they should be updated.

  MobX is built on that philosophy: there should be a central store of data;
  React components should be able to change that data (usually due to user
  interaction); if the change in data would affect another component, that
  component should automatically re-render without the programer having to
  explicitly tell it to.

  MobX is used by companies including Mendix, StackShare, and RepSpark.

## Vocabulary

* **State**

  Ex: "_Redux is a state manager._"

  The _state_ of a program means all the information stored by that program at a
  particular point in time. It is generally used to refer to the data stored by
  the program at a particular instance in time, as opposed to the logic of the
  program, which doesn't change over time. The job of Redux is to store the
  state of your app and make it available to the entire app.

* **Store**

  Ex: "_Redux stores state in a single store._"

  The Redux store is a single JavaScript object with a few methods, including
  `getState`, `dispatch(action)`, and `subscribe(listener)`. Any state you want
  Redux to handle is held in the store.

* **Action**

  Ex: "_The Redux store is updated by dispatching actions._"

  An action is a POJO (plain old JavaScript object) with a `type` property.
  Actions contain information that can be used to update the store. They can be
  _dispatched_, i.e. sent to the store, in response to user actions or AJAX
  requests.  Typically Redux apps use functions called _action creators_ that
  return actions.  Action creators can take arguments which allow them to
  customize the data contained in the actions they generate.

* **Pure function**

  Ex: "_Redux reducers are pure functions._"

  A function is pure if its behavior depends only on its arguments and it has no
  side effects. This means the function can't depend on the value of any
  variables that aren't passed to it as arguments, and it can't alter the state
  of the program or any variable existing outside itself. It simply takes in
  arguments and returns a value.

* **Reducer**

  Ex: "_Redux handles actions using reducers._"

  A reducer is a function that is called each time an action is dispatched. The
  reducer receives an action and the current state as arguments and returns an
  updated state.

  Redux reducers are required to be pure functions of the dispatched action and
  the current state. This makes their behavior very predictable and allows their
  effects to potentially be reversed.

* **Middleware**

  Ex: "_You can customize your response to dispatched actions using
  middleware._"

  Middleware is an optional component of Redux that allows custom responses to
  dispatched actions.  When an action is dispatched it passes through each
  middleware that has been added to the state.  The middleware can take some
  action in response and choose whether or not to pass the action on down the
  chain.  Behind the scenes, the middleware actually replaces the dispatch
  method of the store with a customized version.  There is a large ecosystem of
  existing middleware ready to be plugged into any Redux projects.  One example
  is a logger that records each action before passing it on to the reducer.
  Perhaps the most common use for middleware is to dispatch asynchronous
  requests to a server.

* **Time traveling dev tools**

  Ex: "_Redux has time traveling dev tools._"

  Redux reducers are pure functions of the dispatched action and the current
  state. This means that if one were to store a list of the previous states over
  time and the actions that had been dispatched, one could retroactively cancel
  an action and recalculate the state as if that action had never been
  dispatched. This is precisely the functionality that the Redux dev tools
  provide.  The dev tools can be added as middleware to any Redux project.  They
  allow you to look back through the history of the state and toggle past
  actions on and off to see a live recalculation of the state.  This ability to
  revert to a previous state is what is meant by time travel.

* **Thunks**

  Ex: "_Thunks are a convenient format for taking asynchronous actions in
  Redux_"

  The traditional approach to middleware closely parallels the format of
  reducers.  The actions being dispatched are POJOs with types and various
  middleware files are waiting to receive them.  These files check the type of
  the action using a case statement just like reducers.

  Thunks are an alternative approach.  A thunk is a general concept in computer
  science referring to a function whose primary purpose is simply to call
  another function.  In Redux a thunk action creator returns a function rather
  than an object.  When they are dispatched, thunk actions are intercepted by a
  piece of middleware that simply checks if each action is a function.  If it
  is, that function is called with the state and dispatch as arguments,
  otherwise it is passed on down the chain.  Thunks are most commonly used to
  make asynchronous API requests.

## Resources

### Documentation

* [Redux](http://redux.js.org/)

* [Elm](http://elm-lang.org/docs)

* [Flux](https://facebook.github.io/flux/docs/in-depth-overview)

* [GraphQL](http://graphql.org/learn/)

* [MobX](https://mobx.js.org/README.html)

### Who uses it?

* [Redux](https://stackshare.io/reduxjs)

* [Elm](https://stackshare.io/elm)

* [Flux](https://stackshare.io/flux)

* [GraphQL](https://stackshare.io/graphql)

* [MobX](https://stackshare.io/mobx)

### Talks

* [Introduction of Redux](https://www.youtube.com/watch?v=xsSnOQynTHs)

* [Redux update one year in](https://www.youtube.com/watch?v=uvAXVMwHJXU)

* [Talks on Redux by its
  creator](https://egghead.io/courses/getting-started-with-redux)
