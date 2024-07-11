# Calculator

We're going to build a simple calculator app. Our app takes in two numbers and
shows the result of a simple operation on the numbers when you click the
operation button. Take a look at the [Live Demo][live-demo] to see the app in
action. Assume that only numbers will be entered.

[live-demo]: https://appacademy.github.io/curriculum/calculator/

## Setup

Set up your `package.json`, `webpack.config.js`, and `index.html`. Use the
configuration you built earlier in the Getting Started with NPM homework. Rename
your entry file to `app.jsx`. Make sure you also update this in your webpack
config! Run `npm run webpack` to keep your bundle up to date.

Open `index.html` and make sure you can see 'Hello World' in the browser.

If you were having trouble getting your configuration set up, use the [skeleton
here][skeleton]. Remember to run `npm install` after downloading the skeleton.

[skeleton]:
  https://assets.aaonline.io/fullstack/react/homeworks/calculator/skeleton.zip

## The `Calculator` Component

Make a new file called `calculator.jsx`. Start with the code skeleton below:

```javascript
import React from "react";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    // your code here
  }

  // your code here

  render() {
    return (
      <div>
        <h1>Hello World</h1> // replace this with your code
      </div>
    );
  }
}

export default Calculator;
```

Delete `Congrats` in your entry file. Import the `Calculator` component and set
it to render in the DOM. Make sure 'Hello World' still shows up in the browser,
this time from your `Calculator` component.

### State

The state of your app is just a Javascript object. For the calculator, it will
contain three keys: the result and the two user-inputted numbers.

Define `this.state` with default values in the `constructor()`. The result
should have a default value of `0`. We actually want the two numbers to start
out blank, so give `num1` and `num2` a default value of an empty string.

## Render

The first thing we want to render is our result. We want to interpolate the
result, which is stored in the component's `state`, into the jsx. It'll look
something like this:

```javascript
  render() {
    return (
      <div>
        <h1>{this.state.result}</h1>
      </div>
    );
  }
```

## Input

Let's make the input fields. We want the state to receive the new value of the
input field every time something is typed in. We can do this by passing an
`onChange` event handler prop to the input field. Whenever the input field's
value changes (via the user), the input will run its `onChange` prop, which
should be a callback function. Let's write that callback inside our component.
The callback should retrieve the value from the input field and set the state of
the number.

**NB:** The values come in as strings. Consider what would happen if the value
was an empty string (i.e., the user hit backspace after entering something).

```javascript
setNum1(e) {
  // your code here
}
```

We have to bind any function in which we want to preserve the scope of `this`.
Remember to bind your functions in the constructor! It'll look like this:

```javascript
this.setNum1 = this.setNum1.bind(this);
```

We want our input fields to always reflect the current version of the state and
properly update when we trigger a re-render by changing the state, so make sure
to include `value={this.state.num1}` in the input tag.

That's one of the inputs! Write the other. It should look very similar.

Remember that the return value of render must be a single DOM element.

## Buttons

Time to write the operations. Each one of these is a button, with an `onClick`
callback set that carries out the operation and sets the state of the result to
the answer.

The current values for `num1` and `num2` should be properly updated and stored
within the state of your component. Create functions to handle adding,
subtracting, multiplying, and dividing, and use `setState()` to set
`this.state.result` to the correct result.

Don't forget `e.preventDefault()`.

### Clear

It'd also be nice to be able to clear out the input fields. Make a button that
resets the state to its initial values.

This is part of why it's important to set a value on the input fields. By having
the value depend on the state, we ensure that the value will be re-rendered,
and therefore be properly cleared when we set the state of `num1` and `num2`
back to empty strings.

## Destructuring

You're probably using the values stored in your state a few times in your
`render` function. Let's DRY it up a little. Destructure the properties stored
in your state in your `render` function to be able to refer to them by separate
variables. Refer to the Object Destructuring reading if you need a refresher on how this
works. Remember that any Javascript we do should happen before the `return`
statement!

```javascript
render(){
  // your destructuring code here
  return (
    // refactor variables defined
  );
}
```

Congratulations! You've created your first component!
