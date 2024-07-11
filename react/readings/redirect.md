# <Redirect>

The `<Redirect>` component from React Router takes only one prop: `to`.
When it renders, it replaces the current URL with the value of its `to` prop.
Typically we conditionally render `<Redirect>` to redirect the user away from
some page we don't want them to visit. For example, we might want to redirect
the user to a login page if they aren't currently logged in.

```jsx
<Route
  exact
  path="/"
  render={() => (this.props.currentUser ? <Home /> : <Redirect to="/login" />)}
/>
```

Note: we will teach you to use a more flexible auth pattern - don't
directly imitate this example.

## Resources

- [Redirect](https://reacttraining.com/react-router/web/api/Redirect)
