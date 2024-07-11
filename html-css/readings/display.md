# Display Types

A special CSS attribute one can give to any selector is `display`. The options
for `display` are `inline`, `block`, `inline-block`, `flex`, and `none`.

## Inline

Inline is the display type of most elements meant to be interspersed with text.
Examples include `a`, `strong`, `span` and `time`.

Inline elements always keep their "line height". This causes properties like
`margin` and `padding` to behave strangely. For example, if we write:

```html
/* CSS */
strong {
  background: yellow;
  padding: 10px;
}

/* HTML */
Lorem ipsum dolor sit <strong>amet, consectetur</strong> adipisicing elit, sed do eiusmod tempor incididunt...
```

This produces:

![Inline](https://assets.aaonline.io/fullstack/html-css/assets/images/inline-padding.png?raw=true)

These properties only push away other elements horizontally, not vertically. You
cannot specify `height` and `width` properties on inline elements.

_NB_: See how the text in our `strong` element is bold, even though we did not
specify a `font-weight` property in our CSS? This is an example of a User Agent
Stylesheet. Most browsers have default styling that applies to many elements.

## Block

Block elements differ from inline ones in that they do _not_ respect line
height. By default, block elements take up as much horizontal space as possible.
Additionally, they **do** respect `width` and `height` properties. Here's the
above example with the `display` type of our `strong` element changed.

```html
/* CSS */
strong {
  background: yellow;
  padding: 10px;
  display: block;
}

/* HTML */
Lorem ipsum dolor sit <strong>amet, consectetur</strong> adipisicing elit, sed do eiusmod tempor incididunt...
```

This produces:

![Block](https://assets.aaonline.io/fullstack/html-css/assets/images/block-padding.png?raw=true)

### Demo

Check out this [form demo][form_demo] ([code][form_demo_code]). Notice how the
CSS sets the inputs to `display: block` to override their default `inline-block`
behavior:

```css
.input > input {
  display: block;
  ...
}
```

This gives each text input its own line, growing to the width of its container.

[form_demo]: http://appacademy.github.io/css-demos/form.html
[form_demo_code]: https://assets.aaonline.io/fullstack/html-css/demos/css_demos/form.zip

## Inline block

Inline block elements are a combination of the block and inline elements. They
do remain inline, but they force elements around them to respect both horizontal
and vertical space. You can set the `width` and `height` properties of an inline
block element.

```html
/* CSS */
strong {
  background: yellow;
  width: 100px;
  height: 50px;
  display: inline-block;
}

/* HTML */
Lorem ipsum dolor sit <strong>amet, consectetur</strong> adipisicing elit, sed do eiusmod tempor incididunt...
```

This produces:

![Inline Block](https://assets.aaonline.io/fullstack/html-css/assets/images/inline-block.png?raw=true)

### Demo

Check out this [centering demo][center_demo] ([code][center_demo_code]). Note
the use of `display: inline-block` to make the `<ul>` respect its parent's use
of `text-align: center`:

```css
header {
  text-align: center;
}

ul {
  display: inline-block;
  ...
}
```

[center_demo]: http://appacademy.github.io/css-demos/center.html
[center_demo_code]: https://assets.aaonline.io/fullstack/html-css/demos/css_demos/center.zip

## None

`display: none` removes the content from the (visible) page. Note that the
element is still in the HTML and is viewable in the page's source. It just isn't
rendered.

## Flex

Flexbox (Flexible Box) provides a more efficient way to align elements and
distribute space through _flex containers_, i.e., parent elements that
automatically arrange and size their children.

This brings up two main categories for all Flexbox properties:

* "Properties for the Parent" (Flex Containers)
* "Properties for the Children" (Flex Items)

To make a parent element into a _flex container_, you simply give it the
`display: flex` property. This attribute makes all child elements _flex items_.
The size of each flex item is then calculated to always fit within the
container. The default direction of these elements is horizontal but can be
easily changed with `flex-direction`.

```css
/* Imagine this class is given to an element you want to be a flex container */

.container {
  display: flex;
  flex-direction: column;
}
```

The two most common flex properties of a flex container are probably
`justify-content` and `align-items`.

If all items of a flex container have set dimensions--either because their size
is fixed, their `flex-grow` attribute is set to 0, or they have reached their
maximum size--`justify-content` will determine how to distribute the remaining
space along the main axis. You can align all the flex items with the beginning
of the container, the end of the container, the center, etc. You can even
calculate the space between/around flex items to position them uniformly based
on their size.

![From CSS Tricks Flexbox Guide](https://css-tricks.com/wp-content/uploads/2013/04/justify-content.svg)

The `align-items` property is very similar to `justify-content` except that it
positions items along the cross-axis (perpendicular to the main axis).

![From CSS Tricks Flexbox Guide](https://css-tricks.com/wp-content/uploads/2014/05/align-items.svg)

Lastly, please read about the [flex property], which is shorthand for how a flex
item grows/shrinks compared with remaining items inside its container.

This is all you need and more to make great CSS layouts. For the remaining
properties, refer to the [CSS Tricks Flexbox Guide][flexbox-guide]. For
additional retention practice check out [Flexbox Froggy].

[flex property]: https://css-tricks.com/almanac/properties/f/flex/
[flexbox-guide]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[Flexbox Froggy]: https://flexboxfroggy.com/
