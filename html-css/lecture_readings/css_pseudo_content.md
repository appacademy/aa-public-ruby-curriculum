## CSS Pseudo Content

#### Watch:
  * [Pseudo Content][07-css-pseudo] ([code][07-css-pseudo-html])

[07-css-pseudo]: https://vimeo.com/151190178

[07-css-pseudo-html]: https://assets.aaonline.io/fullstack/html-css/demos/css_demos/lectures/07-css-pseudo.zip

#### Pseudo Content
- Used to inject content inside an element
- You can inject either *after* or *before* the present content inside an
  element
- Acts as inline elements inside element by default
- Can take any styling
- Needs a declared content property
- Content property can be a string or select an element's attribute
- Example of string content:
```css
h1:before {
  content: ":)";
}
```
- Example of attribute content:
```css
a:after {
  content: " (" attr(href) ")";
}
```