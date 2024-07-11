# Node Package Manager (NPM), Part 2: Package Installation

This second NPM reading covers package installation.

## Installing packages with `npm install`

To install NPM packages for use by your app, use `npm install <package_name_1>
<package_name_2> ...`. You can use `@<version_number>` after a package name if
you need a particular version; otherwise, NPM will just grab the latest version.
For example, to install `react-router` version 5 and the latest version of
`redux`, you would run

```sh
npm install react-router@v5 redux
```

This will look up a package by its name in the NPM registry and automatically
download it into a folder in your app called __node_modules__, kind of like `gem
install <gem_name>`. It will also download any packages that your specified
packages require, and any packages that those packages require, and so on. This
chain reaction can cause your __node_modules__ folder to mushroom quickly. For
instance, `create-react-app`--a once-popular-but-now-obsolete way to create
React apps--would install only six explicit dependencies. Those six
dependencies, however, would effectively fill your __node_modules__ folder with
around 1500 packages. **This is why you should always include __node_modules__
in your __.gitignore__.**

Unless you add a `--no-save` flag to the `npm install` command, it will also add
the named packages to a `"dependencies"` key in your __package.json__. Thus, the
`npm install` command above will add the following lines to your
__package.json__:

```json
  "dependencies": {
    "react-router": "^5.3.4",
    "redux": "^4.2.1"
  }
```

The caret (`^`) before the version number gives NPM permission to update the
package to any minor versions. In this case, NPM will grab the latest `redux`
release between 4.2.1 (inclusive) and 5.0.0 (exclusive). A tilde (`~`) in front
of the version allows NPM to update with any patches. `~5.3.4` would accordingly
allow versions between 5.3.4 (inclusive) and 5.4.0 (exclusive). Of course, if a
package has no `^` or `~` in front, then NPM will always install that specific
version.

> **Note:** When considering whether or not to add a `^` or `~`, you must weigh
> the benefits of enabling your app to incorporate minor fixes and/or patches
> that will help keep the app secure and running well versus the potential
> dangers of running your app using code with which it has not been tested.

Whenever a new package is installed, NPM creates or updates a
__package-lock.json__ file. Similarly to a __Gemfile.lock__, a
__package-lock.json__ stores the particular versions and dependency trees of all
the app's packages. For consistency, this lock file will then be used to
determine versioning on subsequent installs.

## Installing development-only packages

To include dependencies only in your development environment, use the `-D` or
`--save-dev` flag. For example,

```sh
npm install -D redux-logger
```

will produce the following in your __package.json__:

```json
  "devDependencies": {
    "redux-logger": "^3.0.6"
  }
```

Production environments should not install packages listed as
`"devDependencies"`.

## Installing all dependencies

The list of dependencies in a __package.json__ effectively functions like a
Ruby __Gemfile__. Anyone who gets a copy of your app can download all of its
dependencies in one fell swoop simply by running the following command (with no
arguments) in the app's root directory:

```sh
npm install
```

Continue to the next reading to learn how to update and run the packages that
you have installed!
