# Getting Your App Production Ready

## Remove `console.log` and `debugger` Statements

Take out any instances of `console.log`, `debugger` or `byebug` from your
project.

## Only Use Development Tools in Dev Environment

Your app may include tools used in development, such as `redux-logger` for Redux
or `byebug` and `pry-rails` for Rails. Let's make sure that these are set to
only be installed and used locally.

At this point you already know about separating these concerns in Rails. Do a
quick re-check to ensure tools like `byebug`, `pry-rails` and `web-console` are
in the development group in your Gemfile.

```ruby
# Gemfile
group :development, :test do
  gem 'pry-rails'
  gem 'byebug'
  gem 'web-console', '~> 2.0'
  gem 'spring'
end
```

Let's do the same with our node packages. Similarly to our Gemfile's development
group, we can specify development only packages within our `package.json` by
moving them out of `dependencies` and into `devDependencies`. Packages listed in
`devDependencies` will be ignored when the `--production` flag is passed to
`npm install`. Fortunately, the Heroku Node buildpack does this for us by
default.

Example `package.json`:

```js
{
  "name": "solution",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "directories": {
    "test": "test"
  },
  "dependencies": {
    "@babel/core": "^7.1.2",
    "@babel/preset-env": "^7.1.0",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.4",
    "react": "^15.3.0",
    "react-dom": "^15.3.0",
    "react-redux": "^4.4.5",
    "react-router": "^2.6.1",
    "redux": "^3.5.2",
    "redux-thunk": "^2.1.0",
    "webpack": "^4.20.2",
    "webpack-cli": "^3.1.2"

  },
  "devDependencies": {
    "redux-logger": "^3.0.6"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "postinstall": "webpack",
    "webpack": "webpack --watch --mode=development"
  },
  "author": "",
  "license": "ISC"
}
```

Now that we are not installing these packages, we need to remove them from our
code, but only when running in production. The following production-only plugin
sets `process.env.NODE_ENV` to `production`, so we can check this value to
conditionally `import` them.

To exclude `redux-logger` from production we can add the following code to
`store.js`:

```js
// store.js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/root_reducer";

const middlewares = [thunk];

if (process.env.NODE_ENV !== "production") {
  // must use 'require' (import only allowed at top of file)
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const configureStore = (preloadedState = {}) =>
  createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));

export default configureStore;
```

## Fix Commit Authorship

Making sure your project commits are attached to your Github account is very
important. Prospective employers want to know you can use Git and setting your
username and email is one of its most basic functionalities. Also, we want those
green squares, right? Check through your commit history (use `git log`) and
verify the authorship is correct. If anything is amiss, review
[this][git-fix-authorship] reading from the curriculum to learn how to make the
appropriate change.

[git-fix-authorship]: fixing-git-commit-authorship
