# DOMContentLoaded

Because `script` tags are executed immediately, even before the rest of the
document is parsed, you have to be careful when querying elements in the DOM. Consider:

```js
// script.js
document.querySelectorAll("ul.plays > li").forEach( element => {
  element.style.backgroundColor = "red";
});
```

```html
<!-- index.html -->
<head>
  <!-- This script will **not** work as expected. -->
  <script src="script.js"></script>
</head>

<body>
  <ul class="plays">
    <li>The Importance of Being Earnest</li>
    <li>Hamilton</li>
    <li>As You Like It</li>
  </ul>
</body>
```

The script here will not actually do anything, i.e., it will **not** set the
`li`s background color to `red`. Why not? `document.querySelectorAll("ul.plays >
li")` will return an empty NodeList because the `ul` and `li`s on the HTML page
will not yet have been loaded. **This is a very common problem!**

Making this problem even worse, it can be difficult to detect. An empty NodeList
is still a valid NodeList object. Iterating through an empty NodeList will
accordingly achieve the same result as iterating through an empty array: it will
succeed, but the callback will never be invoked since there are no elements. In
other words, **no error will be raised.**

**Tip:** When your JavaScript code mysteriously seems like it doesn't run, it's
often helpful to add a `console.log` to print the object to make sure you've
selected some elements and that the `NodeList` or `HTMLCollection` is not empty.

You can fix this problem in a few different ways.

## Solution 1: Change the order

One way to ensure that the page content has loaded before running your
JavaScript selectors is simply to move the script tag to the bottom of the page:

```js
// script.js -- (Nothing has changed in this file.)
document.querySelectorAll("ul.plays > li").forEach( element => {
  element.style.backgroundColor = "red";
});
```

```html
<!-- index.html -->
<body>
  <ul class="plays">
    <li>The Importance of Being Earnest</li>
    <li>Hamilton</li>
    <li>As You Like It</li>
  </ul>

  <!-- This script will work as expected. -->
  <script src="script.js"></script>
</body>
```

Browsers evaluate HTML documents from top to bottom, so this time the `li`s in
the page will already have been loaded by the time the JavaScript script loads
and runs.

Programmers used to prefer this solution because it also addresses another
potential problem. If JavaScript files or scripts precede the HTML body content,
the browser will not render any of the body until the JavaScript code has been
loaded and evaluated. As a result, users might experience a considerable delay
before their content appears. Putting any JavaScript code below the HTML body
content prevents such delays.

For both of these reasons, you generally want your JavaScript scripts and files
to run **after** the HTML body content loads. Nevertheless, while putting all
Javascript code right before the closing `</body>` tag will work, waiting to
load large JavaScript files could cause considerable performance delays as well.
Furthermore, that code doesn't really belong mixed-in with the document's main
content of your document. Ideally, all the scripts, metadata, stylesheets, and
other tags that influence or alter the page should be in the `head`, separate
from the page's main content. Is there a way to keep your JavaScript code in the
`head` while also ensuring that the page content loads before the JavaScript
runs? Yes!

## Solution 2: Add a `DOMContentLoaded` event listener

You can use an event listener to ensure that JavaScript code will be executed
only after the page content loads, even if the JavaScript is placed in the
`head`:

```js
// script.js
// The outer event listener has been added.
document.addEventListener("DOMContentLoaded", () => { 
  document.querySelectorAll("ul.plays > li").forEach( element => {
    element.style.backgroundColor = "red";
  });
})
```

```html
<!-- index.html -->
<head>
  <!-- This script will work as expected. -->
  <script src="script.js"></script>
</head>

<body>
  <ul class="plays">
    <li>The Importance of Being Earnest</li>
    <li>Hamilton</li>
    <li>As You Like It</li>
  </ul>
</body>
```

This will solve the initial problem noted above: the `ul` and `li`s will be
loaded before the script runs, so the script will successfully find the `li`s
and turn their background red.

Even though the `script` tag will not run its callback until the page is loaded,
the browser parser does not know this. It will accordingly still block the
rendering of the rest of the HTML content until the script is fetched and
downloaded. While this should not be an issue for the relatively small-scale
projects you create at App Academy, having the `script` tags of particularly
large JavaScript files in the `head` could cause a notable delay before the page
loads. This can be especially painful in the case of JavaScript hosted by third
parties. The final solution solves this problem as well.

## Solution 3: Adding the `defer` attribute

The preferred method today for ensuring that your JavaScript code has access to
the page elements while also optimizing download time is simply to add a
[`defer`] attribute to your script:

```js
// script.js
document.querySelectorAll("ul.plays > li").forEach( element => {
  element.style.backgroundColor = "red";
});
```

```html
<!-- index.html -->
<head>
  <!-- This script will work as expected. -->
  <script src="script.js" defer></script>
</head>

<body>
  <ul class="plays">
    <li>The Importance of Being Earnest</li>
    <li>Hamilton</li>
    <li>As You Like It</li>
  </ul>
</body>
```

`defer` will load the Javascript file but without blocking the parser from
continuing to load the HTML body at the same time. The Javascript code will not
run, however, until the page has finished loading. (Scripts with `defer` will
run before `DOMContentLoaded` fires). Success!

**Note:** `defer` has no effect on inline scripts, i.e., on scripts in which the
JavaScript code appears between the script tags. The following syntax, e.g.,
will **not** work:

```html
<!-- index.html -->
<head>
  <!-- This script will **not** work as expected. -->
  <script defer>
    document.querySelectorAll("ul.plays > li").forEach( element => {
      element.style.backgroundColor = "red";
    });
  </script>
</head>

<body>
  <ul class="plays">
    <li>The Importance of Being Earnest</li>
    <li>Hamilton</li>
    <li>As You Like It</li>
  </ul>
</body>
```

Also, note that scripts with `type="module"` defer by default, so the attribute
is unnecessary.

## What you've learned

In this reading, you learned three ways to ensure that a page's HTML content has
loaded before running JavaScript code that seeks to interact with that content:

1. Putting the `script` tag at the end of the `body`
2. Wrapping the JavaScript code in a `DOMContentLoaded` event listener
3. Using the `defer` attribute

Of these three methods, `defer` is generally preferred today because it also
optimizes the time to load a fully functional page.

[`defer`]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer
