# React Synthetic Events (a.k.a. Event Handlers)

Synthetic Events are the React equivalent of the vanilla DOM's
`addEventListener()`. Using Synthetic Events, you can pass event listeners
directly to your components via props.

```jsx
const handleClick = event => {
  event.preventDefault();
  alert("clicked!");
};

const SimpleButton = () => (
  <input type="submit" onClick={handleClick}>
    Click Me!
  </input>
);
```

Whenever the above input is clicked, `handleClick()` will be called before any
of the normal things a submit button would do (like issue a POST request). The
click `event`, which represents the vanilla DOM event, is passed in. By calling
`event.preventDefault()`, we are disabling the button from trying to submit as
it normally would. Most of your event handlers will call `preventDefault()`,
since you almost always want to halt the normal HTTP request and dispatch an
asynchronous javascript request instead.

A complete list of Synthetic Events is [available here][react-events].

[react-events]: https://reactjs.org/docs/handling-events.html
