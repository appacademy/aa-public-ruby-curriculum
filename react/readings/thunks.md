# Thunks

One of the most common problems we need middleware to solve is asynchronicity.
When building web applications that interact with a server, we need to request
resources and then dispatch the response to our store when it eventually gets
back. It would be possible to make these API calls from our components and
dispatch synchronously on success, but for consistency and reusability we would
prefer to have the source of every change to our app state be an action creator.
Thunks are a new kind of action creator that will allow us to do that.

Rather than returning a plain object, a thunk action creator returns a function.
This function, when called with an argument of `dispatch`, can then dispatch one
or more actions, immediately, or later. Here's an example.

```js
const thunkActionCreator = () => dispatch => {
  dispatch({
    type: "RECEIVE_MESSAGE",
    message: "This will be dispatched immediately."
  });

  setTimeout(() => dispatch({
    type: "RECEIVE_MESSAGE",
    message: "This will be dispatched 1 second later."
  }, 1000));
}
```

This is great, but without custom middleware it will break as soon as the
function action hits our reducer. We need middleware to intercept all actions of
type `function` and then trigger the dispatch.

```js
// middleware/thunk_middleware.js

const thunk = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  return next(action);
};

export default thunk;
```

That's it! Notice we also passed in the `getState` function in case our async
action creators need access to our application state. Now that we have all the
pieces, let's see a more concrete example.

Say that we are building a web application that stores a user's contacts. On
logging in we will need to fetch all of that user's contacts from our database.
We would use middleware to trigger the AJAX request responsible for this action.
Our AJAX request might look something like the following:

```js
// utils/contacts_api_util.js

export const fetchContacts = () => $.ajax({ url: 'api/contacts' });
```

An action creator that fetches contacts might look like this.

```js
import * as ContactAPIUtil from '../utils/contacts_api_util';

//action creator which returns an object
export const receiveContacts = contacts => ({
  type: RECEIVE_CONTACTS,
  contacts
});

// async action creator which returns a function
export const fetchContacts = () => dispatch => (
  ContactAPIUtil.fetchContacts().then(contacts => dispatch(receiveContacts(contacts)));
);
```

Much like the logger from the previous reading, thunk middleware is available as
the `redux-thunk` library. The middleware we just wrote is almost the entire
original library! ([Check out the source code][thunk-source]). For more on
thunks and handling asynchronicity in Redux, you can take a look at [this
interesting SO post from the creator][thunks-so].

[thunk-source]: https://github.com/reduxjs/redux-thunk/blob/master/src/index.ts
[thunks-so]: http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559
