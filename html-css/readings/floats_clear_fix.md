# Floating

Floating is a CSS positioning property different from `position` discussed separately in the curriculum. You should never have both `float` and `position` attributes specified on the same element.

You can think of `float` like images in magazines that have text
flowing around them. For example:

```html
/* CSS */
section {
  float: left;
  width: 100px;
  height: 100px;
  background: yellow;
}

/* HTML */
<section></section>
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.
```

Produces:

![Basic float](https://assets.aaonline.io/fullstack/html-css/assets/images/basic-float.png)

Floating elements are extremely useful for building layouts, as it
allows us to align elements horizontally. For example, we may float
several elements next to one another:

```html
/* CSS */
nav {
  float: left;
  background: yellow;
  height: 200px;
  width: 75px;
  margin: 20px;
}

section {
  float: left;
  background: pink;
  width: 400px;
  height: 100px;
  margin: 20px;
}

/* HTML */
<nav>Sidebar</nav>
<section>Content Box</section>
```
Produces:

![Float to position](https://assets.aaonline.io/fullstack/html-css/assets/images/float-position.png?raw=true)

## Clearfix

If an element (parent) contains only floated elements (children), it has zero height! In the next example, the `section` contains only a single `float`ed `nav` tag:

```html
/* CSS */
nav {
  float: right;
  background: orange;
}

section {
  background: blue;
}

/* HTML */
<section>
  <nav>
    Navigation here
  </nav>
</section>
```
Producing:

![The clear problem](https://assets.aaonline.io/fullstack/html-css/assets/images/clear-problem.png?raw=true)

Our `section` tag's blue background doesn't come through. The way to fix this is via a popularized trick known as the clear fix. We'll use the `:after` pseudo-selector to insert an empty string inside the `section` tag. Then we give it the `clear: both` property. which tells the element to fall below any floated elements it would share a line with. Modifying the above CSS with the following:

```html
/* Additional CSS */
section:after {
  content: ""; /* Empty content string */
  display: block; /* Only block elements can clear */
  clear: both;
}
```

We get:

![Clearfix](https://assets.aaonline.io/fullstack/html-css/assets/images/clearfix.png?raw=true)

The empty string forces our `section` tag to have some height.

## Demo

Check out [this demo][click_demo] ([code][click_demo_code]). Note how float is
used to make a list resemble a grid:

```css
.grid > li {
  float: left;
  width: 90px;
  height: 90px;
  ...
}
```

[click_demo]: http://appacademy.github.io/css-demos/click.html
[click_demo_code]: https://assets.aaonline.io/fullstack/html-css/demos/css_demos/click.zip
