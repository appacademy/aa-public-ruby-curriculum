# Tic-Tac-Toe

Let's write a Tic-Tac-Toe game!

## Learning Goals
By the end of this project, you should

* Be able to write object-oriented JavaScript programs
* Be comfortable using `readline` in Node
* Know how to approach creating an AI

## JS: TTT

* Write a `Board` class in __ttt/board.js__.
  * There should be no UI in your `Board`, except maybe to
    `console.log` a representation of the grid.
  * The board should have functions like `Board.won()`, `Board.winner()`,
    `Board.empty(pos)`, `Board.place_mark(pos, mark)`, etc.
* Write a `Game` class in __ttt/game.js__. You'll want to require your
  __ttt/board.js__ file.
* Write the `Game` constructor such that it takes a reader interface as an
  argument. As in the previous exercise, write a `run` method that takes in both
  this reader and a completion callback (`Game.prototype.run(reader,
  completionCallback)`).
* Copy your `playScript.js` from [Hanoi Node][hanoi-node]. It should work for
  Tic-Tac-Toe as well.
* Build a `HumanPlayer` and `ComputerPlayer` that have the same API, i.e., they
  should have the same set of public methods. This means they should be
  interchangeable.
  * Your `Game` class should be passed two player objects on instantiation;
    because both player classes have the same API, the game should neither know
    nor care what kind of players it is given.

## Bonus

* Build an AI for your game. Try to make it unbeatable.

[hanoi-node]:  https://assets.aaonline.io/fullstack/javascript/projects/hanoi_node/solution.zip
