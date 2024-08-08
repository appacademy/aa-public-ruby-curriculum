# React Fundamentals Quiz

```jsx
  <div class={ myClass; } onClick={ clickHandler; }>
    { contents }
  </div>
```

<quiz>
  <question multiple>
    <p>What is wrong with the above code?</p>
    <answer correct>`class` should be `className`</answer>
    <answer>Extraneous spaces inside the curly braces</answer>
    <answer correct>Semi-colons inside curly braces</answer>
    <explanation>`jsx` is converted to `js` code before giving it to the browser.  `class` is a reserved word in javascript and therefore causes trouble once the code is in javascript.  React requires using `className` to specify the html class that you want. Additionally, the semi colons cause trouble when converting the `jsx` into javascript because it signifies the completion of a line in javascript.</explanation>
  </question>
</quiz>

<quiz>
  <question>
    <p>Which of the following methods are required for any React component?</p>
    <answer>`constructor`</answer>
    <answer>`componentDidMount`</answer>
    <answer correct>`render`</answer>
    <explanation>`constructor` and `componentDidMount` are inherited and therfore don't need to be explicitly written in any React component we create.  `render` is required because the React component needs to return _something_ that will converted to javascript and sent to the browser to render.</explanation>
  </question>
</quiz>

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

<quiz>
  <question>
    <p>What is wrong with the above code?</p>
    <answer>There should be separate components for `Duck` and `Goose`</answer>
    <answer>The buttons need to have different `className`s</answer>
    <answer correct>State is being set incorrectly in the click handlers and `this` is not bound
  properly</answer>
    <answer>There cannot be two buttons with different click handlers nested in the same
  div</answer>
    <answer>the `onClick` attributes need to be `this.duckClick()` and `this.gooseClick()`</answer>
    <explanation>The context of `this` in the `duckClick` and `gooseClick` methods will be the `window` when the methods are invoked.  We want the context of `this` to be component itself so that we can access the local state and update it correctly.  To do this, we need to bind the context of `this` so that it will be correct in our methods.</explanation>
  </question>
</quiz>

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

<quiz>
  <question>
    <p>Consider the above functional components. Will both these components render correctly?</p>
    <answer>Yes</answer>
    <answer correct>`LikeCounter` will not render correctly because it will not implicitly return</answer>
    <answer>`CommentBlurb` will not render correctly because it is returning a single node</answer>
    <answer>Neither will render correctly because they have no `render` method</answer>
    <explanation>To implicitly return with a fat arrow function we need parenthesis around the code that comes after the fat arrow (`=>`).  If we wrap the code in curly braces, like in `LikeCounter`, we do not get an implicit return  We would need to explicity return (`return ()`) for our component to return anything.</explanation>
  </question>
</quiz>
