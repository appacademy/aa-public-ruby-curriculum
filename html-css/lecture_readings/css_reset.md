## CSS Reset

#### Watch:
  * [CSS Reset][06-css-reset] ([code][06-css-reset-html]).
 
[06-css-reset]: https://vimeo.com/151190181
[06-css-reset-html]: https://assets.aaonline.io/fullstack/html-css/demos/css_demos/lectures/06-css-reset.zip



#### User Agent Styles
- Browsers (also known as User Agents) have an internal stylesheet
- You see them in action when you have a plain HTML page without any declared
  styles
- They are sensible defaults, but differ slightly per browser
- This stylesheet is loaded before any of your declared styles

#### CSS Reset
- In order to be intentional about your own styles, you can *reset* the properties the
  User Agent Stylesheet declares.
- This prevents surprises and unexpected conflicts with the styles you write yourself
- Put your reset styles at the top of your stylesheet
- Resets consist of zero-ing out box-model properties and setting color and font
  properties to inherit
- You can be intentional and reset the exact tags that you use:

```css
html, body, section, article,
h1, h2, p, strong, em, a {
  margin: 0;
  border: 0;
  padding: 0;
  outline: 0;
  box-sizing: inherit;
  font: inherit;
  text-decoration: inherit;
  text-align: inherit;
  color: inherit;
  background: transparent;
}
```