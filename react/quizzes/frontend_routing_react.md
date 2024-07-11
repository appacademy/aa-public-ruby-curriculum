## Frontend Routing with React Quiz

<quiz>
  <question>
    <p>How does the React Router determine which components to render?</p>
    <answer correct>It matches the `path` prop from `Route` components to the url</answer>
    <answer>It matches the name of the component to the url</answer>
    <answer>It matches the `route` prop that components receive to the url</answer>
    <answer>It flips a coin</answer>
    <explanation>The `path` prop is compared to the browser's url and renders the component given as a prop in the `Route` component. </explanation>
  </question>
</quiz>

```jsx
<HashRouter>
  <div>
    <Route path="/" component={App} />
    <Route path="/profile" component={Profile} />
    <Route path="/album" component={Album} />
  </div>
</HashRouter>
```

<quiz>
  <question multiple>
    <p>Consider this code. Given the above router, which component(s) would render when a user navigates to `/profile`?</p>
    <answer correct>App</answer>
    <answer correct>Profile</answer>
    <answer>Album</answer>
    <explanation>Since we don't have a `<Switch>` component that wraps all of our routes, any route that matches with the current url will get rendered.  In this case, both `/` and `/profile` will be matched because `/` is not an exact path and `/profile` starts with a `/`. </explanation>
  </question>
</quiz>

```jsx
<HashRouter>
  <div>
    <Route exact path="/" component={App} />
    <Route path="/profile" component={Profile} />
    <Route path="/album" component={Album} />
  </div>
</HashRouter>
```

<quiz>
  <question>
    <p>Consider the above code. Given the above router, which component(s) would render when a user navigates to `/profile`?</p>
    <answer>App</answer>
    <answer correct>Profile</answer>
    <answer>Album</answer>
    <explanation>Only the `Profile` component would render for this case because `/` is an exact path.</explanation>
  </question>
</quiz>

```jsx
<HashRouter>
  <div>
    <Switch>
      <Route path="/" component={App} />
      <Route path="/profile" component={Profile} />
      <Route path="/album" component={Album} />
    </Switch>
  </div>
</HashRouter>
```

<quiz>
  <question>
    <p>Consider the above code. Given the above router, which component(s) would render when a user navigates to `/profile`?</p>
    <answer correct>App</answer>
    <answer>Profile</answer>
    <answer>Album</answer>
    <explanation>Now that we have a `<Switch>` component wrapping our routes, the first Route that is matched will be the only route rendered. Because `/` is not an exact path, it will get matched for `/profile` and therfore `App` will be rendered. </explanation>
  </question>
</quiz>

<quiz>
  <question>
    <p>If we navigate to `/photos/5`, matching route pattern `/photos/:id`, how would we retrieve the `:id` from the URL within the corresponding `Photo` component?</p>
    <answer>`this.state.params.id`</answer>
    <answer>`this.state.id`</answer>
    <answer>`this.state.match.params.id`</answer>
    <answer>`this.props.params.id`</answer>
    <answer>`this.props.id`</answer>
    <answer correct>`this.props.match.params.id`</answer>
    <explanation>The wildcard variables (like `:id` in this case) are accessible through `this.props.match.params`</explanation>
  </question>
</quiz>
