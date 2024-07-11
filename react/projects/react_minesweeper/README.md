# Minesweeper with React

## Overview

In this project, you'll create an interactive version of minesweeper using
React. Click [here][live-solution] to see an example. Since we're focused on UI
interaction today, we've provided the game logic for you. You'll load it as a
library and build a React application that interfaces with the Board and Tile
classes defined there. Your React components will be updating and re-rendering
the board's current state based on user input.

Go ahead and look at the interface defined in our [`minesweeper.js`
library][minesweeper-js]. That file's `exports` are the Board and Tile classes.
I recommend `import`ing all objects into your JSX files aliased as
`Minesweeper`, such that you can access the Tile and Board API through
`Minesweeper.Board` and `Minesweeper.Tile`.

Alright, let's get started!

[live-solution]: http://appacademy.github.io/curriculum/minesweeper/index.html
[minesweeper-js]: https://assets.aaonline.io/fullstack/react/projects/react_minesweeper/minesweeper.zip

[Live Demo!][live-solution]

## Phase 0: Setup

Create `index.html`, `application.css`, and `react_minesweeper.jsx` files. Also,
create a components folder, where we'll put our `Tile`, `Board`, and `Game`
React components. As with the Widgets project, run `npm init --yes` and install
all of the packages we used for Widgets. Set up your `webpack.config.js` as well, 
which other than your `entry` file should look the same as it did for Widgets. 
Lastly, remember to source `bundle.js` into `index.html`.

Once your files are set up, add the following to the `"scripts"` section of your
`package.json`: `"start": "webpack --watch --mode=development"`. Run `npm start`
and open `index.html` to see your app.

## Phase 1: Game

Start by creating a `Game` component using `extends React.Component`. In
`constructor()`, initialize a new `Minesweeper.Board` and set it as the `board`
property of the initial state object. This will be the object that we
continuously update over the course of the game.

Stub out a second function, `updateGame`, but don't write anything here yet.
We'll return to this after we have a properly rendering board. Then, write a
render method. Have it return a new React component, Board, passing in
`this.state.board` and `this.updateGame` as props. The Board component will pass
the `updateGame` function to each individual tile: ultimately, this is how we'll
make sure that the board re-renders when the state of the game changes.

Don't forget to bind your functions in your constructor.

## Phase 1a: React.render / Tile Stub

While we're writing the Board component, it would be nice to be able to test
that our render method is working. We need to do two things to do this. First,
call `ReactDOM.render` at the bottom of your script in `react_minesweeper.jsx`
to put the Game component on the page. In order to fix the problem of your
target `div` not loading before you search for it, you can either use a
`DOMContentLoaded` listener or source `bundle.js` at the bottom of your `<body>`
instead of in `<head>` (whichever you choose, think about why the second way
would work). Second, create a very basic Tile component. Give it a simple render
function that returns a string, " T ". This will allow us to tell if our board
is putting Tile components onto the page correctly.

## Phase 2: Board

Our Board component will be responsible for a single task — rendering rows of
Tile components. The construction logic will live in our render function. We're
going to return a component tree, starting with a top-level `<div>`. Inside of
this, use `Array#map` on the grid of `this.props.board` to return a `<div>`
component for each row. Remember that the function passed to map is given two
arguments, the object and the index, both of which we'll need here.

Each row of the board's grid consists of individual tiles. We want to map these
into React components. Add an inner call to map, this time on the row being
mapped by the outer function. Again, keep track of the index. Create a new Tile
component for each element in the row, passing two props: the tile object being
mapped, and the `updateGame` function we passed into the Board component as a
prop.

Lastly, ensure that both the rows and Tile components are passed a `key`. This
isn't strictly needed right now, since our tiles won't be reordered and aren't
stateful, but it's a good habit to get into. Read more on keys
[here][react-keys], then use the indexes to pass each tile a unique key.

[react-keys]:
https://reactjs.org/docs/lists-and-keys.html

## Phase 3: Tile

It's time to flesh out our Tile component. Update your render logic to change
the text of the tile based on whether it has been revealed, is bombed, or is
flagged. If it's been revealed and has more than one adjacent bomb, show that
number. For bombs and flags, use Unicode!

In addition, let's start applying some CSS. Change your render method to return
a `div` with the text calculated above. Give all of your tile `div`s a class of
'tile' using the `className` prop. Also add a bombed, revealed, or flagged class
as appropriate. Use CSS to style your tiles and make your board beautiful. Hint:
use `border-style: inset;` and `border-style: outset;` to achieve the 3D tile
effect for revealed tiles.

After you've finished with the CSS, write a `handleClick` function for the Tile
component, and pass it to the component's rendered `div` using `onClick`. Have
this call the `updateGame` function we passed as a property, passing the plain
javascript tile object and a boolean for whether the user is flagging or
revealing the tile as arguments. (You might note that our Game's `updateGame`
function doesn't take any arguments yet – we'll fix that shortly).

How could we tell if a user wants to flag a tile? For now, check whether the
user is holding down the alt key when they click. For help, read the Mozilla
[documentation][click-docs] on click events.

[click-docs]: https://developer.mozilla.org/en-US/docs/Web/Events/click

## Phase 4: A Working Game

Back in your Game component, update the `updateGame` function to take two
arguments. Matching what we wrote in the Tile's `handleClick` function, the
first will be a tile object, and the second will be a boolean. The boolean
should indicate whether the player was flagging the tile (true) or revealing it
(false).

It's time to have the Game component interact with the JavaScript game on the
back-end. Call toggleFlag() or explore() on the tile based on the user's action.
Once you've done this, re-set your state using `this.setState({ board:
this.state.board })`. By re-setting the state here, we ensure we trigger a re-render
of our entire component tree.

Last, write some basic logic in your Game's return function to indicate to the
user if they've won or lost based on the Game components's state. Have a look at
the methods defined on Board in `minesweeper.js` if you're unsure how to do
this.

## Phase 5: Modal

Time to practice your CSS chops. In our Game component's render method, check if
the game is over. If it is, have a modal pop up congratulating (or consoling)
the player. Also, include a button to play another round. To make this work, add
another method `restartGame` to your Game component, which generates a new board
and resets the board in the Game's state to the new board.

As a guide, check out the modal demo in the [modal-demos][modal-demo].

[modal-demo]: https://assets.aaonline.io/fullstack/html-css/demos/css_demos/modal.zip
