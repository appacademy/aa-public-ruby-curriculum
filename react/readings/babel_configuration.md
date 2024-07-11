# Babel

JavaScript development touches a lot of diverse environments: Node, Chrome,
Safari, etc. These various environments have different levels of compatibility
with advanced JavaScript features like JSX and ES6. To ensure that our JSX and
ES6 code works in any environment, we will use a *transpiler* called **Babel**
to convert our code into ES5, the universal, vanilla Javascript compatible with
all browsers and Node.

## Configuring Babel for Web Apps

Webpack can be configured to transpile your JSX and ES6 source code into browser-compatible Javascript when creating the bundle.

**Install the appropriate NPM packages**:

```
npm install @babel/core @babel/preset-env @babel/preset-react babel-loader
```

`@babel/core` is the transpiling engine itself. `@babel/preset-env` and `@babel/preset-react` are configurations that tell the core transpiler how to interpret
ES6 and JSX, respectively.

**Configure the `module` key of your `webpack.config.js`:**

```js
module: {
  rules: [
    {
      test: [/\.jsx?$/], // Specifies file types to transpile
      exclude: /(node_modules)/, // Leaves dependencies alone
      loader: 'babel-loader', // Sets Babel as the transpiler
      options: {
        presets: ['@babel/env', '@babel/react'] // Tells Babel what syntaxes to translate
      }
    }
  ]
},
```

## Checking Compatibility

[This chart][compat-table] is a great resource to see what levels of native
support exist for advanced JS features in different environments. However, you
shouldn't have to worry about compatibility if you use Babel.

[compat-table]: http://kangax.github.io/compat-table/es6/
[node-green]: http://node.green/
