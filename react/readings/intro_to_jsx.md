# JSX

## What is JSX?

[JSX][jsx] is a JavaScript syntax extension that resembles HTML and XML. React
code written in JSX mirrors the HTML it produces, improving readability and
ease-of-development.

Consider the following example in JSX and then in JS.

```jsx
// JSX
const quotes = (
  <div className="quotes">
    <h1>I love JavaScript!</h1>
  </div>
);
```

```js
// plain JavaScript
const quotes = React.createElement(
  "div",
  { className: "quotes" },
  React.createElement("h1", {}, "I love Javascript")
);
```

Both blocks of code ultimately produce the same HTML:

```html
<div class="quotes"><h1>I love JavaScript!</h1></div>
```

and are rendered onto the `document.body` using:

```js
ReactDOM.render(quotes, document.body);
```

In both examples, the variable `quotes` is assigned to a React component that
renders the HTML onto the page when passed to 
`ReactDOM.render(quotes, document.body)`. 
However, the example using JSX is much simpler and easier to read.

## Interpolation

Even though it looks like HTML, JSX is still Javascript at the core. As such,
you can interpolate plain Javascript into JSX using `{}` between element tags or
for attribute values.

```jsx
let myClass = "example";

const myElement = <h1 className={myClass}>{1 + 2 + 3}</h1>;
```

`myElement` renders as:

```html
<h1 class="example">6</h1>
```

Note that, because the return value is inserted into your element, only
single expressions are allowed.

For example, this block of code throws a `SyntaxError`.

```jsx
const myElement = (
	<h1>
	{
		1 + 2 + 3;
		4 + 5 + 6;
	}
	</h1>
);
```

## Transpilation

JSX cannot be directly interpreted by browsers like Chrome or Firefox. Instead,
JSX code must be passed through a preprocessor, such as `Babel`, that
**transpiles** it into vanilla Javascript.

## Official Documentation

Although we'll only use JSX for developing React components, it can actually be
used in other applications as well. You can read more about JSX
[here][resources].

[resources]: http://facebook.github.io/jsx/
[jsx]: https://reactjs.org/docs/jsx-in-depth.html
