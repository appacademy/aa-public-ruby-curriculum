# Debugging arrow functions

Arrow functions are ubiquitous in React and Redux. Here's an example from the
`actions` reading on action creators:

```js
const addFruit = fruit => ({
  type: "ADD_FRUIT",
  fruit
});
```

As it stands, `addFruit` is difficult to debug. Suppose you want to inspect the
value of `fruit`. You **can't** do this:

```js
const addFruit = fruit => ({
  debugger
  type: "ADD_FRUIT",
  fruit
});
```

`{ type: "ADD_FRUIT", fruit }` is an object, and you can't put debuggers inside
an object. But you also **can't** do this:

```js
const addFruit = fruit => (
  debugger
  {
    type: "ADD_FRUIT",
    fruit
  }
);
```

Parentheses can be used to implicitly return objects in ES6. As a result, the
above won't work, because you can't put a debugger inside of a return statement.

Instead, in order to put a debugger inside of `addFruit`, you first need to
convert it into a function with an explicit return statement:

```js
const addFruit = fruit => {
  return {
    type: "ADD_FRUIT",
    fruit
  };
};
```

Now, finally, you can put the debugger before you return:

```js
const addFruit = fruit => {
  debugger;
  return {
    type: "ADD_FRUIT",
    fruit
  };
};
```

Here's the whole thing once more as a gif:

![debugging arrow functions](https://assets.aaonline.io/fullstack/react/assets/debugging_arrow_functions.gif)

If you want to avoid having to do this over and over again as you're debugging
your arrow functions, you can make it a habit to write all of your arrow
functions with explicit return statements. Do be aware, however, that implicit
returns are a common convention in Redux that you will often see in the wild.
