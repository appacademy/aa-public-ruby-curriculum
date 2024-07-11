# Webpack Configuration

## `.gitignore`

Before discussing how to configure webpack, be aware that running webpack and
using npm creates many redundant, large files in your local project directory.
To avoid this use a `.gitignore` file in your project's root directory to
prevent these files from being pushed to and pulled from your remote Git
repositories. Create a `.gitignore` file in your project's root directory and
list the files or directories you want to ignore, one per line. Use a trailing
`/` to indicate a directory to ignore. To re-fetch the NPM modules, we can run
`npm install`, which fetches all the modules specified in `package.json`. Then
run `webpack` to regenerate the `bundle.js` and `bundle.js.map` files.

For example:

```
# .gitignore

node_modules/
bundle.js
bundle.js.map
```

You can view a full collection of useful `.gitignore` templates
[here][gitignore].

## Configuring Webpack

Just like with NPM, you can use a configuration file to set up your webpack
options. You'll have to create this file by hand. It should live in your
project's root directory, be named `webpack.config.js`, and export a single
object.

### Specifying Entry and Output Files

`webpack.config.js` allows you to specify your entry file, and the name and
location of your output file. See the example below:

```js
// webpack.config.js
var path = require('path');

module.exports = {
  entry: "./frontend/my_app.jsx",
  output: {
      path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
      filename: "bundle.js"
  }
  ...
};
```

**NB**: For Rails projects, make sure to locate your `bundle.js` file in
`app/assets/javascripts` so that it's included in the Rails asset pipeline.

### Dev Tools / Source Map

`webpack.config.js` accepts a `devtool` key that can be used to enable useful
tools, particularly `source-map`. A source map makes it possible for you to see
the line numbers of your original source code when errors are raised. This is
generally not possible because your `bundle.js` does not maintain the line 
numbers from the files it is bundling.

```js
// webpack.config.js

module.exports = {
  ...
  devtool: 'source-map',
  ...
}
```

### Resolving Extensions

`webpack.config.js` also accepts a `resolve` key, which lets you specify what
file extensions to process without explicitly naming them.

```js
// webpack.config.js

module.exports = {
  ...
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  ...
};
```

You must include the star matcher `'*'` to be able to include files with an
explicit extension. Otherwise `require('file_name.js')` will cause webpack to
look for `file_name.js.js`.

# Sample `webpack.config.js`

```js
// webpack.config.js
var path = require('path');

module.exports = {
  entry: './frontend/entry.jsx',
  output: {
    filename: './bundle.js',
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};
```

[gitignore]: https://github.com/github/gitignore
