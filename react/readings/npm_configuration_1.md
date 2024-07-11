# Node Package Manager (NPM), Part 1: Initialization

Throughout the JavaScript and React portions of the App Academy curriculum, you
will use Node Package Manager, or [`npm`], to install and manage JavaScript
dependencies (which are called _node modules_). `npm` is the default package
manager for Node.js; [`yarn`] and [`pnpm`] are examples of other popular package
managers.

This series of readings will explain what `npm` does and how you can use it to
manage multiple JS dependencies. This first reading covers initialization.

[`npm`]: https://www.npmjs.com/
[`yarn`]: https://yarnpkg.com/
[`pnpm`]: https://pnpm.io/

## Generating a __package.json__ with `npm init`

To initialize an app with NPM, run this command in the app's root directory:

```sh
npm init -y
```

This initialization will create a file called __package.json__ that contains
settings and other information about your app. The `-y` (or `--yes`) flag tells
NPM to set up the __package.json__ with standard defaults. The end result will
look something like this:

```json
{
  "name": "current-directory-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Don't worry about the default settings; they won't affect how your app runs, and
you can always adjust them later.

If you leave off the `-y` flag, then `npm init` will ask you to input the values
you want for each of those keys. For what it's worth, you could also construct a
__package.json__ manually, but using NPM's CLI (command line interface) is just
easier.

In the next NPM reading, you will learn how to install packages.
