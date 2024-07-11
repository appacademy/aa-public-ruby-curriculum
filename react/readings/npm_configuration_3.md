# Node Package Manager (NPM), Part 3: Updating And Running Packages

This third NPM reading explains how to update and run packages.

## Updating packages with `npm audit fix` and `npm update`

When NPM finishes installing packages, it will give you a health report on your
dependencies, something like this:

```sh
6 high severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

This report comes from a list of known package vulnerabilities that NPM
maintains. If you want to see what the offending packages are, you can run `npm
audit` for a more detailed report.

Feel free to run `npm audit fix`. This will go through and replace the
vulnerable versions with the newer, fixed versions, as long as your version
specifications allow for the update.

Even if vulnerabilities still remain after you run `npm audit fix`, you should
probably **avoid** NPM's other "helpful" suggestion, namely, running `npm audit
fix --force`. NPM suggests this command when it can't patch a vulnerability
because a fix either isn't available or isn't available in an allowed version.
The problem with this "solution" is that, as NPM warns, it could introduce
breaking changes, either by incorporating a more advanced version or by
reverting to a (sometimes significantly) earlier version with potentially other
vulnerabilities.

Nevertheless, don't despair! The situation may not be as dire as the warnings
suggest. Why not? Many of the vulnerable dependencies could well stem from your
`devDependencies`, which are only ever available in development, i.e., a
presumably secure environment accessible only by you (and your team). In other
words, it is quite possible many of those reported critical vulnerabilities will
be gone by the time your app appears exposed to the world in production. To read
more about these "false" warnings, see this snarky [blog post][npm-audit] by Dan
Abramov (co-author of Create React App).

**Note:** You should, of course, address any significant vulnerabilities that
appear when building for production.

You can also update all the dependencies in your __package-lock.json__--i.e.,
not just those with known vulnerabilities--to the most recent versions allowable
according to `^` and `~` tags by running `npm update`.

[npm-audit]: https://overreacted.io/npm-audit-broken-by-design/

## Running installed package versions with `npx`

Recall that, in Ruby, running `bundle exec some_command` is **not the same** as
running `some_command`. In the former, the `Gemfile`-specified version of
`some_command` is run, while in the latter, the local version is run. Omitting
`bundle exec` when running commands can cause errors if your app isn't
compatible with the local version.

To solve this issue with NPM packages, use `npx` instead of `bundle exec`. When
given the name of a package to run, `npx`--short for Node Package Execute--will
first search the local __node_modules__ folder for the package. If it finds the
package, it will run it. If it does not find the package in __node_modules__,
then it will look to the NPM registry, download a temporary--i.e.,
uninstalled--version of the package, and run it.

In the final NPM reading, you will learn about NPM scripts.
