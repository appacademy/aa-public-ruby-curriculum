# Feature Branch Workflow With Git

The ["feature-branch" workflow][feature-branch] is one of multiple types of
workflows that you can use with git. Some benefits of this particular workflow
include:

1. Allowing multiple developers to work on a particular feature without
   disturbing the main codebase.
2. Protecting the `main` branch from broken code.
3. Encouraging developers to consistently review each other's code through pull
   requests.

## How it works

1. Make sure your local `main` branch is up-to-date:

   ```sh
   git pull origin main
   ```

2. When working on a new feature, check out a feature branch from your command
   line:

   ```sh
   git checkout -b <feature-branch-name>
   ```

   - Keep `feature-branch-name`s descriptive (e.g., `automate-job-app-strikes`).
   - Run `git branch` to confirm which branch you are on.

3. Work on the feature, committing often with strong commit messages.
   - [How to write good commit messages][good-commit-messages]
     - Do not end subject line with period.
     - Use imperative mood. (Start the message with a present-tense imperative.)
       - **Bad:** 'Auth log-in form created'
       - **Bad:** 'Created auth log-in form'
       - **Bad:** 'Will create auth log-in form'
       - **Good:** 'Create auth log-in form'

4. When you are ready to publish your features/changes, push to your remote
   repository from your local feature branch.
   - The first time you push from a local feature branch, you will need to set
     upstream to `origin`:

     ```sh
     git push -u origin <feature-branch-name>
     ```

   - If it's not your first push from that branch, then do `git push origin
     <feature-branch-name>` or simply `git push`.

5. Go to your repository on GitHub and create a pull request from your branch to
   `main`.
   - **If there are merge conflicts**, go back to the command line and [resolve
     them][resolving-merge-conflicts].
   - Once you finish resolving, commit and push.

6. Assign someone to review your pull request.
   - If the reviewer requests changes, make the changes on your local feature
     branch, commit the changes, and push. The new changes will automatically
     show up on the pull request.
   - If the reviewer approves and there are no merge conflicts, then the
     reviewer can merge the branch into `main` on GitHub.

## Reviewing a pull request

When you're assigned to review a pull request, you can use GitHub's nice
interface to review changes and leave comments.

In addition to using that interface, you can also `checkout` that remote feature
branch on your local repo to test and look at the code. For example, assume the
remote repo has the following branches:

- `main`
- `login-form`
- `navbar-dropdown-menu`

Let's say that your teammate assigns you to review the pull request on his or
her feature branch `login-form`. From your command line, run

```sh
git checkout login-form
```

so that you can view and test the code locally.

Once you approve a pull request, delete the branch on GitHub.

On the same note, if your pull request gets approved, don't keep working on that
same local feature branch. Switch to the `main` branch--`git switch main`--and
run `git pull` to download the merged changes. Delete the merged feature branch
locally with

```sh
git branch -d <feature-branch-name-that-was-approved>
```

Then check out another feature branch to work on something else.

## General tips for a successful workflow

1. When switching between branches, your branch must be clean. To keep it
   simple, commit any changes before switching.
2. Commit often.
3. Protect your `main` branch.
   - On GitHub, go to your repo and go to `Settings`.
   - In the menu on the left, go to `Branches`.
   - Under `Protected branches`, choose `main`.
   - Check `Protect this branch` and `Require pull request reviews before
     merging`.
4. Use `git log` to review what commits have happened on your current branch.
5. Use `git branch` to confirm that you are on the correct branch.
6. Use `git status` to see whether you have staged or unsaved files.

[feature-branch]:
  https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow
[resolving-merge-conflicts]:
  https://help.github.com/articles/resolving-a-merge-conflict-using-the-command-line/
[good-commit-messages]: https://chris.beams.io/posts/git-commit/
