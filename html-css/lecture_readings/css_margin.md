## CSS Margin

### Watch:
  * [Margin][04-css-margin] ([code][04-css-margin-html])
[04-css-margin]: https://vimeo.com/151190180
[04-css-margin-html]:  https://assets.aaonline.io/fullstack/html-css/demos/css_demos/lectures/04-css-margin.zip



#### Margin Reading

- Margin is like private space, it collapses
- Margin is see-through, not part of element
- Margin cannot be given background, not part of element
- Margin can be set to auto to distribute left and right margin space
- Margin can be negative, pulling the element and any that follow in the
  negative direction
- Weird gotcha: margins push through top and bottom of any direct ancestor
  elements that do not have a border or padding, or their overflow set to
  visible

#### When padding, when margin?

- Padding is part of an element, margin is not
- Margin collapses, padding always takes up space
- As part of the element, padding can have a background; margin is always
  see-through