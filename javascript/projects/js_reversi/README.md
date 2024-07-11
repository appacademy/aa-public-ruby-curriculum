# Reversi: Javascript Style

## Learning Goals

- Be able to reason about object-oriented Javascript
- Know the different ways that objects can interact with each other in
  JavaScript
- Be able to write modular code
  - Know how to manually test your code as you write it
- Be able to write a run-loop in JavaScript
- Know how to use duck typing to allow for both a HumanPlayer and a
  ComputerPlayer

Download the [skeleton].

Read the entirety of the project description before starting!

> **Note**
>
> You will notice some of the code has something like this at the top:
>
> ```javascript
> if (typeof window === 'undefined'){
>   var readline = require("readline");
>   var Piece = require("./piece.js");
>   var Board = require("./board.js");
> }
> ```
>
> If this doesn't make sense yet that is totally ok. You will learn more about it
> tomorrow. For now, make sure not to touch this code.

## Before you start: Familiarize yourself with Jasmine

For this project you will be using Jasmine, which is the same testing framework
that you will be using for your Javascript assessment. Your file tree will look
like this:

```bash
- lib
- spec
- src
SpecRunner.html
```

All you need to do to run and see the specs is open the `SpecRunner.html` file
in your browser. You will see the failed specs immediately, but if you want to
see all of them, click `Spec List` near the top. To re-run  the specs, just
refresh the page. If you open up your `src` folder you will see `board`, `game`,
and `piece` files. This is where you will be writing your code. We highly
recommend writing your code in the order specified below.

## Reversi: Part I

- Write the [Reversi] game.
- You probably want a `Piece`, `Board`, and `Game` class.
- You're going want to complete the specs in this order:

  - Piece
    - `color`
    - `oppColor`
    - `flip`
    - `toString`
  - Board
    - `_makeGrid` && `constructor` function for `Board`
    - `isValidPos`
    - `getPiece`
    - `isMine`
    - `isOccupied`
    - `_positionsToFlip`
    - `validMove`
    - `placePiece`
    - `validMoves`
    - `hasMove`
    - `isOver`
  
- The skeleton lays out the functions you will need to write. There are comments
  above each function which describes its functionality.
- Do not write any user interaction code yet. Your `Game` should have a method
  `placePiece(position, color)`.
  - In particular, don't add a run loop yet.
- A challenge is to write your code in a way that is _modular_ -- it should be
  broken up into small methods that you can individually test.

## Reversi: Part II (Bonus)

- Create Bill, the AI player from this [demo], by creating an AIPlayer class
  that reads the board and makes its next move based on the current placement of
  pieces on the board.

[skeleton]: https://assets.aaonline.io/fullstack/javascript/projects/js_reversi/skeleton.zip?raw=true
[Reversi]: http://en.wikipedia.org/wiki/Reversi
[demo]: https://cardgames.io/reversi/
