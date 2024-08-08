# React Fundamentals Quiz

```jsx
  <div class={ myClass; } onClick={ clickHandler; }>
    { contents }
  </div>
```

What is wrong with the above code?
- [ ] `class` should be `className`
- [ ] Extraneous spaces inside the curly braces
- [ ] Semi-colons inside curly braces

<details><summary>Answer:</summary>

- `class` should be `className`
- Semi-colons inside curly braces</details>
<details><summary>Explanation:</summary>

`jsx` is converted to `js` code before giving it to the browser.  `class` is a reserved word in javascript and therefore causes trouble once the code is in javascript.  React requires using `className` to specify the html class that you want. Additionally, the semi colons cause trouble when converting the `jsx` into javascript because it signifies the completion of a line in javascript.</details>
Which of the following methods are required for any React component?
- [ ] `constructor`
- [ ] `componentDidMount`
- [ ] `render`

<details><summary>Answer:</summary>

`render`</details>
<details><summary>Explanation:</summary>

`constructor` and `componentDidMount` are inherited and therfore don't need to be explicitly written in any React component we create.  `render` is required because the React component needs to return _something_ that will converted to javascript and sent to the browser to render.</details>
```jsx
class DuckDuckGoose extends React.Component {
  constructor(props) {
    super(props);
    this.state = { numDucks: 0, numGeese: 0 };
  }

  duckClick(event) {
    event.preventDefault();
    this.state.numDucks += 1;
  }

  gooseClick(event) {
    event.preventDefault();
    this.state.numGeese += 1;
  }

  render() {
    return (
      <div>
        <button className="btn" onClick={this.duckClick}>
          Duck!
        </button>
        <button className="btn" onClick={this.gooseClick}>
          Goose!
        </button>
      </div>
    );
  }
}
```

What is wrong with the above code?
- [ ] There should be separate components for `Duck` and `Goose`
- [ ] The buttons need to have different `className`s
- [ ] State is being set incorrectly in the click handlers and `this` is not bound properly
- [ ] There cannot be two buttons with different click handlers nested in the same
  div
- [ ] the `onClick` attributes need to be `this.duckClick()` and `this.gooseClick()`

<details><summary>Answer:</summary>

State is being set incorrectly in the click handlers and `this` is not bound properly</details>
<details><summary>Explanation:</summary>

The context of `this` in the `duckClick` and `gooseClick` methods will be the `window` when the methods are invoked.  We want the context of `this` to be component itself so that we can access the local state and update it correctly.  To do this, we need to bind the context of `this` so that it will be correct in our methods.</details>
```jsx
const CommentBlurb = ({ body, date, handleClick }) => (
  <div onClick={handleClick}>
    <div>{body}</div>
    <div>{date}</div>
  </div>
);

const LikeCounter = ({ numLikes, handleClick }) => {
  <div onClick={handleClick}>
    <div>{numLikes}</div>
  </div>;
};
```

Consider the above functional components. Will both these components render correctly?
- [ ] Yes
- [ ] `LikeCounter` will not render correctly because it will not implicitly return
- [ ] `CommentBlurb` will not render correctly because it is returning a single node
- [ ] Neither will render correctly because they have no `render` method

<details><summary>Answer:</summary>

`LikeCounter` will not render correctly because it will not implicitly return</details>
<details><summary>Explanation:</details>

To implicitly return with a fat arrow function we need parenthesis around the code that comes after the fat arrow (`=>`).  If we wrap the code in curly braces, like in `LikeCounter`, we do not get an implicit return  We would need to explicity return (`return ()`) for our component to return anything.</details>