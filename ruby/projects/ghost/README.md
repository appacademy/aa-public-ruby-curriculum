# Ghost

Today you'll be writing a Ruby implementation of everyone's favorite road-trip
word game, [Ghost][ghost-wiki].

[ghost-wiki]: https://en.wikipedia.org/wiki/Ghost_(game)

## Learning goals

By the end of this project, you should

* Understand how different classes interact
* Be able to write classes in different files and use `require_relative` to
  connect them
* Know how to test methods in pry
* Know how to read lines from a text file
* Understand how `__FILE__ == $PROGRAM_NAME` works

## Phase 1: Playing a single round

Let's start by writing the logic to play a single round of Ghost (that is,
playing until one player spells a word). Write your game for two players only,
and don't worry about keeping track of wins/losses (you can implement that
later). The basic logic will look something like this:

* Instantiate a new Game object, passing in both of the Players.
  * The Game maintains a `fragment` instance variable, which represents the word
    as it has been built up by the players.
  * The Players take turns adding a letter to the `fragment`. The Game should
    ensure that a play is valid before actually changing the `fragment`.
  * The Game checks the `fragment` against a `dictionary`; if the `fragment` is
    a word contained in the `dictionary`, then the previous player loses.

### Game

Start by creating a `Game` class.

#### `#initialize`

Assign instance variables for the `players`, `fragment`, and `dictionary`. Since
you'll be checking the `fragment` for inclusion in the `dictionary`, you'll want
to use a data structure with fast lookup: a Hash or [Set][set-docs] would be
ideal. You can use [this file][ghost-dictionary] to populate your dictionary; it
contains only words three letters or longer (otherwise you wouldn't have a very
interesting game).

💡 **NOTE:** Using a Hash or a Set instead of an Array to store your
dictionary allows you to check if the fragment is included in the dictionary
very quickly. In fact, the amount of time it takes to see if the fragment is
included is independent of how long the dictionary is because these data
structures don't require you to examine every element when you check for
inclusion. If you stored the dictionary just as an array of strings, using the
`Array#include?` method would take longer as your array of strings got longer.
Keep in mind, though, that when you check to see if there are any words in
the dictionary that can be created by adding another letter to the fragment in
your `valid_play?` method, you are potentially looking at every word in the
dictionary. Therefore, this operation will not be speed-boosted by your use of a
Set or Hash.

[set-docs]: http://ruby-doc.org/stdlib-2.4.2/libdoc/set/rdoc/Set.html

#### `#play_round`

The core game logic lives here. Consider writing some helper methods to keep
things clean:

* `#current_player`
* `#previous_player`
* `#next_player!`: updates the `current_player` and `previous_player`
* `#take_turn(player)`: gets a string from the player until a valid play is
  made; then updates the fragment and checks against the dictionary. You may
  also want to alert the player if they attempt to make an invalid move (or, if
  you're feeling mean, you might cause them to lose outright).
* `#valid_play?(string)`: Checks that `string` is a letter of the alphabet AND
  that there are words you can spell after adding it to the `fragment`.

### Player

To implement `Player`, you will probably want to write methods like
`initialize`, `guess`, and `alert_invalid_guess`. (It would also be nice for
each `Player` to have a `name`.)

[ghost-dictionary]:
https://assets.aaonline.io/fullstack/ruby/projects/ghost/dictionary.txt

## Phase 2: Playing a Full Game

Now that you have the logic to play a single round of Ghost, you'll have to add
another layer.

### `Game#losses` and `Game#record`

In a game of Ghost, a player "earns" a letter each time they lose a round. Thus,
if Eric beats Ryan 3 times and loses once, then Eric has a "G" and Ryan has a
"GHO". If a player spells the word "GHOST", they are eliminated from play (and
in the case of two players, the other player wins).

Consider adding a `losses` hash to your `Game` class. The keys to the hash are
`Player`s and the values are the number of games that player has lost. Update
this at the end of `#play_round`. (For good UI, you could also write a helper
method, `#record(player)`, that translates a player's losses into a substring of
"GHOST".)

### `Game#run`

This method should call `#play_round` until one of the players reaches 5 losses
("GHOST"). You could write a `#display_standings` helper method to show the
scoreboard at the beginning of each round. Also, remember to reset the fragment
at the beginning of each round!

You ultimately want `Game#run` to run when someone runs the file, but you also
want to be able to load the file into a developer console like `pry` **without**
the game necessarily running. Remember that you can achieve this by wrapping
your top-level script in an `if __FILE__ == $PROGRAM_NAME` block. (See the
Debugging reading if you need a refresher on this trick.)

## Phase 3: Multiplayer!

Refactor your game to work with more than just two players. Instead of ending
the game when one player reaches five losses, simply exclude that player
from further rounds. End the game when only one player is left standing.

**Hint:** You won't be able to use an instance variable for each player anymore.
What data structure might you use as an alternative?

## Bonus Phase

* Write an `AiPlayer` class for your Ghost game. You'll need to figure out the
  logic for picking a winning letter on each turn. In order to do this, your
  `AiPlayer` will need to know both the current fragment and the number of other
  players (`n`).
  * If adding a letter to the fragment would spell a word, then the letter is
    a losing move.
  * If adding a letter to the fragment would leave only words with `n` or
    fewer additional letters as possibilities, then the letter is a winning
    move.
  * Your AI should take any available winning move; if none is available,
    randomly select a losing move.
    * See if you can improve your AI by computing the entire tree of possible
      moves from the current position. Choose the move that leaves the fewest
      losers and the most winners in the tree.