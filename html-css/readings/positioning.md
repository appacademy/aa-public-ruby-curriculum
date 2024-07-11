# Positioning

Another important property one can apply via CSS is the `position` property.
`position` has 5 options: `static`, `relative`, `absolute`, `fixed`, and
`sticky`.

## Static Positioning

This is the default position type of every element.

## Relative Positioning

`relative` positioning means that an element will be positioned **relative to
itself**, not relative to its parent. For instance, if you give `position:
relative` then `top: 10px`, the element will be moved down 10px from **where it
would normally appear**. Moreover, the space it would initially have taken up
will **still** be taken up. Observe:

```css
/* CSS */
strong {
  position: relative;
  background: yellow;
  top: 20px;
}
```

```html
<!-- HTML -->
Lorem ipsum dolor sit <strong>amet, consectetur</strong> adipisicing elit, sed do eiusmod tempor incididunt...
```

This produces:

![Relative top]

Note that if you don't give any `top`, `bottom`, `left`, or `right` properties,
`position: relative` does nothing to the element.

### Demo

Check out this [form demo][form_demo] ([code][form_demo_code]). Note how the
button becomes "depressed" when clicked by moving its relative position down by
a few pixels:

```css
.submit > input {
  position: relative;
  ...
}

.submit > input:active {
  top: 3px;
  ...
}
```

[Relative top]: https://assets.aaonline.io/fullstack/html-css/assets/images/position-relative.png
[form_demo]: http://appacademy.github.io/css-demos/form.html
[form_demo_code]: https://assets.aaonline.io/fullstack/html-css/demos/css_demos/form.zip

## Absolute Positioning

Absolute positioning gives you complete control over where an element
is positioned. The downside is that the element will not take up space
on the page. Observe:

```css
/* CSS */
section {
  position: absolute;
  background: yellow;
  top: 30px;
  left: 50px;
  width: 100px;
  height: 100px;
}
```

```html
<!-- HTML -->
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.

<section>
  Absolutely positioned!
</section>
```

This produces:

![Absolute]

As you can see, there is text under the absolutely positioned element. It acts
as if positioned "above" the page.

An important note: the `top`, `bottom`, `left` and `right` properties of an
absolutely positioned element are coordinates relative to their **nearest
ancestor element** that is **not** statically positioned. For example:

```css
/* CSS */
section {
  margin: 0px auto;
  width: 500px;
  background: yellow;
  position: relative;
}

article {
  background: blue;
  position: absolute;
  top: 10px;
  left: 100px;
}

h1 {
  background: red;
}
```

```html
<!-- HTML -->
<h1>Outside</h1>
<section>
  <h2>Section</h2>
  <article>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    culpa qui officia deserunt mollit anim id est laborum.
  </article>
</section>
```

This produces:

![Relative Absolute]

The absolutely positioned `article` element is 10px down and 100px right of the
relatively positioned parent `section` element.

### Demo

Check out this [positioning demo][positioning_demo]
([code][positioning_demo_code]). Note how the cat's glasses are positioned
absolutely with respect to their container in order to render over the cat's
eyes:

```css
.img-cat {
  position: relative;
}

.img-glasses {
  position: absolute;
  top: 190px;
  left: 80px;
  width: 400px;
}
```

[Absolute]: https://assets.aaonline.io/fullstack/html-css/assets/images/absolute-nospace.png
[Relative Absolute]: https://assets.aaonline.io/fullstack/html-css/assets/images/relative-absolute.png
[positioning_demo]: http://appacademy.github.io/css-demos/positioning.html
[positioning_demo_code]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/fullstack/html-css/demos/css_demos/positioning.zip

## Fixed Positioning

Fixed positioning is similar to absolute positioning with one key difference:
whereas `absolute` positions an element relative to its **nearest** positioned
ancestor, `fixed` positions an element relative to its **initial** containing
ancestor, usually the viewport. (As with `absolute`, the `fixed` property also
removes an element from the normal flow of the document so that the element does
not take up space on the page.)

To see this difference in action, try the following. First use absolute
positioning:

```css
/* CSS */
div {
  position: relative;
}

section {
  position: absolute;
  background: yellow;
  top: 30px;
  left: 50px;
  width: 100px;
  height: 100px;
}
```

```html
<!-- HTML -->
<div>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum.
<div>

<section>
  Absolutely positioned!
</section>
```

As expected, the absolutely positioned section appears 30px below and 50px to
the right of its nearest **positioned** ancestor, i.e., the "Lorem ipsum" `div`:

![Absolute Positioning]

> **Important**: For this behavior to work, you have to set the position of the
> "Lorem ipsum" `div` to something other than its default; absolute positioning
> ignores any elements with static positioning. Remember, too, that `position:
> relative` has no discernible effect if no offsets are specified.

Now change the position of the `section` element to `fixed`:

```css
/* CSS */
div {
  position: relative;
}

section {
  position: fixed;
  background: yellow;
  top: 30px;
  left: 50px;
  width: 100px;
  height: 100px;
}
```

```html
<!-- HTML -->
<div>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum.
<div>

<section>
  Fixed positioning!
</section>
```

The yellow box appears over the text again because it is now being positioned
relative to the viewport:

![Fixed Positioning]

For extra fun, try setting the `body` height to 1500px so your browser screen
will scroll. The element with fixed positioning will not scroll but the
absolutely positioned element will! (Why?)

## Sticky Positioning

Most modern browsers also recognize a `sticky` property of `position`. The
offsets for `sticky` elements refer to the nearest scrolling ancestor. Like
relatively positioned elements, a `sticky` element appears in the normal flow of
the document and will scroll in its proper place until it hits one of the
specified offsets. At that point, it becomes like an `absolute`/`fixed` element:
it will "stick" and remain in its location relative to the scrolling container,
now outside the normal flow of the document. This keeps `sticky` elements from
scrolling off of their container's portion of the screen. (If the container
itself scrolls off the screen, the `sticky` element will go with it.)

To see this behavior, use the following code:

```css
/* CSS */
section {
  position: sticky;
  background: yellow;
  top: 20px;
  left: 50px;
  margin: 10px;
  width: 100px;
  height: 100px;
}

.container {
  height: 1500px;
}
```

```html
<!-- HTML -->
<div class="container">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum.

  <section>
    Sticky positioning!
  </section>

  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum.
<div>
```

The yellow box appears between the two text snippets until it scrolls up to 20px
below the top of the container. At that point the box "sticks" in place until
its rightful position returns and scrolls down:

![Sticky Positioning]

[Absolute Positioning]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/fullstack/html-css/assets/images/Absolute-positioning.png
[Fixed Positioning]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/fullstack/html-css/assets/images/Fixed-positioning.png
[Sticky Positioning]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/fullstack/html-css/assets/images/sticky-positioning.gif
