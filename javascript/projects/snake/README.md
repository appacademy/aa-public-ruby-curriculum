# Snake

We're going to write a Snake game!

**[Live Demo]: http://appacademy.github.io/curriculum/snake/index.html**

## Learning Goals

+ Be able to set up Webpack
+ Be able to manage both game logic and display logic
+ Know how to set event listeners for key presses
+ Know how to use `setInterval` to create an animation frame rate

## Phase 0: Webpack Setup

* Create a `main.js` file in the `js` folder. This will be the file that
requires your game's classes and begins the game once the DOM is loaded. It
will also be the entry point for webpack.

## Phase I: `Snake` and `Board`

* Write your code in a `snake.js` file.
* Write a `Snake` class
    * Store the `direction` of the snake. I made this one char
      (`["N", "E", "S", "W"]`).
    * Store the `segments` of the snake. I stored grid coordinates.
    * I wrote a simple `Coord` class. It had utility methods `plus`,
      `equals`, and `isOpposite`.
      * An alternative would be writing helper methods that take two
        array arguments.
    * Write a `Snake.prototype.move` function that will move the snake in the
      current direction.
    * I wrote a simple `turn` method that took a new direction and
      updated `direction`.
* Write a `Board` class.
    * The board should construct and hold a `Snake`.
    * Later, your `Board` can hold on to the apples that are on the board.
    * At the bottom on `board.js`, export the `Board` class because it will be
    used in the `View` class.

## Phase II: Write a simple `View` class

* Write your UI code in a `snake-view.js` file.
    * **Do not mix UI into your model layer**. Keep `snake.js`
      agnostic of the code that displays the game, or that listens for
      browser events.
* Write a `View` class that takes in an HTML element that will hold
  the display. Save this in a `$el` instance variable.
* In the `constructor`, build a `Board`. In order to access the board, you must
 `require` it at the top of the file.
* In the `constructor`, bind a listener to detect key events, so you
  know when the user wants to turn the snake.
    * I used jQuery's `on` method with event `"keydown"`.
    * Lookup and read the relevant jQuery docs as needed.
    * I wrote a helper method `handleKeyEvent(event)`. It looked up
      `event.keyCode` and passed the appropriate direction to
      `Snake.prototype.turn`.
* In the `constructor`, also use `setInterval` to run a `View.prototype.step`
 method every half second. Each turn it should call `Snake.prototype.move` and
 redraws the whole board.
* Render the board using divs or lis with CSS classes. Redraw the board each
turn.
* Export the `View` class. In `main.js`, require the exported `View`.
* Run `webpack` to create `bundle.js`. Be sure to include it in your html.

## Phase III: On your own!

* Add apples to the game. When a snake eats an apple, it grows (for a
  few moves). Randomly generate apples every several turns.
* Detect when a snake hits itself. You lose!

## Phase IV: Bonus!

Many of you will finish the basic functionality with time to
spare. Here are some fun things you can add:

* Keep score (10 points for each apple eaten)
* Pause and restart game
* Leaderboard (keep high scores)
    * Note that you won't be able to store scores across loads of the
      game.
* Tron Snake: 2 player snake (use the 'wasd' keys for one and arrow
  keys for the other) with both snakes running at the same time.

Feel free to come up with extensions of your own. Have fun with it
(and show off to your classmates)!
