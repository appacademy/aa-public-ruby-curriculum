# Sample JS Project Proposal: Conway's Game of Life with Variations

## Background

Conway's Game of Life is a classic example of the concept of **cellular
automata**.  The original GoL plays out on a rectangular grid.  Each cell on the
grid is either dead or alive when the game begins.  On the next iteration of the
game (called a "generation") the cells follow these rules:

1) Any live cell with exactly 2 or 3 live neighbors* stays alive; otherwise, it
   dies
2) Any dead cell with exactly 3 neighbors will come to life; otherwise, it
   remains dead

\* A cell's neighbors are the 8 cells that immediately surround it (fewer when
you're at an edge or corner)

There are many variations on the GoL.  This simulation will incorporate several
of those variations, outlined in the **Functionality & MVP** and **Bonus
Features** sections.  

## Functionality & MVPs

With this Conway's Game of Life simulator, users will be able to:

- Start, pause, and reset the game board
- Select squares to be alive in the initial state
- Choose from preset demo initial states
- Toggle between square, triangular and hexagonal grids with corresponding
  rule sets

In addition, this project will include:

- An **About** modal describing the background and rules of the game
- A production README

## Wireframes

![wireframe][wireframe-image]

* Nav links include links to this project's Github repo, my LinkedIn and
  AngelList, and the About modal.  
* Game controls will include Start, Stop, and Reset buttons as well as a slider
  to control the speed.  
* On the right, there will be clickable rectangles used to toggle between color
  schemes.
* On the left, three clickable shapes will be used to toggle between the types
  of grids available (Bonus)
* Additionally, a drop-down will be added to the Controls to toggle between
  different rule sets (Bonus).

## Technologies, Libraries, APIs

This project will be implemented with the following technologies:

- The `Canvas API` to render the game board
- `Webpack` and `Babel` to bundle and transpile the source JavaScript code
- `npm` to manage project dependencies

## Implementation Timeline

**NB**: 

* **Friday Afternoon & Weekend**: Setup project, including getting webpack up
  and running. Get canvas to show up on the screen, and spend time getting
  comfortable with the Canvas API. Create `Board` and `Cell` classes. Get a grid
  rendered to the canvas reflecting the initial state of the cells.

* **Monday**: Dedicate this day toward implementing the underlying logic of
  Conway's Game of Life.  Ensure that I can advance a generation and all the
  cells update appropriately. If time, make sure this is all rendered correctly
  on the canvas.

* **Tuesday**: If I didn't get to it already, get the cells correctly rendered
  to the canvas. Make sure they rerender correctly when I advance a generation.
  Then, focus on user controls: start, stop, reset, and clicking on cells.

* **Wednesday**: Finish implementing user controls, and focus on styling, as
  well as implementing the different color schemes and nav links. If time, start
  on bonuses.

* **Thursday Morning**: Deploy to GitHub pages. If time, rewrite this proposal
  as a production README.

## Bonus features

There are many directions this cellular automata engine could eventually go.
Some anticipated updates are:

- Add options for different grid types
- Add multiple choices for starting states that are interesting
- Explore multi-state versions of the game, such as the ones outlined [here][game-of-life-2]

[wireframe-image]: https://s3-us-west-1.amazonaws.com/appacademy-open-assets/js-proposal-wireframe.jpg
[game-of-life-2]: https://cs.stanford.edu/people/eroberts/courses/soco/projects/2008-09/modeling-natural-systems/gameOfLife2.html