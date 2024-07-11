# jQuery Lite!

## Overview

Today we will be recreating most of the important functionality of the jQuery
library. jQuery is widely used for making AJAX requests, handling events,
manipulating the DOM, and guaranteeing it works across browsers.

We will implement most of this functionality using the native DOM API that is
built right into every browser. For a full list of API methods check out the
[MDN site][document-apis]. You will be surprised how little you actually need
jQuery when you finish this project! Use the [documentation on jQuery][jquery]
if you need more info on the jQuery methods you are building.

**Remember, the docs are your friends. Refer to them throughout this project**

## Learning Goals

- Know how to traverse and manipulate the DOM using vanilla JavaScript
- Be able to create a class to serve as a wrapper for DOM nodes / HTML elements
  - Understand an HTML page as a tree of DOM nodes
  - Get familiar with some of the properties that HTML elements have
- Know how to create event listeners using vanilla JavaScript

## Phase 0: Getting Started

### Create a sandbox HTML document

For testing, make a new HTML document and put some content (a few divs, links,
an unordered list, etc) into the body. We will be testing our library on this
document, so give yourself some elements to experiment with.

Add a `<script>` tag at the top of the HTML document that sources [the actual
jQuery library][jquery-library]. This will allow you to test the functionality
of your jQuery lite methods by comparing them against the real thing.

### Webpack

Create two folders in your project directory, `/dist` and `/src`. The `/dist`
folder will hold all of our 'distribution' code, including `index.html` and our
bundle, `main.js`. The `/src` folder will hold all of our javascript 'source'
files, including an entry point file, `index.js`, and any other files that will
be 'bundled' by webpack. Arranging our folder structure this way allows us to
run webpack without any additional configuration; its default behavior is to
bundle `src/index.js` and create a file called `main.js` in the `/dist`
directory. To run webpack and create `dist/main.js`, run
`webpack --watch --mode=development`. Don't forget to source the new `main.js`
output file in another `<script>` tag in your html file!

### The core function

- In your entry file, create a new function and add it to the window as
  `window.$l`.
- The function should take one argument (more on this later).

## Phase 1: DOM Manipulation and Traversal

In this phase, we are going to create a class to hold DOM nodes and offer
convenient methods for traversal and manipulation. We will implement `empty`,
`remove`, `attr`, `addClass`, `removeClass`, `html`, `find`, `children`, and
`parent`.

### \$l(selector)

- The core function, as we know, receives one argument. If that argument is a
  string, it is expected to be a `CSS` selector that we can use to identify
  nodes on the page.
- Use [this method][queryselectorall] to get an _array like_ object
  (specifically a `NodeList`) that matches the selector using the native
  JavaScript API.
- Once we have our `NodeList` we want to convert it into an actual `Array` so we
  can pass it as an argument to the class we will define next.

Make sure you successfully test your function before moving on! Use
`window.$l = $l;` to interact with it in the browser console. Open `index.html`.

### DOMNodeCollection

- Create a file in `/src` called `dom_node_collection.js`. We'll define our
  class here and assign it to `module.exports` in order to use it back in our
  index file.

- Create a new class, call it `DOMNodeCollection`. It should receive an
  **array** of [`HTMLElements`][htmlelement] as its only argument. Store this
  array as an instance variable.

- All the methods we implement will be applied to every node in the internal
  array.
- The core function should return an instance of DOMNodeCollection.
- Back in `index.js`, require your DOMNodeCollection file and store it in a
  variable.

### \$l(HTMLElement)

- We are now going to modify the core `$l` function. It will receive one
  argument, but let's make it flexible.
- If the argument received is an HTML element, (i.e. an `instanceof`
  `HTMLElement`), you should put it into an array and return an instance of
  DOMNodeCollection.
- This will allow an HTMLElement native element to be 'wrapped' in jQuery lite
  goodness.
- So: our core function can receive either a single HTMLElement or a string with
  a CSS selector and in either case, the return value will be a
  DOMNodeCollection.

### `DOMNodeCollection.prototype` methods

#### html

- Let's write the method `html` first. It can optionally receive a string as a
  parameter.
- If it receives an argument, this will become the `innerHTML` (hint hint) of
  the each of the nodes. If it does **not** receive an argument, it should
  return the `innerHTML` of the **first** node in the array.

#### empty

- This method clears out the content of all nodes in the internal array. I set
  the `html` of all nodes to an empty string.

#### append

- Take a look [here.][append] This method should accept either a jQuery-lite
  wrapped collection, an HTML element, or a string. Append the `outerHTML` of
  each element in the argument to the `innerHTML` of each element in the
  `DOMNodeCollection`. Don't worry about converting strings into HTML elements;
  just pass them straight through to the elements' `innerHTML`.

#### other methods

- I will leave it up to you to figure out ways to implement `attr`, `addClass`,
  and `removeClass`. All the information for how to change nodes is available in
  [this resource][htmlelement].

### Traversal

#### children

- `children` is a method that should return a `DOMNodeCollection` of **ALL**
  children of all nodes in the array.
- Each node in the array will natively have a `children` attribute. Look
  [here][children] for more information.
- Make sure the return value of this method is an instance of
  `DOMNodeCollection`.

#### parent

- Return a `DOMNodeCollection` of the `parent`s of each of the nodes

#### find

- Returns a `DOMNodeCollection` of all the nodes matching the selector passed in
  as an argument that are descendants of the nodes. [This might come in
  handy][elementqueryselectorall].

#### remove

- This should `remove` the html of all the nodes in the array from the DOM

## Phase 2: Event Handling

- Now, we are going to add `on` and `off` methods to the `DOMNodeCollection`
  prototype. These methods should add and remove event handlers, respectively.

- You should find [this resource helpful][addeventlistener] for your `on`
  method. Note that this event handler should be registered for every element in
  the node array!

- Don't worry about event delegation. In other words, you don't have to handle
  cases like:

```javascript
  $("ul").on("click", "li", () => {...})
```

You only have to handle:

```javascript
  $("ul").on("click", () => {...})
```

- [Look here][removeeventlistener] to learn more about removing an event from a
  node.

- Users should only have to provide the event type and not the callback to the
  `off` method. In order to do this the `on` method will have to store the
  callback as an attribute on the node so it can later be retrieved by the `off`
  method. Hint: a node is just a Javascript object!

## Phase 3: Document Ready

```javascript
$(() => alert("the document is ready"));
//$(document).ready(someCallback); would have the same effect
```

The above snippet of code should look quite familiar. Its function is to pop up
a helpful alert when the HTML has finished rendering; when the `document` is
`ready`.

For this phase of the project we will be adding this functionality to our core
`$l` function. We will need to change the code inside of our main function, the
one we used to create an instance of `DomNodeCollection`.

- Change the `$l` function so that if it receives a function, it will push that
  function into an array (queue) of functions to be executed when the document
  is ready.
  - If the document is already ready, trigger the function immediately.
- See if you can find a way (using your Google skills) to check if the document
  is ready using Vanilla JavaScript. There are some VERY simple solutions.
- Once the document has become ready, trigger all your callbacks!

## Phase 4: AJAX

### \$l.extend

Let's implement a super simple function to merge JavaScript objects. The
arguments will be two or more objects.

For example:

```javascript
const objA = { a: "a", b: "a", c: "a" };
const objB = { b: "b", c: "b" };
const objC = { c: "c" };
$l.extend(objA, objB, objC); //=> {a: 'a', b: 'b', c: 'c'}
objA; //=> {a: 'a', b: 'b', c: 'c'}
```

### \$l.ajax

- Add an `ajax` function to the `$l` function object. It should receive one
  options object argument.
- It will help to know what you expect the behavior to be.
  - Reference a [sample ajax request][sample-ajax-request] to know what your
    inputs are and when you expect functions to run.
  - Your `ajax` function does not have to return a `Promise`. We'll implement
    that in the bonus.
  - Test out your `$l.ajax` code using the same endpoint as the sample request.
- Make a `defaults` object. Check [the jQuery `ajax` API document][jquery_ajax]
  to get a sense of what the defaults should be. Provide defaults for `success`,
  `error`, `url`, `method`, `data`, and `contentType`.
- Merge the `options` onto the `defaults`
- Review [this reading][vanilla-javascript] to learn how to implement an AJAX
  request using the native JavaScript API. It's actually quite easy!
- Using the options supplied by the user, make the request. Be sure to deliver
  the proper response to the success/error callback. This response should be an
  object (use JSON.parse) and not a string.

## Bonus Phase (do this after the rest of the day's exercises)

- jQuery Lite [Snake][snake-project].

## SUPER Bonus Phase (do this after the rest of the day's exercises)

- Have your `ajax` function return a [`Promise`][promise-reading].
  - [Read about Promise usage here][promise_doc]

[jquery]: http://api.jquery.com/
[jquery-library]: https://developers.google.com/speed/libraries/#jquery
[document-apis]: https://developer.mozilla.org/en-US/
[append]: http://api.jquery.com/append/
[promise-reading]: promises
[promise_doc]: http://www.2ality.com/2014/09/es6-promises-foundations.html
[htmlelement]: https://developer.mozilla.org/en-US/docs/Web/API/element
[children]: https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/children
[elementqueryselectorall]:
  https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll
[queryselectorall]:
  https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
[addeventlistener]:
  https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
[removeeventlistener]:
  https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
[sample-ajax-request]: simple-ajax-example
[jquery_ajax]: http://api.jquery.com/jquery.ajax/
[vanilla-javascript]: vanilla-javascript
[snake-project]: jquery-snake
