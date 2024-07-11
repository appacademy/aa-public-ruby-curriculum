# Flappy Bird

## Overview

Today we are making the celebrated [Flappy Bird][bird-demo] using HTML canvas!
Give the real thing a shot to get a feel for how the game works. It is supposed
to be difficult (to play) so don't get too discouraged!

We will decompose the logic into three classes: `Game`, `Bird`, and `Level`.

## Getting Started

* Download the [skeleton][skeleton]
* run webpack using `webpack --watch --mode=development`
* when webpack is compiling your JS file correctly and loading in your browser move on

The skeleton has the following set up:

* A [canvas][canvas-info] with the `id` `bird-game` in our `index.html`
  * `width` of `640` and a `height` of `480` set on the canvas element
* An entry file `src/index.js`
* An [alert][alert-docs], just to check our JS is being loaded correctly
* A `script` tag in your html document to require the generated `dist/main.js`


[skeleton]: https://assets.aaonline.io/fullstack/javascript/projects/flappy_bird/skeleton.zip
[canvas-info]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
[alert-docs]: https://developer.mozilla.org/en-US/docs/Web/API/Window/alert

### `Game`

The game class will be the main class for the project. It will handle the logic
for the game, create the other classes, and tell the other classes when to
render.

* Our `Game` class receives the [canvas][canvas-info] HTML element as an
  argument
* `canvas.getContext("2d")` will return us an instance of the ['drawing
  context'][context-docs]. The drawing context will give us methods which will
  allow us to actually draw shapes on the page! This is the *most important*
  variable in this entire project. We will be passing this to all the other
  classes so they can draw pipes and birds and scores and everything on it!
* The dimensions of the canvas are stored as an instance variable

[context-docs]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext

### `Level`: Render

The `Level` class will be responsible for drawing the background and the
'pipes', which are the objects that the bird will be flapping through. The level
will control the logic for how the pipes move and how they are generated.

* The `Level` class, its constructor receives the dimensions from the `Game`
  class and stores them
* When invoked by the `animate` method, the `drawBackground()` method receives
  the context as an argument, then draws the background on the canvas using the
  [fillRect][fill-rect-docs] method to fills the entire canvas.  Feel free to
  replace "skyblue" with your desired background color. 

#### Notes on `animate()`

For many game/animation programs, it is common to see an `animate()` method.
Depending on the author, you might also see this called `animate` or `frame` or
`move`. The purpose of this function is to process the next 'frame' of
animation. The method in this case will move the obstacles, calculate the score,
and move the bird. Then, it will draw the objects on the canvas in their updated
positions.

The Game, Bird, and Level classes will each have an animate. The Game class will
be responsible for calling animate for the Bird and Level class to ensure all
parts of the game are updated and drawn appropriately

## Drawing the Background and 'Bird'

### `Game`: Drawing the background

* create an `animate` method in your `Game` class. For now, this method will
  only call `animate` on your `Level` class. (Don't forget to `import` Level!)
* as you may have noticed, we haven't created an instance of `Level` yet. Make a
  new method on `Game`, `restart`. `restart` will create a new instance of
  `Level` and store that as an instance variable.  Be sure to pass the
  dimensions of the canvas to the constructor of `Level`.
* Next, `restart` will call `animate` on the Game class which _should_ cause the
  background to be drawn to the screen! Be sure to pass the ever important
  context to `animate` in the `Level` when you invoke it in `restart`.
* Finally, it's time to see some color on that canvas! You need to do a few
  final things to make this happen:
  * `import` `Game` into `index.js`
  * find the canvas using `getElementById`
  * create a new instance of `Game` using the canvas you found
  * call `restart` to trigger the first render
  * do all this after the DOM has loaded

[fill-rect-docs]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect

### `Bird`

* create a new class, `Bird`
* the bird should start with a velocity instance variable of 0 (it can only move
  up and down)
* the constructor should take the dimensions of the canvas as arguments, and
  store them as instance variables. Create instance variables for the position
  of the bird. Set the bird in the middle of the canvas, vertically, and 1/3 of
  the way from the left edge of the canvas.
* write a `drawBird` method. This should receive the `context` as an argument
  and draw onto it the bird. I drew the bird as a yellow 40x30 rectangle, which
  looked fabulous. You will use exactly the same methods, `fillRect` and
  `fillStyle`, as in the `Level`.
* write an `animate` method, for now it should simply draw the bird

### `Game`: Adding the Bird

* store an instance of `Bird` as an instance variable in the `restart` method
* add a call to `animate` the bird in the `Game` `animate` method. Make sure to
  `animate` the bird AFTER the level, or the level will be drawn on top of the
  bird.
* add a call to `restart` to the constructor
* when you are rendering a bird and a level, move on.

## Game Principles: 'Realistic' Bird Motion

The motion of the bird is quite simple: for every frame, the bird's position
changes by the current value of its velocity. If the bird's position at time A
is 50 and the velocity is 1, at time B the position will be 51. A velocity of 1
means that for every `animate` the bird's vertical position will be increased by
one. At 60 frames per second, the bird will descend 60 pixels in one second. A
velocity of `-1` will produce a bird that rises at 60 pixels per second.

The bird is also affected by gravity. Gravity is quite simple to model in code.
Where the position of the bird is changed by the current value of velocity at
each `animate`, the `velocity` is changed by the constant value of gravity at
every animate. For example: at time A if the velocity of the bird is 1 and the
gravity constant is set to 0.5, at time B velocity will be 1.5.

The final force that changes the bird's velocity and position is the flap of the
wings. When the bird flaps its wings, the velocity is set to some value, around
`-8`, 8 pixels *up* per frame (zero is the top). This is different from a real
bird where the velocity wouldn't just instantly change, that would be
impossible. In spite of the violation of Newton's laws, it makes the game fun
and that's what really matters.

### `Bird` motion

* write a `move` method for the bird. This will be called for every `animate`.
  Add `this.y` of the bird to its current `this.velocity`.
* add the Gravity value `0.5` (or whatever you prefer) to the `velocity`
* add a `flap` method, this should set the `velocity` of the bird to some
  constant value. I used -8.
* call the `move` method from within `animate` in the `Bird` class before
  drawing the bird.
* don't expect the bird to move yet, we haven't implemented an animation loop
  yet!

### Game Principles: Tunability

The mechanics of a game, especially a physics-based game such as Flappy Bird,
make or break the pleasure of playing. So, the game should be designed so that
the actual physics and experience can be _tuned_. There are many 'constant'
values that affect the game: the gravity value, the speed of the bird after a
flap, the terminal velocity of the bird, the speed of the pipes, width of the
gap, distance of the gap, etc.

A game designer should factor these constants out so they can be easily tweaked
and their effects observed. Design your code with the principle of tunability in
mind and you will be well on your way to making an excellent experience for your
players.

So what does this mean for you? Identify the constants and pull them out of your
code. Look through your code: any time you see a number that isn't `0` or `1`
being used, that should probably be a constant!

You probably have something like this:

```JavaScript
  this.position += this.velocity;
  this.velocity += 0.5;
```

That's fine, but in a couple of days you will look at this and think: where does
`0.5` come from?

Instead, it could be like this:

```JavaScript
  this.position += this.velocity;
  this.velocity += CONSTANTS.GRAVITY;
```

Now it's much clearer what's happening and why, and if you follow this practice
you end up with a dashboard of tunable variables, like this:

```JavaScript
const CONSTANTS = {
  GRAVITY:  0.8,
  FLAP_SPEED:  -8,
  TERMINAL_VEL:  12,
  BIRD_WIDTH:  40,
  BIRD_HEIGHT:  30
};
```

### `Game`: Animation

* add a `play` method to the game class. This should set an instance variable,
  `this.running` to `true` and call `animate`.
* return to your `restart` method. Add to the existing functionality an
  assignment of `running` to `false`.
* Currently, `animate` runs once and returns. We want to make it loop and keep
  animating if the game is running. At the end of `animate` call
  `requestAnimationFrame` and pass `animate` as an argument if the game is
  running
* At this point, your bird should quickly drop out of view each refresh
* Make a method, `click` to handle the logic when the canvas is clicked. The
  method should call `flap` on the bird. If the game is not running, the game
  should call `play` first before calling flap.
* [add an `eventListener`][events-docs] to the canvas for `mousedown`. When the
  event occurs, call `click`. Your bird should now be able to fly.
* *hint*: your event handler function will need to use `bind` to keep track of
  the context

[events-docs]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

## Pipes

Great work, you've made it really far! At this point you should have a flapping
flying bird before you. The work from here is more challenging, but I know you
can do it!

### `Level`: Obstacles

* Return to `Level`. It should store an array of 3 objects representing the
  current `pipes`. As you see in the real flappy bird linked in the overview,
  there are never more than 3 pipes on the screen at the same time. Therefore,
  we won't need to keep track of more than 3 pipes at once.
* A pipe is merely an `x` coordinate and the top of the gap between the pipes.
  The horizontal spacing between pairs of pipes never changes and the gap
  between a pair through which the bird will flap also remains _constant_.
* the distance between pairs of pipes is 220 pixels
* the gap through which the bird will fly is 150 pixels.
* initialize the `Level` with three pipes, 220 pixels apart
* write a `movePipes` method. It should move all the pipes by a constant amount
  so they will appear to slide across the screen. When a pipe has slid all the
  way off, remove it from the array and add a new pipe to the end of the array.
  The new pipe's gap should be randomly generated.
* write a `drawPipes` method, this should draw the pipes on the canvas using
  `fillRect` and `fillStyle`.
* if your methods are getting long and complicated, factor them into helper
  methods
* finally, return to the `animate` method. This should `drawBackground`,
  `movePipes`, and `drawPipes`. You will be passed the `context` as an argument
  and pass it to `drawPipes` and `drawBackground`.

### `Game`: Tying it all together

* when the bird flaps and the pipes slide by, move on

## Collisions

* in the `animate` function of the game we need to see if the bird is colliding
  with any of the pipes
* write a `getBounds` method on the `Bird` which returns an object containing
  the top left and bottom right coordinates of the bird
* write a `collidesWith` function in `Level` pass in the `bounds` of the bird as
  an argument. It should return true if any pipe intersects the bird.
* in `Game` if the `Bird` ever `collidesWith` the `level` OR if the `Bird` flaps
  off the screen, `alert` the player and `restart` the game.

## Score

* finally, when the `Bird` fully passes a pipe, the player's score should
  increase by 1
* display on the canvas the current score at all times
* reset the score when the bird crashes

## Bonus

* actual art instead of rectangles
* once we start using actual art, we may run in to issues because it takes time
  for these big assets to load. Implement a loading bar so we can be sure our
  assets have finished loading.
* make a sweet slow moving background to create the illusion of travel
* sound
* increasing difficulty

[bird-demo]: http://flappybird.io/
