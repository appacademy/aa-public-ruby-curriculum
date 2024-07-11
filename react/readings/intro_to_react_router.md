# React Router Introduction

## Overview

[React Router](https://github.com/ReactTraining/react-router/) is a
frontend routing library for React. It allows you to control which
components you display using the browser location. This effectively
makes the browser location and history part of the global state of our
app. We can store information about which component should be displayed,
which user profile we are currently viewing, or any other piece of
state, in the browser location. We can also access that information from
anywhere in our app.

A feature of the location that makes it different from the Redux state
is the fact that a user can copy and paste a URL and email it to a
friend or save it or link to it from their own website. Suppose we are
writing a blog app. If the app tracks which blog post is being displayed
using Redux state, there is no easy way to go directly to a particular
post. Instead the user will always have to start at the root page of our
app and manually navigate to a given page. On the other hand, if we
track which page is being displayed in the browser location then going
straight to a given post is as simple as entering its particular URL.

Since we are writing single page apps, we don't want to refresh the page
each time we change the browser location. Instead we want to update the
location and update the app in response using javascript. We are
using React, so we will use React Router to do this. To install React
Router in your projects run `npm install react-router-dom`. Then
import `HashRouter` from `react-router-dom` in your entry file.  

`HashRouter` is the primary component of the router that wraps our route
hierarchy. It works similarly to `Provider` - creating a React context
that passes information (in this case, routing information) down to all
its descendent components.

The purpose of React Router is to allow you to selectively render
certain components based on the URL your browser is pointed at. The
component you'll use most often is...


## <Route>

The `<Route>` component is used to wrap another component, causing that
component to only be rendered if a certain URL is matched. It is
controlled by the following props:

* `component` This prop takes a reference to the component to be
  rendered.

* `path` The wrapped component will only be rendered when the path is
  matched. We say the path matches the URL when it matches some initial
  portion of the URL. For example, a path of `/users` would match both
  of the following URLs: `/users` and `/users/123`. If this prop is left
  out, the component will always render.

* `exact` This is a flag. If it is set, the path will only match when it
  exactly matches the URL. For example, if we set `exact`, then `/users`
  will not match   `/users/123` any more.

* `render` This optional prop takes a function to be called when the
  path matches. The return value of the function is rendered. Of course,
  one could also simply define a functional component inside the
  `component` prop, but this results in extra, unnecessary work for
  React, so the `render` prop is preferred for simple functional
  components: the difference is that `component` causes a new React
  component to be rendered, while render simply returns jsx directly
  into the surrounding component. You should only use either the
  `component` prop, or the `render` prop. If both are supplied,
  only the `component` prop will be used.

  ```jsx
    // will work, but unnecessarily slow
    <Route path="/one" component={() => <span>One</span>} />

    // preferred
    <Route path="/one" render={() => <span>One</span>} />
  ```


Let's look at an example.

```jsx
// root.jsx

import { Route, HashRouter } from 'react-router-dom';

const Root = () => (
  <HashRouter>
    // HashRouter can only have a single child component, so we wrap our routes 
    // in this div
    <div>
      <Header />
      <Route exact path="/" component={Feed} />
      <Route path="/users" component={Users} />
    </div>
  </HashRouter>
);
```

With this root component we will always render the header, regardless of
the path. We will render the feed component only if the path exactly
matches `/` and the user index component if the path matches
`/users`.


## URL Params

A component's props can also hold information about a URL's parameters.
The router will match route segments starting at `:` up to the next `/`,
`?`, or `#`. Those matched values are then passed to components via
their props. Such segments are called _wildcards_.

Suppose we want to use the `Users` component to either render the users
index or the profile page for a particular user depending on the path.
We could do something like this

```jsx
const Users = () => (
  // render the index of no id is included
  <Route exact path="/users" component={UsersIndex} />
  // otherwise render the profile page for that user
  <Route path="/users/:userId" component={Profile} />
);
```

Note that there's no need to use `HashRouter` again - as long as it
wraps our root file all of our `Route` components will be able to
connect to it.


## Location Props

In order to fetch the correct user from our database we will need to get
the id from the URL. React router passes that information to the profile
component as props. Here are the props it makes available.

* `location` This is an object that makes the current URL available to
us. It's most important key is `pathname`, which returns the current
URL.

* `match` This is an object that contains important information about
how the current URL matches the route path. Here are some of the more
useful keys on the `match` object

  * `isExact` a boolean that tells you whether or not the URL exactly
matches the path

  * `url` the current URL

  * `path` the route path it matched against (without wildcards filled
in)

  * `params` the matches for the individual wildcard segments, nested
under their names

* `history` This prop lets you update the URL programatically. For
example,   suppose we want to push a new URL when the user clicks a
button.   It has two useful methods:

  * `push` This adds a new URL to the end of the history stack. That
    means that clicking the back button will take the browser to the
    previous URL. Note that pushing the same URL multiple times in a
    row will have no effect; the URL will still only show up on the
    stack once. In development mode, pushing the same URL twice in a
    row will generate a console warning. This warning is disabled in
    production mode.

  * `replace` This replaces the current URL on the history stack,
    so the back button won't take you to it. For example

```jsx
  const handleClick = () => this.props.history.push('/some/url');

  const redirect = () => this.props.history.replace('/some/other/url');
```

Let's use the `match` prop to fetch the correct user from the database
in the Profile component. Recall that our profile component was rendered
at the path `/users/:userId`. Thus we should have a `userId` param
available.

```jsx
class Profile extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.userId;
    fetchUser(id);
  }

  render () {
    // ...
   }
}

```

## Resources

* [React Router docs](https://reacttraining.com/react-router/web/guides/quick-start)
* [Route](https://reacttraining.com/react-router/web/api/Route)
* [HashRouter](https://reacttraining.com/react-router/web/api/HashRouter)
* [location](https://reacttraining.com/react-router/web/api/location)
* [match](https://reacttraining.com/react-router/web/api/match)
* [history](https://reacttraining.com/react-router/web/api/history)
