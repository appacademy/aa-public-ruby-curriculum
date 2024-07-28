# Minesweeper

**Read all these instructions first. There are useful hints at the end of this
document.**

Everyone remembers [Minesweeper][play-minesweeper] ([wiki][minesweeper-wiki]),
right? Let's build it!

## Learning goals

By the end of this practice, you should

- Be comfortable using `git merge` to merge a feature branch to the main
  branch
- Know how to create a remote repository and push to it
- Know how to use recursion to simplify complicated logic
- Know when to separate logic for different parts of your project into different
  classes

## Git a good start!

Remember, you're using Git today, so you'll initialize a new repository.

```sh
% git init
```

Throughout the day, you should be committing frequently. Follow this sequence of
commands each time you commit. Pay attention to the output of each command so
that you understand what it's doing. Once you _git_ how the commands work, you
can develop your own routine, but for today, follow this sequence every time.

```sh
% git status
% git diff
% git add -A
% git status
% git diff --staged
% git commit -m "descriptive message about changes"
% git log
```

## Reveal

Start by supporting a single grid size: 9x9; randomly seed it with bombs. The
user has two choices each turn:

First, they can choose a square to reveal. If it contains a bomb, game over.
Otherwise, it will be revealed. If none of its neighbors contains a bomb, then
all the adjacent neighbors are also revealed. If any of the neighbors have no
adjacent bombs, they too are revealed. Et cetera.

The "fringe" of the revealed area is squares all adjacent to a bomb (or corner).
The fringe should be revealed and contain the count of adjacent bombs.

The goal of the game is to reveal all the bomb-free squares; at this point the
game ends and the player wins.

## Flag bomb

The user may also flag a square as containing a bomb. A flagged square cannot be
revealed unless it is unflagged first. It's possible to flag a square
incorrectly, so the behavior should be the same regardless of whether there's a
bomb in that square.

Flags are there to help the user keep track of bombs and do not factor into the
win condition. Once every square that isn't a bomb has been revealed, the player
wins regardless of whether they've flagged all the remaining squares.

## User interaction

You decide how to display the current game state to the user. You could, e.g.,
use `*` for unexplored squares, `_` for "interior" squares when exploring, and a
one-digit number for "fringe" squares. Put an `F` for flagged spots.

You decide how the user inputs their choice. Using a coordinate system is
probably best. Perhaps they should prefix their choice with either "r" for
reveal or "f" for flag.

After you have your UI working, request a **code review** from your Instructor
and have them check your commit log. Take notes and refactor before moving on.

## _Git_ a new feature!

By now you should be starting to _git_ the commit workflow. Let's take things to
the next level with **branches**!

Create a new branch for your new feature and checkout that branch:

```sh
% git branch save-game
% git checkout save-game
```

Commit on this "feature branch" until your feature is done. Then switch back to
`main` and merge the branch in.

```sh
% git checkout main
% git merge save-game
```

Finally, delete the feature branch. It's been merged, so you no longer need it.

```sh
% git branch -d save-game
```

### _Git_ shorter

This is also a good time to mention that the student computers have a bunch of
useful Git aliases that save you typing! These include:

- `git co` => `git checkout`
- `git s` => `git status`
- `git l` => super awesome version of `git log`

Type `git alias` to see them all.

## Saving games

Add save/load functionality. Use YAML to let users save/load their minesweeper
game to/from a file. Be sure to use a branch for this feature.

Reference the Serialization (JSON and YAML) reading in the sidebar.

## Bonus features

Start implementing the following features. Before you begin each feature, create
a feature branch for it and then merge that branch back in when you're done.

- Colorize!
- Cursor Input! ([This][keypress] is a good starting point)
- Track the time it takes for the user to solve the game. You might keep track
  of the ten best times in a leaderboard, too. You could keep separate lists for
  the different sizes. It's up to you!

## _Git_ your project online!

At the end of the day, however far you get in the project, you should push your
code to GitHub. That way it's saved online and you can access it from anywhere.
Some projects make good showpieces during the job search, so it's often a good
idea to do this.

1. Each of you will need to login to Github and [create a new
   repository][github-create-repository]. **_Do not_** include a `README.md` or
   `.gitignore`. It should be completely empty.

2. Add each repository as a remote

```bash
% git remote add partner1 https://github.com/partner1/minesweeper.git
% git remote add partner2 https://github.com/partner2/minesweeper.git
```

3. Push your code

```bash
% git push partner1 main
% git push partner2 main
```

**N.B.:** If you want the commits to be under your name as opposed to
"aastudent", rewrite the git authorship before each push. For more information
see the reading on Fixing Git Commit Authorship in the sidebar.

## Hints

You should probably have a `Tile` class; there's a lot of information to track
about a `Tile` (bombed? flagged? revealed?) and some helpful methods you could
write (`#reveal`, `#neighbors`, `#neighbor_bomb_count`). A `Board` class might
also be helpful.

You should separate logic pertaining to Game UI and turn-taking from the
`Tile`/`Board` classes.

You'll want to pass the `Board` to the `Tile` on initialize so the `Tile`
instance can use it to find its neighbors. But then if at some point you use `p`
to print out a `Tile` instance, you'll get way more info than you need, as the
data for the `Board` it holds will also be printed. You can fix this by
overriding (defining) the `inspect` method in your `Tile` class, having it
return a string that contains just the info you want (e.g., the `Tile`s position
and bombed, flagged, etc. state). For more information or if you need a
refresher on how to do this, see the reading on Inspecting Complex Elements in
the sidebar.

If you use command line arguments and `ARGV` to specify the name of the save
file to load, you may be surprised to find that console input is broken. [This
ruby-forum.com post][argv-description] explains how `gets` interacts with
`ARGV`/`ARGF`.

[play-minesweeper]: http://minesweeperonline.com/#beginner
[minesweeper-wiki]: http://en.wikipedia.org/wiki/Minesweeper_(Windows)
[argv-description]: https://www.ruby-forum.com/topic/185266#809660
[keypress]: https://gist.github.com/acook/4190379
[github-create-repository]:
  https://help.github.com/articles/creating-a-new-repository/