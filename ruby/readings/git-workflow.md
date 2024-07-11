## Simple Git Workflow

Git is a powerful tool, and it will take time to take full advantage of its
features. When starting out, however, you only need a few commands to protect
your work.

## Setup

You should use Git's command line interface. When starting your project, there
are two essential commands.

```bash
git init
git remote add your_alias https://github.com/your_username/your_repo_name
```

Let's break this down line by line:

### `git init`

This creates an empty repo in the current directory. Git looks at the current
directory and its children: this means that you should create the repo at the
root level of your project. In particular, in a Rails project, you want to run
`rails new`, `cd` into the directory you just created, then run `git init`.

### `git remote add your_alias https://github.com/your_username/your_repo_name`

This command breaks down into the following components:

- `git remote` accesses the git commands that interact with remote repos
- `add` (not to be confused with `git add`) is a `git remote` command that adds
  a remote repo to the current repo
- `your_alias` sets a name you can use locally to refer to the remote repo; use
  `origin` unless you have a reason not to
- `https://github.com/your_username/your_repo_name` sets the location of the
  repo (this example is for HTTPS; for SSH, it will look different). You will
  have to create this separately, either in the browser or through the command
  line

At this point, you have a local repo (stored in the .git directory) and a remote
repo, which you can reference with `your_alias`; time to start working.

## Working

Now you've written some code and are ready to commit. You need three commands:

```bash
# add/update specific files
git add <files>
# add/update all files
git add -A

git commit -m "Some comment"
git push
```

Line by line:

- `git add <files>`: adds changes to listed files to staging area
- `git add -A`: adds changes to all files in the working directory to the
  staging area

So far, all we've done is told git to prepare to commit; nothing is persisted to
the repository.

- `git commit -m '[Your commit message here]'`: takes currently staged changes
  and stores them in the repository. `-m` is a flag indicating that we want to
  write our commit message on the command line rather than in our default
  editor. A commit message is a brief summary of the changes that we're
  committing. Your commit message should be descriptive and written in the
  imperative, so that someone reading your commit history (maybe you!) can
  understand what you changed. Always start your commit messages with with a
  capital letter, an imperative verb and leave off any trailing punctuation.

At this point, our local repository has a record of the commit, but we haven't
touched the remote repo.

- `git push`: pushes our local commits to the remote repository. The first time
  you run this, you need to run the command as `git push -u your_alias main`,
  which will set the main branch in the remote repo `your_alias` as the upstream
  tracking branch for your local branch. Once you have set this up, you will be
  able to run `git push` and git will direct the push to the upstream repo. To
  push to a particular remote, use `git push remote_name branch_name` (for
  example, `git push origin main`).

If you are using HTTPS, you will need to authenticate with GitHub when you push;
when using SSH, your computer and the server will use your SSH key to handle
this for you. For this reason, it is worth setting up SSH on your dev machine.
On App Academy machines, use HTTPS.

## How to Change Default Branch Name

After your first commit, you will want to change your default branch to be
called `main`. In the past, the default branch was called `master`, but in the
efforts to use more [inclusive language][inclusive-lang] we will be using `main`
going forward.

Run `git branch -M main` to name your default branch to `main`.

You will likely encounter branches named `master` in the wild, so it will good
to think of `master` and `main` interchangeably going forward.

## How Often to Commit and Push

Frequently.

Pushing to GitHub is one of the most useful features we have in Git. This is
because, ultimately, code problems are always fixable: if you can create a bug,
you can eliminate it through debugging alone (not that you shouldn't revert to a
previous commit if that is the best solution). Pushing to a remote does a few
additional things:

- Backs up your work
- Makes your code portable
- Gets you green squares

A good rule of thumb is to commit whenever you make something and confirm that
it works (the second part is important; you don't want non-functional commits
cluttering your repos). Most commits will be small; this is good, as it reduces
the cost of reverting to a previous stage. You don't have to push every time you
commit, but there is usually no reason not to.

## Reference

When you create a new GitHub repository in the browser, GitHub will provide a
summary of the commands needed to connect it to a local repository.

For common git commands, check out the Git Summary reading in the sidebar.

For more on writing good commit messages, check out [this post][chris-beams] by
Chris Beams.

[chris-beams]: http://chris.beams.io/posts/git-commit/
[inclusive-lang]: https://www.zdnet.com/article/github-to-replace-master-with-main-starting-next-month/