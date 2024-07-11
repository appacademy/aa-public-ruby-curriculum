# withRouter

Sometimes we want access to the current routing information inside a component
that isn't rendered by a `Route` component. React Router gives us the
`withRouter` function to use in those situations. Like `connect` from
`react-redux`, `withRouter` is a higher order component that wraps a react
component and passes it the router props `location`, `match`, and `history`
(revisit the Intro to React Router reading for details on these props). For
example:

```jsx
// header.jsx

const Header = ({ match }) => (
  // ...
  User id: { match.params.userId }
)

// we get access to match inside of Header because of withRouter
export default withRouter(Header)
```

## Resources

- [withRouter](https://reacttraining.com/react-router/web/api/withRouter)

