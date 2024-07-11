# Setting Up Your Project

## Pre-Setup

You will need a working version of `node` to create this project. To confirm you
have one installed, run the command `which node` in your terminal. You should
see something like this:

```sh
/Users/your-username/.nvm/versions/node/v16.13.2/bin/node
```

* **If nothing prints to your terminal, or if the path that prints doesn't
  contain `.nvm`**: redo the `nvm and Node.js` section from the "Setting Up
  Your Computer Environment" reading in the "Software Engineering Foundations"
  module (under "Introduction->Computer Setup").
* **If you do see `.nvm` in the path, but the version number is different**: you
  should be ok, as long as the version is between v12 and v16. If it's outside
  that range, run `nvm install 16`, followed by `nvm use 16`.

If you are still experiencing issues, please ask an instructor for assistance.

## Setup

1. Create a new project directory and `cd` into it.
2. `git init` to create a new git repository in your project directory
3. Create a simple __.gitignore__ file:

    ```text
    node_modules/
    .DS_Store
    ```

    > **NOTE**: Do not include your bundle files in the __.gitignore__; you will
    > need to push them to GitHub to deploy your app on GitHub Pages

4.  `npm init -y` to create a basic __package.json__.
5.  Install dependencies:

    ```sh
    npm install @babel/core @babel/preset-env babel-loader core-js css-loader mini-css-extract-plugin regenerator-runtime sass sass-loader webpack webpack-cli
    ```

6.  Create a basic __/src__ subdirectory and file structure:

    ```text
    - src/
        - index.js
        - index.scss
        - scripts/
        - styles/
    ```

7.  In your root directory, create __webpack.config.js__:

    ```js
    // webpack.config.js

    const path = require('path');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');

    const config = {
      entry: [
        path.resolve(__dirname, 'src', 'index.js'),
        path.resolve(__dirname, 'src', 'index.scss')
      ],
      output: {
        path: path.join(__dirname, 'dist'), // bundled file in dist/
        filename: '[name].js'
      },
      module: {
        rules: [
          {
            test: /\.js$/, // applies to js files
            use: ['babel-loader'], // transpiles your js
            exclude: /node_modules/, // don't transpile node modules
          },
          {
            test: /\.s?[ac]ss$/, // applies to css/scss/sass files
            use: [
              MiniCssExtractPlugin.loader, // create bundled css file
              {
                loader: 'css-loader', // resolves @import statements
                options: { url: false } // don't resolve url() statements
              },
              'sass-loader', // compiles sass to css
            ]
          }
        ]
      },
      plugins: [new MiniCssExtractPlugin()]
    };

    module.exports = (env, argv) => {
      if (argv.mode === 'production') {
        config.devtool = 'source-map';
      } else {
        config.devtool = 'eval-source-map';
      }

      return config;
    }
    ```

8. In your root directory, create __babel.config.json__:

    ```json
    // babel.config.json
    {
      "presets": [
        [
          "@babel/env",
          {
            "useBuiltIns": "usage",
            "corejs": "3"
          }
        ]
      ]
    }
    ```

9.  Add a `browserslist` key and update `scripts` in __package.json__:

    ```json
    // package.json

    {
      "browserslist": [
        "defaults"
      ],
      "scripts": {
        "watch": "webpack --watch --mode=development",
        "build": "webpack --mode=production"
      }
    }
    ```

10. In your root directory, create __index.html__ and import __dist/main.css__
    and __dist/main.js__ appropriately:

    ```html
    <!DOCTYPE html>
    <html lang="en">

      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="./dist/main.css" />
        <script src="./dist/main.js"></script>
        <title>Project Name</title>
      </head>

      <body>
      </body>
    
    </html>
    ```

## Tips

* To learn more about the steps taken in this setup, check out the "Setup Deep
  Dive" reading under "Additional Resources" in the left-hand menu.

* To run your project, just open your __index.html__ file in the browser with
  webpack running!

* Your entry file is __src/index.js__. Add a `DOMContentLoaded` event listener
  and do some basic DOM manipulation in that callback. Test that it works in the
  browser; this way, you know your webpack is working and everything is
  configured correctly.

* Don't forget to keep your code organized. If you can identify distinct
  sections of code in a file, consider extracting a section out to another file.
  Practice good coding habits.

* If you ever provide a relative path to an asset, such as an image, in any of
  your files, be sure to make the path relative to your root directory.

* If you realize you need a backend, just follow the setup instructions in the
  "Server Setup" reading under "Additional Resources" in the left-hand menu.
