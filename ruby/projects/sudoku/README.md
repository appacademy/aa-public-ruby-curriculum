# Sudoku

If you're not familiar with Sudoku, please review the [Wikipedia
page][sudoku-wiki] on the subject.

Provided for you [here][puzzles-zip] are some Sudoku puzzles in .txt
format. Download these to a folder on your computer. In the same folder,
you're going to write a Ruby program to read in the puzzle files and let
you solve them!

[sudoku-wiki]: https://en.wikipedia.org/wiki/Sudoku
[puzzles-zip]: https://assets.aaonline.io/fullstack/ruby/projects/sudoku/puzzles.zip

## Learning goals

By the end of this practice, you should be able to

* Explain what factory methods are and how to use them
* Explain how classes interact and how to use `require_relative`
* Write and explain how bracket methods `[]` and `[]=` work
* Use pry to test small parts of your code

## Tile

Let's implement a `Tile` class to represent each position on the Sudoku
board. Each `Tile` has a **value** and is either **given** or not. You cannot
change the value of any `Tile` if it was given (that would be
cheating!). The game would be incredibly frustrating if you didn't have
some way to distinguish given tiles from non-given tiles. You'll want to
account for this when writing the `Tile#to_s` method. If you haven't
already, check out the [colorize gem][colorize]!

[colorize]: https://github.com/fazibear/colorize

## Board

A `Board` should store a `grid` of `Tile`s. Define your `Board#initialize`
method to accept such a grid as an argument. Since your puzzles exist as
text files, write a `Board::from_file` **factory method** to read
a file and parse it into a two-dimensional array containing `Tile`
instances.

The `Board` class will be doing much of the heavy lifting for your game's
logic. It will need the following methods:

* A method to update the value of a `Tile` at the given `position`
* A `render` method to display the current board state
* A `solved?` method to let you know if the game is over
  * Consider using several helper methods here. You will want to know if each
    row, column, and 3x3 square has been solved.

## Game

The `Game` should have an instance variable for the board. It should also have
methods for managing the board-player interaction. You may want a `play` loop
that runs until the puzzle is `solved`. Inside the loop, you should `render` the
board, `prompt` the player for input, and then get both a `pos` and a `value`
from the player. It should then update the tile at `pos` with the new `value`.
Use helper methods to get and validate input from the user; this should help
keep your program from crashing. :)

## Bonus

(**N.B.:** Finish all of the day's remaining projects before tackling this
bonus.)

You've written a Sudoku **checker**; now write a Sudoku **solver**. This is a
harder problem, but there are [several approaches][solver-algorithms] you might
take. As part of your approach, you may want to implement a separate `Solver`
class, as well as a modified `Tile` class that keeps track of any
previously-guessed `value`s.

[solver-algorithms]: https://en.wikipedia.org/wiki/Sudoku_solving_algorithms