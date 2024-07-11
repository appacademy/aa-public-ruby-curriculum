# Introduction to React Components

## What are Components?

React Components are the building blocks of a React view-layer. They are
Javascript functions that return HTML to be rendered onto a document. Because
they are typically written in JSX, components often look like HTML dropped into
a Javascript file.

## A Simple Example

Download [this example][simple-component] in another tab and read along below.

#### index.html

Start by opening `index.html`. It's a normal HTML document that contains a
`<div id='root'/>`. This `#root` element will serve as the _hook_ into which we
insert our React component.

#### index.jsx

Now, take a look at `index.jsx`. Note the use of `React.Component` and
`ReactDOM.render()`. `SimpleComponent` is defined as a JS class that inherits
from `React.Component`. The resulting React component is then passed to
`ReactDOM.render()`, which inserts it into the DOM inside `root`, the `#root`
element we created in `index.html`.

Both `React.Component` and `ReactDOM.render()` contain JSX syntax (the parts
that look like HTML). Remember, these expressions represent Javascript functions
that ultimately render HTML onto a document.

#### package.json

The demo also contains a `package.json` file, which is used to configure NPM and
lists all of an app's JS dependencies, similar to a Ruby `Gemfile`. You'll read
more about this later.

#### webpack.config.js

The demo also contains a `webpack.config.js` file, which configures Webpack.
Note that the output file, `bundle.js`, is sourced in our `index.html` and
represents all of our app's code, along with its dependencies (`react` and
`react-dom`). Webpack is also responsible for transpiling our JSX into raw
Javascript for the browser. More on this later, too.

## Dependencies

In order to create React components, you will need to require the `react` and
`react-dom` packages from `npm`.

[simple-component]:
  https://assets.aaonline.io/fullstack/react/demos/simple_component.zip
