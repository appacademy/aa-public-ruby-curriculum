# Screwdoku

At the surface, this project is about learning and recognizing common Ruby
errors.

Almost all of these errors are bugs that students hit in their projects (and
that engineers hit in the real world).

But this project is really about training you to think and debug like an
engineer. The faster you narrow down bugs:

1. The faster you learn.
2. The more time you save each time you debug something new.
3. The more you can solve problems on your own.

## Learning goals

By the end of this practice, you should be able to

- Read a stack trace and work backwards toward the source of your error
- Use a debugger effectively
- Use `git branch`, `git checkout`, and `git commit` comfortably
- `git push` to your own GitHub repo

## Don'ts

**Do NOT look up code on the main branch during the project. Looking up the
answer is cheating and defies the purpose of the project.**

**Do NOT give other students the solution when they ask you. Only offer them new
approaches that they can take.**

## Tips

Make a list of strategies you've been using to debug as you go along.

If you want to print something out, use the debugger instead. Stop the code and
poke around. Don't use `puts` statements if you can avoid it.

If you get stuck and need ideas, reference the Debugging Cheatsheet in the
sidebar.

## Setup

- Download the [zip][zip] file.
  - **NOTE**: You will **not** be including or pushing up this project in your
    classwork repo because it's a big project with a lot of commits from some
    previous a/A celebrities. Save the skeleton to a different location than
    inside the directory you created for today's work.
- Run `bundle install`.
- Start on the `main` branch, which has a working version of the game.

[zip]:
  https://assets.aaonline.io/fullstack/ruby/projects/screwdoku/screwedoku.zip

## Gameplay

Fix all the levels.

- List all the levels by running `git branch`.
- Run `ruby sudoku.rb` on the main branch and fill a few spots to get a feel
  for how the game works with correct code.

Starting with `level-1`, for each level:

- Check out that level's code (e.g., run `git checkout level-1`,
  `git checkout level-2`, etc.).
- Run `ruby sudoku.rb` and try to fill a few spots. You can catch every bug
  within two turns.
- Your game will break somehow.
- Figure out how to fix it using the strategies you've learned. You are allowed
  to write extra code and new methods if necessary. You are allowed to use the
  scientific method. Your approaches are allowed to be creative.
- If you run out of approaches and are dumbfounded for more than 5 minutes, ask
  your cohortmates for approaches to try.
- Run `ruby sudoku.rb` and make sure the game plays like the main version. If
  the game works after two turns, you're done!
- Add and commit your change(s) once the code works. **Do NOT push.** Reference
  the Git Workflow reading in the sidebar if you need to (especially the
  "Working" section).
- Before checking out the next branch, close all of your file tabs in VS Code.
  VS Code caches open files when switching branches. If you don't close them,
  you may be viewing/editing a file that doesn't exist on the branch you just
  checked-out.

Check out the `final-level` and `super-evil-level` at the end.

## Bonus

Make up three new levels (each on different branches) with three new tricky
errors. Get another group that has finished to try them.
