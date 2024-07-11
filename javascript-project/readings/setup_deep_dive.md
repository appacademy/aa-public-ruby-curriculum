# Setup Deep Dive: Webpack, Babel, and NPM

In this reading, we'll answer some of the why's for our setup instructions.
We'll take a closer look at what's going on in our `package.json`,
`webpack.config.js`, and `babel.config.json` files, and provide some options for
further configuration if you're interested.

## webpack.config.js

### Babel loader

```js
  {
    test: /\.js$/, 
    use: ['babel-loader'], 
    exclude: /node_modules/,
  },
```

This is a rule; rules let you process or transform files before webpack bundles
them.

The `use` property determines how your files are transformed; you provide it an
array of `loaders`, which are libraries that transform files. They aren't
built-in to webpack; you have to install them yourself. 

Here, we provide `babel-loader`. Babel is a library that transpiles modern,
cutting-edge JavaScript, which might not be supported by all browsers, into
older, browser-compatible JavaScript. You can customize how Babel transpiles
your code in your `babel.config.json` file.

The `test` property tells webpack which files this rule should be applied to. In
this case, it's files that end in `.js`, i.e. JavaScript files.

The `exclude` property creates an exception to the above; here, we're saying
*don't* apply this rule to files inside `node_modules`. In general, libraries
installed via `npm` should already be browser-compatible, so there's no need to
transpile them. By not transpiling them, webpack will run much faster. 

Every once in a while, an `npm` library might break this rule. To make an
exception to the exception (ie to specify node modules that you *do* want to
transpile), replace `exclude: /node_modules/` with:

```js
  exclude: {
    and: [/node_modules/],
    not: [
      /module_to_transpile/
    ]
  }
```

### Bundling CSS

```js
  entry: [
    path.resolve(__dirname, 'src', 'index.js'),
    path.resolve(__dirname, 'src', 'index.scss'),
  ],
```

At the top of our `config` object, we specify two entry files: `index.js` and
`index.scss`. By making `index.scss` a separate entry file, webpack will bundle
our css and scss files even if we don't import any of them into our `index.js`. 

```js
  {
    test: /\.s?[ac]ss$/, 
    use: [
      MiniCssExtractPlugin.loader, 
      {
        loader: 'css-loader', 
        options: { url: false }
      },
      'sass-loader', 
    ]
  }
```

Here's where we tell webpack how to bundle our css and scss files. The loaders
we supply to `use` are applied in reverse order:

1. First is `sass-loader`, which compiles Sass syntax into standard CSS. 

2. Next is `css-loader`, which tells webpack to treat `@import` statements like
   it treats `import` in JavaScript files, i.e., to bundle your css files
   together. The `url: false` option tells webpack *not* to treat `url()`
   statements like `import`, but just to leave them be.

3. Finally, `MiniCssExtractPlugin.loader` puts your bundled CSS into a file,
   `main.css`.


### Exporting a function

```js
module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  return config;
}
```

In most `webpack.config.js` files, you'll export a plain JavaScript object
containing your configuration options. But webpack also allows you to export a
function which *returns* a config object. This function gets invoked after you
run `webpack` in your terminal. Its second argument, `argv`, contains info about
the options you passed to the `webpack` command. For example, if you run
`webpack --watch --mode=development`, then `argv.mode === 'development'` and
`argv.watch === true`.

We can use this to set different configuration options depending on whether we
are running webpack in production mode or development mode; in our case, we use
different source maps for production and development.

[Read more about exporting a function here.][export-function]

### Source maps

```js
module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  return config;
}
```

A source map keeps track of where bundled code came from and what it looked like
in your original source files. The browser will use a provided source map to
show you original file and line numbers in error messages, to show you original
files when you're debugging, etc.

Webpack has many options for how it builds source maps. Each has pros and cons
when it comes to bundle file size, build speed, and source map quality – some
source maps only keep track of what file bundled code came from, others keep
track of line numbers, and the best ones keep track of what your code looked
like before getting transpiled by Babel. Here are the options we used:

* `source-map` (production): Creates a separate `main.js.map` file. Since all
  the mapping data is contained in that file, the `main.js` file is smaller and
  thus loads faster – ideal for production. However, re-building is much slower,
  so it's not great while using `webpack --watch` during development.

* `eval-source-map` (development): All the mapping data is contained within
  `main.js`. The bundle file is larger, but re-building is much faster – which
  is ideal during development.

[Read more about source maps here.][source-maps]

## babel.config.json

```json
{
  "presets": [
    [
      "@babel/env",
      {
        "corejs": "3",
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

You can specify what kind(s) of transpilation you want Babel to perform using
the `presets` key. `@babel/env` is the preset that transforms modern JavaScript
into browser-compatible JavaScript; it's what Babel is most known for. You'll
learn about other presets later, such as one that can transpile special,
HTML-like `JSX` syntax that React uses. 

An object with preset options comes right after `"@babel/env"`:
```json
{
  "corejs": "3",
  "useBuiltIns": "usage"
}
```

To understand what's going on here, we should talk about `core-js`. 

`core-js` is a library that provides *polyfills* for modern JavaScript.
Polyfills are chunks of code that implement features that a browser might not
support. For example, a Promise polyfill would define a Promise class that acts
just like the 'real' Promise class. 

This is different from transpilation, which just transforms *syntax* but doesn't
itself define any new classes, methods, etc. An example of transpilation is
changing `const` to `let` and `() => {}` to `function() {}`. Nothing new gets
defined; it's just translation.

With the `"useBuiltIns": "usage"`, we're telling Babel we want to define
polyfills for whatever modern JavaScript features we actually use in our code,
and nothing more. If a Promise shows up in our code, define a Promise polyfill,
but otherwise don't.  

`"corejs": "3"` just means we're using version 3 of `core-js`.

## package.json

### Engines (backend only)

```json
"engines": {
  "node": "14.x"
}
```

This specifies which version of node should be used to run your project; Heroku
will use this version when running your server. 

The version provided here should match whatever version you have installed and
have been working with. You can check by running `node -v`. 

### Browserslist

```json
"browserslist": [
  "defaults"
]
```

`browserslist` lets you specify which environments this project is targeting.
For an app that runs in the browser, this translates to: which browsers are you
trying to support? 

This list is often referenced by other libraries. For example, Babel uses it to
determine what version of JavaScript to transpile your code into, and if you're
using `core-js` for polyfills, what features need polyfills.

`defaults` is shorthand for `> 0.5%, last 2 versions, Firefox ESR, not dead` –
the last 2 versions of all browsers, as well as Firefox ESR and any browser with
more than 0.5% usage share, but excluding dead browsers.

[You can read more about `browserslist` here.][browsers-list]

### Dependencies

Below, I've reorganized the dependencies we recommend installing by category.
```json
"dependencies": {
  // webpack 
  "webpack": "^5.38.1",
  "webpack-cli": "^4.7.2",

  // babel
  "@babel/core": "^7.14.5", // core of Babel library
  "@babel/preset-env": "^7.14.5", // transpiles JS
  "babel-loader": "^8.2.2", // integrate babel with webpack
  "core-js": "^3.14.0", // polyfills for modern JS features
  "regenerator-runtime": "^0.13.7", // run async functions

  // bundling css
  "css-loader": "^5.2.6", // resolves @import statements in css
  "mini-css-extract-plugin": "^1.6.0", // creates css bundle file
  "sass": "^1.34.1", // used by sass-loader to compile sass into css
  "sass-loader": "^12.0.0", // compiles sass into css

  // backend-only
  "dotenv": "^10.0.0", // puts env. variables in `.env` on process.env
  "express": "^4.17.1", // minimalist backend framework for node
  "node-fetch": "^2.6.1", // make AJAX requests from node backend
}
```

[export-function]: https://webpack.js.org/configuration/configuration-types/#exporting-a-function
[source-maps]: https://webpack.js.org/configuration/devtool/
[browsers-list]: https://github.com/browserslist/browserslist