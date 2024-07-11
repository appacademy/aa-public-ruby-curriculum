# Node Package Manager (NPM), Part 4: Scripts

In this fourth and final NPM reading, you will learn how to construct and run
scripts.

## Scripts

A __package.json__ also typically contains a `"scripts"` key. For instance,
Vite--a popular package for creating React apps that you will learn about
later--populates this key with four scripts by default:

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint src --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
```

Once you've added a script, you can run it with this command:

```sh
npm run <script_name>
```

Given an app with the above scripts, running, e.g., `npm run build` in the
directory with your __package.json__ will then run the `vite build`
command. Like `npx`, scripts will also always use the version of a package
(here, `vite`) specified in the __package.json__.

> **Note:** `start` and `test` are special script names that do not require the
> use of `run`, e.g., `npm start`. They do, however, still need to be defined
> under the `"scripts"` key if you want to use them.

In general, scripts are particularly useful when 1) you want to alias a standard
command (see the `vite build` example above), 2) you have a series of commands
that need to be executed together, or 3) you want to run a command with a
standard set of command-line options (see the `lint` script above).

For instance, if you want a single command that could be run from the root
directory to install and build your JS frontend, you could set up this script in
your root __package.json__:

```json
  "scripts": {
    "build": "npm install --prefix frontend && npm run build --prefix frontend"
  },
```

> **Note:** The `--prefix` option specifies the subdirectory in which the
> command should be run.

Running `npm run build` in the root directory would then accomplish the desired
task!

## What you've learned

In this series of NPM readings, you've learned how to initialize a project to
use NPM as the package manager by running `npm init -y`. You also learned how to
use packages, including how to:

* Install packages and record them in the __package.json__ using `npm install
<package_name>`
* Install all of an app's dependencies from the __package.json__ with `npm
install`
* Update packages with `npm audit fix` or `npm update`
* Run the installed version of a package using `npx`

Finally, you learned how to construct and run scripts using the `"scripts"` key
in the __package.json__.
