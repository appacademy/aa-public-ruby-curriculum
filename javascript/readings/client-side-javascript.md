# Client-side JavaScript

We've written JavaScript source files for Node.js, but we want to start writing
JavaScript for the browser to execute.

Let's start with how to instruct a browser to load and execute JS code:

```html
<!-- index.html -->
<html>
  <head>
    <title>A page for you!</title>
  </head>

  <body>
    <div id="content"></div>

    <!-- first load the jQuery library hosted by Google -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.3/jquery.js"></script>

    <script>alert("This is inline code!");</script>

    <!-- then load our own app.js code -->
    <script type="application/javascript" src="./app.js"></script>
  </body>
</html>
```

Each script tag tells the browser to load and execute some JavaScript code. If
the `src` attribute is given, the browser fetches the code. If the `script` tag
has a body (called **inline JavaScript**), it is treated as JavaScript code and
executed. Inline JavaScript is considered poor style and is hard to keep
organized, so keep inline JS use at a minimum.

In this example, we would first fetch and execute the jQuery library from
Google, then run the inline alert code, then fetch and run our `app.js` file.

## Environment

We call programs like browsers (Chrome, Safari, Firefox, Internet Explorer) and
Node.js **JavaScript runtimes**, or **environments**. These environments expose
functionality that our JavaScript scripts can access through **APIs**.

For instance, Node.js lets us read files inside our scripts via the
`require("fs")` module. Similarly, we can use the browser's DOM API (for
instance, `document.getElementById("...");`) to find and modify HTML elements in
a web page.

Neither File I/O nor DOM manipulation are part of `JavaScript`, per se. Instead,
these are functionalities provided by the environment (Node.js, web browser)
and accessed through a JavaScript API.

## ES6, Browsers, and You!

Most browsers have happily adopted the new ES6 Standard and should be fully (or
almost fully) ES6 Compatible. Some, however, lag a little behind (we're looking
at you, Internet Explorer). See the [compatibility table][compatibility-table]
for the complete low down on ES6's current browser compatibility.

So, what do we do for browsers that have not yet integrated ES6's new features?
A few options:

1. **Ignore them.** This isn't the most viable option for apps in production,
   since there are bound to be users who still utilize ES6-incompatible
   browsers. For the next few days, however, **stick with Chrome** and
   everything should go according to plan.
2. **Use a polyfill.** This means that we test for the existence of a certain
   function or property and provide a hand-spun version if one doesn't exist.
   For example:

  ```JavaScript
  if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
      'use strict';
      if (typeof start !== 'number') {
        start = 0;
      }

      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }
  ```

  Often, MDN provides polyfills for applicable functions. The above is copied
  from the [MDN documentation][mdn-includes] for `String.prototype.includes`.

  As one might imagine, including polyfills for every ES6 function you use in
  every file can be somewhat exhausting, annoying, and ugly. Polyfills provide a
  quick stopgap, but we can do better. This brings us to solution number three.

3. **Transpile to ES5.** Yup, seems a little counterintuitive - why even bother
   writing ES6 if we're just going to translate back to ES5 anyways? The answer:
   ES6 provides us with several elegant and useful features. We like ES6 and
   hope that it'll one day be compatible with all browser environments. In the
   meantime, we can use simple tools like [Babel][babel] to transpile our ES6
   into ES5 and thereby maintain backwards compatibility. Ultimately, this is
   the approach that we will use in React. Look for more instructions on how to
   use `babel` later in the course.

[compatibility-table]: https://kangax.github.io/compat-table/es6/
[mdn-includes]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
[babel]: https://babeljs.io/
