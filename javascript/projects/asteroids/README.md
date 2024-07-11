# Asteroids

## Learning Goals

- Be able to implement prototypal inheritance to give a class another class's
  methods and attributes
- Be able to include JavaScript in a web page
  - Know how Webpack works
  - Know how to test JavaScript code using `window.x = x`
- Know how to render information from JavaScript objects on a page
  - Know how to draw on a web page using Canvas

**[Live Demo][live-demo]**

[live-demo]: http://appacademy.github.io/curriculum/asteroids/index.html

## Overview

We'll decompose the Asteroids game into the following classes/sourcefiles. All
of the following will be located in the `src` directory which we will talk about
in a moment:

- `Util` (`src/utils.js`)
  - Utility code, especially vector math stuff.
- `MovingObject` (`src/moving_object.js`)
  - Base class for anything that moves.
  - Most important methods are `MovingObject.prototype.move`,
    `MovingObject.prototype.draw(ctx)`,
    `MovingObject.prototype.isCollidedWith(otherMovingObject)`.
- `Asteroid` (`src/asteroid.js`)
  - Spacerock. It inherits from `MovingObject`.
- `Bullet` (`src/bullet.js`)
  - Kill spacerocks with this. Also a `MovingObject` subclass.
- `Ship` (`src/ship.js`)
  - This is you! Another `MovingObject` subclass.
- `Game` (`src/game.js`)
  - Holds collections of the asteroids, bullets, and your ship.
  - `Game.prototype.step` method calls `Game.prototype.move` on all the objects,
    and `Game.prototype.checkCollisions` checks for colliding objects.
  - `Game.prototype.draw(ctx)` draws the game.
  - Keeps track of dimensions of the space; wraps objects around when they drift
    off the screen.
- `GameView` (`src/game_view.js`)
  - Stores a `Game` instance.
  - Stores a `canvas` context to draw the game into.
  - Installs key listeners to move the ship and fire bullets.
  - Installs a timer to call `Game.prototype.step`.

## Important Note Regarding ES6

**Do not use ES6 class syntax in this project.** Understanding prototypal
inheritance is the main focus of today's project. Because ES6 class syntax
obscures how prototypal inheritance works, and has some incompatibilities with
the instructions below, avoid using it while working today. Ask your TA for a
more nuanced explanation of this if you need more information.

## A Refresher on Vectors

You'll use a lot of **vectors** in this assignment.

2D vectors have an `x` and a `y` component. A position vector has an `x` and `y`
position, while a velocity vector has a speed in the `x` and the `y` directions.

#### Distance

To find the "distance" between two points, the formula is:

```
// this is math, not JavaScript
Dist([x_1, y_1], [x_2, y_2]) = sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)
```

#### Norm

A vector has a **norm**, a.k.a. **magnitude** or **length**. The norm of a
velocity vector is a speed. If `obj.vel = [3, 4]` (3 horizontal pixels and 4
vertical pixels per unit time) then the overall speed is 5 pixels per unit time.
You can easily calculate the norm of a vector using your distance function:

    Norm([x_1, y_1]) = Dist([0, 0], [x_1, y_1])

## Phase 0: `index.html`

We'll start by creating a directory named `dist`. Inside this `dist` directory
we'll create an `index.html` file for your game to run in. In the body of this
file, add a `<canvas id="game-canvas">` tag with sensible default width and
height properties. Open your `index.html` in your browser and use the browser's
JavaScript console to test your code as you go.

## Phase 1: `index.js` (your entry point for webpack and all your JavaScript)

As stated in the Overview, you will create classes and objects in different
files and they will need to interact with one another. When using JavaScript in
the browser there is no standard, native way to have one file require another.
Webpack will allow us to use `require` and `module.exports` syntax to import and
export our classes and objects from different files.

Let's start by making sure our computer has `webpack` and `webpack-cli`
installed globally by running `npm install -g webpack webpack-cli`. In the
future we will create more specific configurations for webpack - but this will
work just fine for your work on today's project. Webpack follows some common
conventions that we will follow to ensure webpack is able to locate our entry
file. To do this you'll make a `src` directory on the top level of our file tree
(same level as the `dist` directory). Within the `src` directory create a
`index.js` file (this will be webpack's entry point). Make sure your file set up
matches `src/index.js` exactly (naming matters for [webpack][webpack-index]).

`index.js` will serve as the entry file for your project. Running
`webpack --watch --mode=development` in your terminal will create a
`dist/main.js` file for you that loads your `index.js` file, any files
`index.js` requires, and any files that those files require! Webpack also
doesn't add anything to the window without you explicitly declaring it.

Once you've run your webpack command you should be able to locate your
`dist/main.js` file and add it in a script tag to your `index.html` **below your
canvas element** (we'll come back to this point later).

**Test:** Add a `console.log("Webpack is working!")` to your entry point file to
make sure you are running webpack correctly.

[webpack-index]: https://github.com/webpack/webpack.js.org/issues/2035

## Phase 2: `MovingObject` and `Asteroid`

### `MovingObject`

Write a `MovingObject` class in `src/moving_object.js`.

Store key instance variables:

- 2D `pos`ition.
- 2D `vel`ocity.
- `radius` (everything in the game is a circle).
- `color`

Rather than pass all these as separate arguments, write your `MovingObject`
constructor function so that you can pass in an options object:

```js
const mo = new MovingObject({
  pos: [30, 30],
  vel: [10, 10],
  radius: 5,
  color: "#00FF00"
});
```

**Test:** Verify that your MovingObject constructor works as expected. In order
to access your MovingObject constructor in your browser's console you will need
to first export it using `module.exports`, then require `moving_object.js` in
your entry file, then declare the constructor function on the window. Look at
the snippets below as a guide and then make sure you can create a MovingObject
in your console!

```js
// moving_object.js
function MovingObject() {
  // your code
}

module.exports = MovingObject;
```

```js
// index.js
const MovingObject = require("./moving_object.js");

window.MovingObject = MovingObject;
```

Write a `MovingObect.prototype.draw(ctx)` method. Draw a circle of the
appropriate `radius` centered at `pos`. Fill it with the appropriate `color`.
Refer to the Drunken Circles demo if you need a refresher on Canvas.

In the `index.js`, add an event listener for the
[`DOMContentLoaded`][dom-content-loaded] event. Within the callback, use
`document.getElementById()` to find the canvas element. Call `getContext` on the
canvas element with "2d" as the argument to extract a canvas context. Now that
you're using a `DOMContentLoaded` callback you can safely move your `main.js`
script tag in `index.html` into the `<head>` where it belongs.


[dom-content-loaded]:
  https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded#Example

**Test:** Make sure you can draw a `MovingObject`.

Write a `MovingObject.prototype.move` method. Increment the `pos` by the `vel`.

### Util

We want to allow our classes to inherit from another. We could monkey-patch
`Function` to add an `inherits` method:

```js
Function.prototype.inherits = function (ParentClass) { ... };
```

However, monkey-patching can cause problems and should be done judiciously.
Instead, let's create a general utilities module in `src/util.js` and add our
first utility function to it as
`Util.inherits = function (childClass, parentClass) { ... }`.

**Note:** You should export a POJO (plain old JavaScript object) from Util, not
a class or constructor function. We don't need to create instances of `Util`.

```js
const Util = {
  inherits(childClass, parentClass) {
    //...
  }
};

module.exports = Util;
```

Below is the same above, but written with ES6 for cleaner syntax.

```js
const Util = {
  inherits: function inherits(childClass, parentClass) {
    //...
  }
};

module.exports = Util;
```

### Asteroid

Write an `Asteroid` class in a `src/asteroid.js` file. This should inherit from
`MovingObject`.

Pick a default `COLOR` and `RADIUS` for `Asteroid`s. Set these as properties of
the `Asteroid` class: `Asteroid.COLOR` and `Asteroid.RADIUS`.

Write your `Asteroid` constructor so that the caller specifies the `pos` and
calls the `MovingObject` constructor, setting `color` and `radius` to the
`Asteroid` defaults, and choosing a random vector for `vel`. Use the following
helper functions from the Util object to help you create a random vector.

```js
// Return a randomly oriented vector with the given length.
const Util = {
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};
```

```js
// Other properties are filled in for you.
new Asteroid({ pos: [30, 30] });
```

Why do we still need to call `MovingObject`'s constructor function from within
`Asteroid`'s constructor function?

Our `inherits` function sets up the prototype inheritance chain, which makes
methods available on the parent's prototype available to instances of the child
class. However, we still need to call `MovingObject`'s constructor function from
within `Asteroid`'s constructor function to access the code that sets properties
such as `this.pos` and `this.vel`. Its the equivalent to calling `super` in a
class's `#initialize` method in Ruby.

**Note:** Invoking an ES2015 class constructor without `new` (such as
`MovingObject` with `call()`) throws an error. Hence the need to use ES5 syntax
for this project.

**Test:** Make sure you can create and draw an Asteroid.

### Game

`Game` will be in charge of holding all of our moving objects. It will also
contain the logic for iterating through these objects and calling their
corresponding `move` methods.

Write a `Game` class in `src/game.js`. Define the following constants on the
`Game` class: `DIM_X`, `DIM_Y`, and `NUM_ASTEROIDS`.

Write a `Game.prototype.addAsteroids` method. Randomly place the asteroids
within the dimensions of the game grid. You may also wish to write a
`Game.prototype.randomPosition` method. Store the asteroids as a property of
your game instance in an array `asteroids`. Call `addAsteroids` in your
constructor.

Write a `Game.prototype.draw(ctx)` method. It should call `clearRect` on the
`ctx` to wipe down the entire space. Call the `draw` method on each of the
`asteroids`.

Write a `Game.prototype.moveObjects` method. It should call `move` on each of
the `asteroids`.

### GameView

Your `GameView` class will be responsible for keeping track of the canvas
context, the game, and the ship. Your `GameView` will be in charge of setting an
interval to animate your game. In addition, it will eventually bind key handlers
to the ship so that we can move it around.

Define an `GameView` class in `src/game_view.js`. The `GameView` should store a
`Game` and take in and store a drawing `ctx`.

Write a `GameView.prototype.start` method. It should call `setInterval` to call
`Game.prototype.moveObjects` and `Game.prototype.draw` once every 20ms or so.

### Back to your entry file

Once you have your `GameView` set up, construct a `GameView` object and call
`GameView.prototype.start` within the `DOMContentLoaded` callback in `index.js`.

This is your webpack entry point, so restart webpack and make sure everything is
working properly.

Your asteroids should fly around :-)

## Phase 2a: Wrapping Asteroids

Currently your asteroids slide off the screen. We'd like to keep everything
within the dimensions of the game's rectangular view by mapping opposite sides
of the grid view. If an asteroid scrolls off one side, it should reappear on the
other. Write a `Game.prototype.wrap(pos)` method, which takes a `pos` in and
returns a "wrapped position".

Next, change your calls of `new Asteroid` to pass in the `game` as one of the
`options`. In `MovingObject`, store the `game`. Update your
`MovingObject.prototype.move` method to call `Game.prototype.wrap` on `this.pos`
each time.

Check that your `Asteroid`s don't all fly away, but instead, wrap like they are
supposed to.

## Phase 2b: Colliding Asteroids

A big part of Asteroids is the collision of objects: ships collide with
asteroids, bullets collide with asteroids. To start, let's implement asteroids
colliding with asteroids.

Write a `MovingObject.prototype.isCollidedWith(otherObject)` method. Two circles
have collided if the distance between their center points is less than the sum
of their radii.

Next, write a `Game.prototype.checkCollisions` that iterates through the
asteroids and `alert("COLLISION");` whenever two collide. Make sure not to check
if an asteroid collides with itself.

Write a `Game.prototype.step` method, which calls `Game.prototype.moveObjects`
then `Game.prototype.checkCollisions`. Call this in `GameView.prototype.start`
instead of `moveObjects` directly.

**Check your work**. This shouldn't be too hard if you reduce
`Game.NUM_ASTEROIDS = 4` or so.

Last: when an asteroid crashes into another, let's remove both asteroids. Write
`Game.prototype.remove(asteroid)` and
`MovingObject.prototype.collideWith(otherObject)`. In
`MovingObject.prototype.collideWith(otherObject)`, call `Game.prototype.remove`
on both objects.

We'll change this soon, but we want to have collision and removal logic working.
**Check that when two asteroids collide, they both go away**.

## Phase 3a: `Ship`

In `src/ship.js`, write a `Ship` class; this should be another subclass of
`MovingObject`. Define `Ship.RADIUS` and `Ship.COLOR` as before. I default
initialize the `vel` to the zero vector.

In your `Game` constructor, build a `Ship` object. I used
`Game.prototype.randomPosition` to place the `Ship`. Save your ship to an
instance variable.

I wrote a `Game.prototype.allObjects` method that returned the array of
`Asteroid`s + the ship. I iterated through this in `Game.prototype.draw`,
`Game.prototype.moveObjects`, and `Game.prototype.checkCollisions`

Update the `MovingObject.prototype.collideWith(otherObject)` logic. Stop
removing colliding asteroids; your `MovingObject.prototype.collideWith` should
be empty. Instead, overwrite the superclass's method with
`Asteroid.prototype.collideWith(otherObject)`: if `otherObject instanceof Ship`,
call `Ship.prototype.relocate`. The `Ship.prototype.relocate` method should
reset the `Ship`'s position to `game.randomPosition()` and reset velocity to the
zero vector.

## Phase 3b: Moving the ship

Add a `Ship.prototype.power(impulse)`. The impulse should be added to the
current velocity of the ship.

Add a `GameView.prototype.bindKeyHandlers` method. Check out the
[`keymaster`][keymaster] library. You should include `keymaster.js` in your
javascripts folder and use a `script src` tag to require it above your `main.js`
file. The `keymaster` library will expose a global method `key` which takes a
key and a callback that will be triggered when the key is pressed. Use it to
bind keys to call `Ship.prototype.power` on the game's `ship`. Call your
`bindKeyHandlers` method in `GameView.prototype.start`.

[keymaster]: https://github.com/madrobby/keymaster

## Phase 4a: Firing `Bullet`s

Write a `Bullet` subclass of `MovingObject`. The idea is that when a
collides with an `Asteroid`, we'll remove the `Asteroid` from
the `Game`.

The key is `Ship.prototype.fireBullet`. This should:

0. Construct a new `Bullet` instance.
1. You will want to use the `Ship`s `vel` as the direction of travel of the
   bullet.
1. Add the bullet to an array of `Game` bullets.

`Game` should store an array of `Bullet`s just like `Asteroid`s. To make my life
easier, I wrote a `Game.prototype.add(obj)` method that added to
`this.asteroids`/`this.bullets` if
`obj instanceof Asteroid`/`obj instanceof Bullet`. I wrote a similar
`Game.prototype.remove(obj)` method. This was easier than having two methods
each for `Asteroid` and `Bullet`.

Update your `Game.prototype.allObjects` as well.

Update `GameView.prototype.addKeyBindings` to bind a key to
`Ship.prototype.fireBullet`.

## Phase 5: Cleaning up objects

Your `Bullet` should not wrap like other objects. When it leaves the visible
grid, it should be removed.

Write a `Game.prototype.isOutOfBounds(pos)` to return `true` if an object slips
off screen.

Define a property `MovingObject.prototype.isWrappable = true`. However, you can
overwrite this in `Bullet` to be false.

In `MovingObject.prototype.move`, after updating the position, check if the
object is out of bounds. If so, either (A) wrap the object if it `isWrappable`
or (B) call `Game.prototype.remove` if not.

## Phase 6 (Bonus): Drawing an image

Oftentimes people want to draw a background image on their game.

```javascript
const img = new Image();
img.onload = function() {
  ctx.drawImage(img, xOffset, yOffset);
};
img.src = "myImage.png";
```

Note you may have to redraw the background for each iteration. You do not need
to constantly reload the `img`; just make sure to `ctx.drawImage` each frame.

## Phase 7 (Bonus): RequestAnimationFrame

We are going to have our game use `requestAnimationFrame`. Go to the console and
type this in. Notice that it is the global namespace. It provides a better way
to do animations. Read more [here][requestAnimationFrame].

### Phase 7b: MovingObject

Rewrite your `move` method, this time allowing it to take in a `timeDelta`.
Increment the `pos` by the `vel * delta`. The delta will be created in the
GameView's `animate` method based on the time variable provided by
`window.requestAnimationFrame`. Until we define that method, default `delta` to
a value of 1. You can default a value using the logical OR operator
`delta = delta || 1`.

### Phase 7c: Game

Refactor your `Game.prototype.moveObjects(delta)` method. It should the `delta`
to each `Asteroid.prototype.move`.

### Phase 7d: GameView

The `GameView` should now store a `lastTime` instance variable. It will be used
to derive the delta (default it to `0`).

Write a `GameView.prototype.animate` method. It should:

- Create a `delta` variable. It represents the difference between the last time
  `animate` was called and the current call to `animate`. The current time will
  be passed to the animate function as a parameter.

- Call `requestAnimationFrame`, passing in the `GameView.prototype.animate`.
  Yes, this is recursive. Each frame calls the next.

- Call `Game.prototype.moveObjects(delta)` and `Game.prototype.draw(ctx)`

- Update `this.lastTime` to be equal to the current time;

Refactor your `GameView.prototype.start` method. It will make the first call to
`requestAnimationFrame`, passing in the `GameView.prototype.animate`.

**NB**: You'll notice that all of your moving objects are moving way too fast.
Go back to `MovingObject.prototype.move` and divide the delta by some number
before adding it to the velocity. Your code might look something like:

```js
const velX = (this.vel[0] * delta) / 20;
const velY = (this.vel[1] * delta) / 20;

this.pos = [this.pos[0] + velX, this.pos[1] + velY];
```

## Resources

- [Canvas tutorial](https://developer.mozilla.org/en-US/docs/HTML/Canvas/Tutorial)
- [Canvas docs](https://developer.mozilla.org/en-US/docs/HTML/Canvas)

[requestAnimationFrame]: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
