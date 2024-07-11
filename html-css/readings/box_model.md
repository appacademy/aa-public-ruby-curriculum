# The Box Model

_Everything_ rendered on the DOM is a box. Every `header`,
`div`, and `article` (along with every other tag!) is a box. Every box
has three major properties: `padding`, `border`, and `margin`.

![Box Model](https://assets.aaonline.io/fullstack/html-css/assets/box_model.png?raw=true)

The overall width of a box is given by `border-left + border-right +
padding-left + padding-right + content`, where `content` is the inner
blue box in the picture. As usual these properties can be specified with CSS:

```css
header {
  /* The order is ATTRIBUTE: top right bottom left */
  /* That's clockwise, for those of you who like clocks */

  padding: 5px 10px 5px 10px;
  margin: 0px 0px 0px 0px;
  border: 1px solid black;
}
```

If you specify `width` in the selector, `border` and `padding` are
**added** to the width you specify.

As a demo, open up your inspector in chrome, and navigate to the
"Elements" tab. Right click the `head` tag and click "Edit as HTML."
Add the following to see borders around every box on the page:

```html
<style>
  * {
    border: 1px solid red;
  }
</style>
```

## Margin

Margin is the only property of `margin`, `border`, and `padding`
that does _not_ affect the size of the box itself. Instead margin is
the "private space" a box needs around it. For example, if you set
`margin-left: 50px` on a tag, then the box that tag renders will have
nothing in the 50px to the left of it. The box will "move itself over"
to ensure that this space is respected.

Margin is not additive. This means if two boxes next to each other
request 50px of margin, there will be 50px between them, not 100px.

## Padding

Padding is between the content of a box and the border of a box.

## Border

Border is between the padding of a box and the margin of a box.
