# Git summary

### `git init`

- When you first begin your project, use `git init` to setup a git repository.
  You should do this before you write any code.

### `git status`

- Use this to see what modified files have not been staged, what files are
  untracked.

```bash
~/aa/ruby-curriculum$ git status
# On branch master
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       modified:   README.md
#       modified:   git.md
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#       git-summary.md
no changes added to commit (use "git add" and/or "git commit -a")
```

### `git add`

- Use this to add files to staging. When you `git add` a file, the next time you
  commit, this version will be saved in the repo.
- NOTE: `git add` only adds the changes you have made thus far. This means that
  when you add a file's changes to staging, if you then make more changes to it
  and commit without re-`git add`ing it, those recent changes will not be
  committed.

```bash
~/aa/ruby-curriculum$ git status
# On branch master
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       modified:   README.md
#       modified:   git.md
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#       git-summary.md
no changes added to commit (use "git add" and/or "git commit -a")
~/aa/ruby-curriculum$ git add git.md
~/aa/ruby-curriculum$ git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#       modified:   git.md
#
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       modified:   README.md
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#       git-summary.md
```

### `git commit`

This will save the work currently staged (from `git add`) into the history by
creating a new _commit_. A commit is a checkpoint that you can return to later
if your code gets screwed up.

**Commit frequently**. As you add small bits of functionality, write
fine-grained commits. Do not wait until you've written half your program to
commit.

Every time you are about to make a major change to your program, you may want to
commit what you have. That way, if you screw up, you can undo easily.

You will be hard-pressed to over-commit when starting out. You probably want to
commit at least once every 5min. You may commit more often if you add
quick-to-write features.

- `git reset`

If you add something you don't want to add, and would like to unstage all staged
changes (so that the staged files return to "Changes not staged for commit"),
use `git reset`.

## Later

- `git clone`
- `git fetch`
