# Using Modules in the Browser

When writing for Node, we used `module.exports` and `require` to break our code
into modules, but web browsers do not have this functionality. Later, we'll use
a tool to help us out with that, but first it's necessary to understand how
modules work in the browser natively.

## Requiring Files

If we write frontend JavaScript in multiple files, we could explicitly list
each of them in our HTML document. Since browsers execute HTML from the top
down, each JavaScript file will be loaded in the order it is listed. When
dependencies are involved, this ordering is important: If `lion.js` requires
`animal.js` to be loaded first, then the HTML document **must** list `animal.js`
before `lion.js`.

```html
<body>
  ...

  <script src="zoo/animal.js"></script>
  <script src="zoo/lion.js"></script>
  <script src="app.js"></script>
</body>
```

Unlike Node, where each file has its own global namespace, in the browser a
single global namespace (called `window`) is shared across all JavaScript files.
If `animal.js` loads before `lion.js`, and `animal.js` sets `window.Animal`,
then when `lion.js` executes, it can use `window.Animal`. Since there is no
`require` in browser JS, this is one way frontend JS libraries can make their
code available to other libraries--by setting global variables.

This is much more like Ruby than Node in that there is a shared global namespace
across all the source files. However, unlike Ruby, the browser doesn't have a
`require` function, so you cannot specify dependencies inside the file that
requires them. You must keep track of these yourself and ensure that your
scripts are all loaded in the correct order.

If the libraries are loaded in the wrong order then everything breaks in
confusing, unpredictable ways. You can imagine that this quickly becomes
unmaintainable and difficult to debug. What is an enterprising new frontend
developer to do?

## Module Bundlers

There are wonderful tools that exist for the purpose of 'bundling' your
frontend code into digestible, bite-sized bits built for the browser. These
tools will run through all your source files and bundle them into a single file
you can include in your html with one script tag. Each file **requires** its
dependencies explicitly at the top, and then **exports** the object it is
responsible for making.

It does this via an [Abstract Syntax Tree][abstract-syntax-tree] to make sure
that all of the libraries that require each other are loaded in the right order.

## Importing and exporting

Here's a typical approach to writing source files intended for execution by the
browser.

### `./zoo/animal.js`:

```js
// ./zoo/animal.js
// Define an Animal class; export it as `Animal`. Save it
class Animal {
  eat() {
    // ...
  }
}

module.exports = Animal;
```

### `.zoo/lion.js`

```js

const Animal = require('./animal.js');

//Inherit Lion from Animal
class Lion extends Animal {
  roar() {
    // ...
  }
};

module.exports = Lion;
```

### `./app.js`:

```js
const Lion = require('./zoo/lion');
for (let i = 0; i < 10; i++) {
  console.log(new Lion().roar());
}
```

We don't have to worry about loading these scripts in the right order because
our module bundler will make sure to load any file declared in `require` before
the rest of the code after that will depend on it.

Furthermore, by exporting **only** the objects we want, we protect the global
namespace from pollution and name collisions. This allows us to mix in libraries
with less fear and makes our code safer for other programmers to include.

## Webpack

If all of your source files `require` their dependencies and use
`module.exports` to set their exports, then you are ready to use a module
bundler to prepare your program for the browser.

First, we need to get a module bundler. There are a few options, but we will use
**Webpack** during the course.

### Getting Webpack

We will use `npm` to install Webpack as a command line tool. There will be more
information later about how to use `npm`, but for now we just want to get you
set up with Webpack.

Running the command `npm install -g webpack webpack-cli` will install and set up
Webpack and its command line tools. Webpack is a very powerful (and extensible)
tool. We will leverage many of its features as the course goes on, but for now
we will just use it to bundle our JavaScript source files into one file.

To do this, navigate to your app directory and run `webpack app.js -o bundle.js
--mode=development`. Webpack will find the file named `app.js` in the current
directory and bundle it with any files it requires, and any files those files
require, until it has all the dependencies it needs. It will output this to a
file called `bundle.js`. The `mode` flag tells Webpack to optimize this build
for development rather than production.

Your HTML file would then have a script tag for the bundled file like: `<script
src="bundle.js"></script>`

Work through tonight's homework to practice this!

[abstract-syntax-tree]: https://en.wikipedia.org/wiki/Abstract_syntax_tree
