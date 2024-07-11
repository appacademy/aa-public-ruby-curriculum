# CSS

**TODO**: this chapter is a work in progress.

CSS is a style sheet language, it lets you define styles for you HTML document.

The syntax of a single style declaration in your stylesheet is as follows:

```css
selector {
  property: value;
}
```

The **values** of the **properties** apply to any HTML elements that match the given **selector**.

Real world example of styling a `<p>` element:

```css
p {
  font-family: sans-serif;
  font-weight: bold;
  color: blue;
}
```

This will display all `<p>` elements in blue and bolded, in a sans serif font.

You can have as many style declarations as you wish in a CSS document. You may encounter situations where several selectors match the same element. This is not a problem, and in fact, is a feature, explaining the C of "cascading" in CSS.

The way cascading works, is that all the set properties for any matching selectors get applied to the element. Whenever there are two similar properties set, but with different values, the property of the most specific selector wins. If both selectors are equally specific, the last declared selector wins.

Example of cascading:

```css
span {
  font-style: bold;
  color: yellow;
}

div > span {
  color: blue;
}
```

Now all `<span>` elements that are a direct descendant of a any `<div>` will be bolded and blue. Because the color declared in the selector `div > span` is more specific than `span` it will be the winning property, overriding the earlier declared color yellow.

With browsers innovating and moving at a rapid pace, many shiny new CSS properties have been introduced in just the last few years. These will allow you to make many a fancy design. However, before you dig in to those, it is really important to know the bread and butter core properties that are neccessary to build a solid layout.

After reading this document, you should check out W3's great reference of the core [CSS 2.1 properties][w3-css-props]. When you're ready to dive into the more advanced CSS 3 properties check out Mozilla's [MDN CSS Reference][mdn-css-ref]. Finally, if you want to check whether certain of these new properties are supported, [Can I Use][can-i-use] is a great website tracking the current state of the browser support landscape.

[w3-css-props]: http://www.w3.org/TR/CSS21/propidx.html
[mdn-css-ref]: https://developer.mozilla.org/en-US/docs/CSS/CSS_Reference
[can-i-use]: http://caniuse.com/

## Selectors

* `elements` You can directly select html elements by stating their name. Example: to select all `<p>` elements, use `p`.
* `id` Because id's should be unique, you can single out a single specific tag using the id, using a `#` sign. Example: given `<h1 id="logo">` you can reference it as `#logo`.
* `class` Classes are used to group logical groups of elements together for styling purposes. You reference a class with a `.` period. Example: given `<div class="shoes">` you can reference it as `.shoes`.
* `attributes` 

* `space`
* `>`
* `+`
* `:first-child`

Resources:
* http://www.w3.org/TR/CSS21/selector.html#pattern-matching
* http://net.tutsplus.com/tutorials/html-css-techniques/the-30-css-selectors-you-must-memorize/

## Pseudo Content

* `:before` / `:after`
* `content: "..."`

CSS allows you to insert tiny bits of content at the beginning and end of each element, using pseudo content. It uses a combination of either the `:before` or `:after` selector, and the property `content: "..."`. You must use these together in order for pseudo content to work.

The original intent was to allow designers to specify things like the quotation marks of a quote. For instance, if you'd like to use french quotes for your `blockquote` elements, you could do the following:

```css
blockquote:before {
  content: "<<"
}

blockquote:after {
  content: ">>"
}
```

The `:before` and `:after` create imaginary inline elements at the beginning and end of the element, and additionally populate those elements with some content.

Given a `<div>Some content here</div>` in effect it gives us the same capabilities as this:

```html
<div>
  <span>The before content</span>
  Some content here
  <span>The after content</span>
</div>  
```

You can "abuse" or "repurpose" this feature by using the pseudo content with no actual content to create an empty box, which we can use to add additional styles to. For instance, we may want to create a little triangle pointer below a div.

Example of using pseudo content to draw a triangle:

```css
.box-with-triangle {
  position: relative;
  background: blue;
}

.box-with-triangle:after {
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  bottom: -20px;
  margin-left: -10px;
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 20px 20px 0 20px;
  border-color: blue transparent transparent transparent;
}
```


## Box model

* `width`
* `height`
* `padding`
* `border`
* `margin`

* http://www.w3.org/TR/CSS2/box.html
* http://css-tricks.com/the-css-box-model/
* https://developer.mozilla.org/en-US/docs/CSS/box_model

* `min-width` / `max-width`
* `min-height` / `max-height`

## Box sizing

If you want to make your life easier, you can use `* { box-sizing: border-box; }` to switch the box-sizing property to a more sensible box model default for every element on the page. The sets the width to **include** the border and the padding. This allows you to set the width to a percentage without having to do extremely hard calculations for borders and paddings.

Changing this property does have dramatic consequences, and might cause problems if you rely on pre-existing styles or frameworks like Bootstrap.

http://paulirish.com/2012/box-sizing-border-box-ftw/
https://developer.mozilla.org/en-US/docs/CSS/box-sizing

## Display

* `inline`
* `inline-block`
* `block`
* `none`

## Position

* `static`
* `relative`
* `position`
* `static`

## Float

* `float`
* `clear`

* http://css-tricks.com/all-about-floats/
* http://coding.smashingmagazine.com/2007/05/01/css-float-theory-things-you-should-know/

## Clearfix

    .group:after {
      content: "";
      display: table;
      clear: both;
    }

* http://css-tricks.com/snippets/css/clear-fix/
* http://nicolasgallagher.com/micro-clearfix-hack/


## Fighting browser styling

All browsers have some default styles set for all your HTML elements. So even if you haven't written any styles yet, your document looks somewhat reasonable. This is great, however, once you start writing your own styles you will soon notice that there are unknown forces at play adding padding and margin and other styling to your elements. Fighting this mysterious styling might drive you nuts.

Many developers therfore have decided that it is better to start with a blank slate. They wrote a `reset stylesheet` which strips all default styling, giving you a clear starting point. That way any design is completely intentional.

## Toggling state

* use classes