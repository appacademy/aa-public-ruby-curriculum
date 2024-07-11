# App Academy Git Style Guide

## **Name your branches reasonably.**

Keep them short but descriptive: `${release_if_applicable}-${feature}-${typeof_change}-${short_descriptor}`

```
Good: `es6-widgets-fix-link`
Good: `pokedex-update-state-shape`
Good: `newproject-create`
Bad: `fixes`
Bad: `es6ify-the-tabs-phase-of-react-widgets-project`
```

##	**One feature per branch.**

Don't bundle a bunch of different features onto one branch. Modularity is good.

##  **Don't branch off of feature branches**.

Branch off the primary working branch, whether it is `main` or the
development branch (e.g. `es6`). Branching off feature branches creates messy
conflicts.

**Avoid this**:

```bash
git checkout primary
git checkout -b feature1
... work on feature1 ...
git checkout -b feature2 # while on feature1
... work on feature2 ...
```

In the example above, all `feature2` changes are being done on top of
`feature1`. If `feature1` changes or gets scrapped, the `feature2` branch now
has a lot of conflicting commits.

**Do this:**

```bash
git checkout primary
git checkout -b feature1
... work on feature1 ...
git checkout primary
git pull # get the latest changes to primary
git checkout -b feature2
... work on feature2 ...
```
## **Avoid `merge --squash`.**  
This can cause unanticipated and silent merge conflicts.

## prefer `git pull --rebase`

This avoids creating a merge commit; do a normal (`merge`) pull only if you get a conflict.

## Use a global `.gitignore`.

This is useful in preventing enormous commits in case you forget to create a
local file.

https://help.github.com/articles/ignoring-files/#create-a-global-gitignore

Use this configuration at a minimum: 
```
*~
**/Gemfile.lock
**/.DS_Store

**/node_modules/
**/bundle.js
**/bundle.js.map
**/npm-debug.log

*.zip

.DS_Store

**/*.sqlite3
```
