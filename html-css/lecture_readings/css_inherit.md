## CSS Inheritance

#### Watch:
* [Inheritance][05-css-inherit] ([code][05-css-inherit-html])

[05-css-inherit]: https://vimeo.com/151190179
[05-css-inherit-html]:  https://assets.aaonline.io/fullstack/html-css/demos/css_demos/lectures/05-css-inherit.zip

#### Inherit Reading
- Setting a property to `inherit` will cause it to take its property value from its parent element
- You can leverage inherit to greatly DRY up our styles
- Example: if you set the font property on all `<article>` tags to inherit, then
  you only need to define the font once on the `<body>` tag to set all articles
  in the same font.
- Inherit makes sense on properties like `font`, `color`, `text-align`
- It does not make sense on properties like `margin`, `padding`, `border`,
  `background`. Can you explain why?