
## CSS Syntax

#### Watch:
Password: `go_video_go`
  * [01 Syntax][01-css-syntax] ([code][01-css-syntax-html]).

[01-css-syntax]: https://vimeo.com/151185331
[01-css-syntax-html]:  https://assets.aaonline.io/fullstack/html-css/demos/css_demos/lectures/01-css-syntax.zip

### Takeaways
```css
selector {
  property: value;
}
```

#### Selector precedence
1. **!important** -> `a { color: red !important }`
2. **inline style** -> `<div style="color:green;"></div>`
3. **id** -> `#cat`
4. **class** or pseudo-class -> `.cats`
5. **element** or pseudo-element -> `h1`

#### General Rules:

- The more specific selector wins
- If equally specific, the last declared one wins
- Styles cascade, if not overwritten
- Avoid !important, inline styles, and id selectors. They do not lead to dry,
  maintainable code.
- You can apply your styles to multiple selectors at once by separating them by
  commas: `selector1, selector1 { property: value; }`