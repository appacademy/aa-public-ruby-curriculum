# Front-End Authentication

Remember how much time we spent on authentication in weeks 4 and 5? Good
news! We will continue to use that same pattern as we move toward
front-end auth.

The main difference is that we will use React components instead of
Rails views, and all of our HTTP requests (for logging in, signing up,
logging out) will be AJAX requests.

**Your backend will look essentially the same!**

As always:
  * A *session* is maintained by assigning a token to the user's cookie
  * Cookies are sent by the browser to the server with every request
(that includes AJAX requests!)

The new parts:
  * Session Reducer
  * Errors Reducer (combineReducer)
    * Session Errors Reducer
  * Session Actions / Constants
  * Session API Util
  * LoginForm / SignupForm Components
  * Protected and Auth Routes

## Session Reducer

```js
const _nullUser = {
  id: null
};

const sessionReducer = (state = _nullUser, action) => {
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const { id } = action.currentUser;
      return Object.assign({}, { id });
    case LOGOUT:
      return _nullUser;
    default:
      return state;
  }
};
```

The `id` property will be used to identify our `currentUser` from the `users` 
slice of state. We can use this information to show things like a custom welcome 
message and the profile picture. 

**A note on state shape:** We *could* store all of the currentUser data in our `session` property, 
but this could get messy whenever we want to change data related to `currentUser`, 
since we'll have to update state data in two places (`entities.users` and `session`). 
Instead, we'll maintain a single source of truth for our user data in 
`entities.users`, and access relevant data for the `currentUser` using the `id` 
we store in `session`.

## Session Errors Reducer
```js
const _nullErrors = [];

export default (state = _nullErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return _nullErrors;
    case CLEAR_ERRORS:
      return _nullErrors;
    default:
      return state;
  }
};
```

The `errors` property will be used to tell our users that they have filled out a 
form incorrectly. (e.g. 'Password is too short'). We can clear the errors when 
we successfully receive the `currentUser` object or we can clear errors manually 
using the `CLEAR_ERRORS` action when we navigate away from the form.

## Errors Reducer
```js
import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';

export default combineReducers({
  session: sessionErrorsReducer,
  // We can add as many reducers as we need here.
});
```

We'll nest the `sessionErrorsReducer` under the `errorsReducer`, so that we can 
add additional error reducers for other components in our app.

## Action-Creators & API

We'll need the following action-creators:

* Asynchronous:
  * signup
  * login
  * logout
* Synchronous:
  * receiveCurrentUser
  * receiveSessionErrors

We'll also need some API utility functions that will actually make the
AJAX requests:
  * signup
  * login
  * logout

## Middleware

We will continue to use thunk middleware to handle asynchronous actions.
```
Asyn Actions   Middleware   Api Util      Sync Actions

signup ----->  Thunk -----> signup -----> receiveCurrentUser(currentUser)
login ------>  Thunk -----> login ------> receiveCurrentUser(currentUser)
logout ----->  Thunk -----> logout -----> receiveCurrentUser(null)
```

## Protected and Auth Routes

When we were creating apps with Rails views we had certain routes the
user could only visit if they were logged in or if they were logged out.
We still want to do the same thing, but we can no longer control this
from the back end. Instead we will create special route components that
trigger a redirect if the user shouldn't be allowed to see their
component. We do this by placing a conditional in the `render` prop.
Here is the code. Take a minute to look it over and make sure you
understand it.  

```jsx
// /frontend/util/route_util.jsx

// renders component if logged out, otherwise redirects to the root url
const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )}/>
);

// renders component if logged in, otherwise redirects to the login page
const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
     loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    )
  )}/>
);

// access the Redux state to check if the user is logged in
const mapStateToProps = state => {
  return { loggedIn: Boolean(state.session.id) };
}

// connect Auth to the redux state
export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

// connect Protected to the redux state
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
```

Let's dig into what this is doing.
We create two functional React components, `Auth` and `Protected`, which will 
each render a route. To each of these components, we pass a few props: the 
`component` we want it to (conditionally) render, the `path` we want the route 
to have, the `loggedIn` status, and whether we want the route to be matched `exact`ly.
 Note that we're destructuring these props, and then reassigning the `component` 
 prop to a new variable `Component` - we do this because React demands that we 
 use capitalized component names with JSX.

Rather than giving the Route component a `component` prop, we use the `render` 
prop to pass it a function. This function will use the `loggedIn` prop we passed 
earlier to determine whether it should render the `Component` or `Redirect`.

In all your projects that use frontend auth, you will want this code in a
file `/frontend/util/route_util.jsx`. Then you can simply import these
components and use them anywhere you need a protected route. For
example, suppose we only want users to be able to write reviews if they
are logged in.

```jsx
// Do this!
import { ProtectedRoute } from '/file/path/to/rout_util';

<ProtectedRoute exact path="/reviews/new" component={ReviewForm} />

// Instead of this
<Route exact path="/reviews/new" component={ReviewForm} />
```

See how easy that is? We have to do a little work to set up our auth
and protected routes, but once we have them in place turning an ordinary
route into a protected route is as simple as replacing `Route` with
`ProtectedRoute`.

## Bootstrapping

One of the biggest challenges of front end auth is telling our
application to render in an initial state that reflects the status of
our session. If we skip this step, it may be possible for a user to log
in or sign up, refresh the page, and then the app will render in a
non-logged in manner even though they have the right session token! This
happens because our app will always render with the default application
state unless we configure the `store` to use a `preloadedState`.

There are **several** ways we can meet this challenge:

* *Issuing a separate request* -- Triggering a `fetchCurrentUser` AJAX
request from the root route (such as in a function passed to the `render` prop)
* *Persisting client-side data* -- using [local storage][local-storage]
* *Bootstrapping* -- using the [gon gem][gon-video]

We are going to suggest the following implementation:

* In `application.html.erb`, add a script tag -- this is JavaScript code
that we can tell the browser to run, and we can generate it dynamically
using Ruby!
* Inside the script tag, assign a JSON-ified `current_user` to the
property of `window.currentUser`
* Use a Jbuilder template!

```html
<% if logged_in? %>
  <script type="text/javascript">
      window.currentUser =
        <%= render("api/users/user.json.jbuilder", user: current_user).html_safe %>
  </script>
<% end %>
```

* Inside our entry point, within the doc-ready callback,
check for the presence of `window.currentUser`
* If `window.currentUser` exists, generate a `preloadedState` and pass
it to `configureStore`

```jsx
document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const { currentUser } = window;
    const { id } = currentUser;
    const preloadedState = { 
      entitities: {
        users: {
          [id]: currentUser
        }
      }
      session: { id }
      };
    store = configureStore(preloadedState);

    // Clean up after ourselves so we don't accidentally use the
    // global currentUser instead of the one in the store
    delete window.currentUser;

  } else {
    store = configureStore();
  }

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
```

Now we should be able to log in, refresh, and not lose our session
status!

[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[gon-video]: https://vimeo.com/168132088
