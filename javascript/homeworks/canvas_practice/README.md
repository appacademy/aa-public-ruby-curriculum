# Introduction to Canvas

Many students end up using Canvas for later projects. This exercise explores how
Canvas works at a basic level. It will give you an introduction to using canvas
to draw shapes on a page.

## Phase I: Setting up your Canvas Element

The [skeleton provided][skeleton] contains an `index.html` that has been filled
in for you. Notice that there is a `canvas` element that has been included in
the body. This is the element that we will be working with. By default, the
canvas element has a width of 300px and a height of 150px.

In the `practice.js` file, we have added an event listener that waits for the
document to be loaded before looking for the canvas element. FYI, the
`solution.js` is also within the zip file, so no peeking until you finish!

Create a [2D rendering context][CanvasRenderingContext2D]:

1. Grab the `canvas` element by id and save it to a variable
2. Set the `height` and `width` attributes of the canvas to `500`
3. Call `getContext` on the canvas with `'2d'` as an argument and save the
   return value as `ctx`
  * You will be setting attributes and calling methods on `ctx` for the rest of
    this exercise

## Phase II: Draw a Rectangle

1. Pick a color (e.g. `'red'`, `rgb(255,255,255)`, etc. ) to set as the
   `fillStyle` attribute for `ctx`
2. Call [`fillRect`][fillRect] with the appropriate dimensions to draw the
   rectangle on the canvas
3. Check that everything works by executing `open index.html` in your
   terminal

## Phase III: Draw a Circle

To draw the circle:

1. Invoke [`beginPath`][beginPath] with no arguments
1. Invoke [`arc`][arc] with the appropriate dimensions to draw a circle
1. Pick a color to set as `strokeStyle`
1. Set the `lineWidth` attribute to some integer
1. Invoke `stroke` with no arguments
1. Open `index.html` in your browser to view it

To fill in the circle:

1. Pick a color to set as `fillStyle`
1. Invoke `fill` with no arguments
1. Open `index.html` in your browser to view it

## Phase IV: Draw your Favorite Shape!

See [here][shapes] for inspiration. Also review these [examples][animation] of
how to animate your drawings.

[CanvasRenderingContext2D]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
[fillRect]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
[beginPath]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
[arc]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
[shapes]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
[animation]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
[skeleton]: https://assets.aaonline.io/fullstack/javascript/homeworks/canvas_practice/canvas_practice.zip
