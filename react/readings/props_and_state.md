# Props and State

React components keep track of data via two important properties:
`this.props` and `this.state`. Both are objects representing data that the
component needs in order to render.

## Props

Props are properties of a component that are passed in at the time of
initialization.

```jsx
// app.jsx
import Dog from "./dog";

const App = () => <Dog name="Fido" breed="Greyhound"></Dog>;
```

`this.props` are then accessible in a component's instance methods.

```jsx
// dog.jsx
class Dog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Name: {this.props.name}, Breed: {this.props.breed}
      </div>
    );
  }
}

export default Dog;
```

In the example above, a new instance of the `Dog` component is passed `name` and
`breed` properties, which can be read inside the component as `this.props.breed`
and `this.props.name`.

It renders to HTML:

```HTML
<div>Name: Fido, Breed: Greyhound</div>
```

### Don't Change Props!

A component should never change its own props. Props are intended to be used by
a parent component to trigger a change or re-render in the child component. When
new props are received by a component, lifecycle methods will be triggered to
handle the change and (by default) a re-rendering of the component. If we need
to trigger a re-render within the component, we will use component state.

# State

Unlike props, `this.state` represents the properties of a component that can be
altered by the component itself.

### When to Use State

State should be used whenever a component must keep track of mutable, internal
data. Most of the time, state will be used for form components to manage
controlled inputs. If a piece of information is never going to change, or if it
is needed across the entire app (such as the `currentUser`), use props instead.

### How State is Set

Although a component's state can be defined at initialization, it may also reset
its own state at certain points in its lifecycle using `this.setState()`.

Every time `this.setState()` is called, the component calls `render()` again
with the new state. In other words, a component re-renders whenever its state
changes.

```jsx
class WordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: ""
    };
    this.updateWord = this.updateWord.bind(this);
  }

  updateWord(event) {
    this.setState({ word: event.currentTarget.value });
  }

  render() {
    return (
      <div>
        <input onChange={this.updateWord} value={this.state.word} />
        <span>The word is: {this.state.word}</span>
      </div>
    );
  }
}
```

In this example `WordInput` has an initial state of `{word: ''}`. When it is
rendered, we register an **event listener** on the `input` via its `onChange`
prop. Whenever the `input` changes its value (via user input), it will call
`onChange`, which in this case is set to `this.updateWord` which has been bound
to ensure `this` is still our component when it is eventually invoked. That
function, called a **change handler**, calls `this.setState()` and sets
`this.state.word` to the input's current value. The component then re-renders
with the new state, updating the text inside the `span`.

You should always use `this.setState()` rather than `this.state =` anywhere
outside of your constructor, because `this.setState()` also re-renders your
component, causing it to reflect the new state. Reassigning `this.state` alone
won't trigger re-rendering, leaving your component out of sync.

Note that because `setState()` triggers a re-render, it should not be called during
a `render()`, as that would trigger an infinite loop. Here, `setState()` works
because `this.updateWord` is called by user-input _after_ the element is rendered.

### Asynchronicity of setState

As the React [documentation] states, "`this.state` may be updated
asynchronously, you should not rely on \[its] value for calculating the next
state". Let's revisit our example from above and add a console log of our state.

```jsx
class WordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: ""
    };
    this.updateWord.bind(this);
  }

  updateWord(event) {
    this.setState({ word: event.currentTarget.value });
    console.log(this.state.word);
  }

  render() {
    return (
      <div>
        <input onChange={this.updateWord} value={this.state.word} />
        <span>The word is: {this.state.word}</span>
      </div>
    );
  }
}
```

When our component mounts, `this.state.word` will be `''`. If we type the letter
`'a'` into the input, the event handler will run and set `this.state.word` to
`a` but it won't happen synchronously. So when we `console.log` on the next line
we will see `''` instead of `'a'`.

Luckily for us, `setState` takes an optional callback as a second argument. This
callback doesn't run until the state has been updated so you can be assured that
using `this.state` inside of the callback will actually reflect the changes that
your call to `setState` hoped to create. With this knowledge, we can rewrite
`updateWord` like this:

```js
updateWord(event) {
  this.setState({word: event.currentTarget.value}, () => {
    console.log(this.state.word);
  });
}
```

Now we'll actually log the value of our word including the letter we just added!

[documentation]: https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
