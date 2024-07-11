# <Switch>

React Router's `<Switch>` component allows us to only render one
`<Route>` even if several match the current URL. We nest as many
`Route`s as we wish between the opening and closing `Switch` tags, and
only the first one that matches the current URL will be rendered.

This is particularly useful if we want a default component that will
only render if none of our other routes match. We can see this in the
following example.

```jsx
<Switch>
  <Route path="some/url" component={SomeComponent} />
  
  <Route path="some/other/url" component={OtherComponent} />
  // without the Switch, DefaultComponent would always render
  // now it will only render when neither of the other routes match
  <Route component={DefaultComponent} />
  // Note: we haven't set a path in the above Route, so it will simply
  // use the default path of '/'
</Switch>
```

## Resources

* [Switch](https://reacttraining.com/react-router/web/api/Switch)
