## Frontend Routing with React Quiz

How does the React Router determine which components to render?
- [ ] It matches the `path` prop from `Route` components to the url
- [ ] It matches the name of the component to the url
- [ ] It matches the `route` prop that components receive to the url
- [ ] It flips a coin

<details><summary>Answer:</summary>

It matches the `path` prop from `Route` components to the url</details>
</details>
<details><summary>Explanation:</summary>

The `path` prop is compared to the browser's url and renders the component given as a prop in the `Route` component.</details>

```jsx
<HashRouter>
  <div>
    <Route path="/" component={App} />
    <Route path="/profile" component={Profile} />
    <Route path="/album" component={Album} />
  </div>
</HashRouter>
```

Consider this code. Given the above router, which component(s) would render when a user navigates to `/profile`?
- [ ] App
- [ ] Profile
- [ ] Album

<details><summary>Answer:</summary>

- App
- Profile</details>
</details><details><summary>Explanation:</summary>

Since we don't have a `<Switch>` component that wraps all of our routes, any route that matches with the current url will get rendered.  In this case, both `/` and `/profile` will be matched because `/` is not an exact path and `/profile` starts with a `/`.</details>

```jsx
<HashRouter>
  <div>
    <Route exact path="/" component={App} />
    <Route path="/profile" component={Profile} />
    <Route path="/album" component={Album} />
  </div>
</HashRouter>
```

Consider the above code. Given the above router, which component(s) would render when a user navigates to `/profile`?
- [ ] App
- [ ] Profile
- [ ] Album

<details><summary>Answer:</summary>

Profile</details>
</details><details><summary>Explanation:</summary>

Only the `Profile` component would render for this case because `/` is an exact path.</details>

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

Consider the above code. Given the above router, which component(s) would render when a user navigates to `/profile`?
- [ ] App
- [ ] Profile
- [ ] Album

<details><summary>Answer:</summary>

App</details>
</details><details><summary>Explanation:</summary>

Now that we have a `<Switch>` component wrapping our routes, the first Route that is matched will be the only route rendered. Because `/` is not an exact path, it will get matched for `/profile` and therfore `App` will be rendered.</details>

If we navigate to `/photos/5`, matching route pattern `/photos/:id`, how would we retrieve the `:id` from the URL within the corresponding `Photo` component?
- [ ] `this.state.params.id`
- [ ] `this.state.id`
- [ ] `this.state.match.params.id`
- [ ] `this.props.params.id`
- [ ] `this.props.id`
- [ ] `this.props.match.params.id`

<details><summary>Answer:</summary>

`this.props.match.params.id`</details>
</details><details><summary>Explanation:</summary>

The wildcard variables (like `:id` in this case) are accessible through `this.props.match.params`</details>
