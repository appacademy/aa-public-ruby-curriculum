# DOM Elements

So far, you've learned that the DOM is an object-oriented representation of a
web page that allows you to interact with it using JavaScript. It consists of a
tree of all the elements on the page. The root node of this tree is the
`document` object, upon which you've called methods like
`document.getElementById()` and `document.createElement()`.

DOM elements, such as those returned by `getElementById` and `createElement`,
are JavaScript objects with properties you can access and methods you can call.

But what kind of objects are these? What classes do they belong to? What else
can you do with them? Let's take a closer look.

## [Node][mdn-node]

Every object in the DOM tree is a [`Node`][mdn-node]. This includes every HTML
element on the page: every `div`, `form`, `button`, etc., and even
non-presentational elements like `script` and `link` elements. Some `Node`s
aren't HTML elements, such as the plain text you might put inside a `p` or
`span` ([`Text`][mdn-text]), `<!-- comments -->` ([`Comment`][mdn-comment]), and
our good friend `document` ([`Document`][mdn-document]).

Being tree nodes, each `Node` contains properties like `childNodes`, which
points to an array-like list of the node's children, and `parentNode` which--you
guessed it!--points to the node's parent. `Node` also includes methods like
`someNode.contains(otherNode)`, which checks if `otherNode` is a descendent of
`someNode`, and `someNode.appendChild(childNode)`.

## [Element][mdn-element] and [HTMLElement][mdn-html-element]

Although some nodes, like plain text or comments, aren't elements, the majority
of the time you'll be working with elements. Every element is an instance of
[`Element`][mdn-element], which inherits from `Node`, and most elements are
instances of [`HTMLElement`][mdn-html-element], which inherits from `Element`
(the primary exception being [`SVGElement`][mdn-svg], which is used for
graphics).

Most of the properties and methods you'll use for elements are defined on these
two classes. And there are many such properties and methods:

* Get and set common attributes with properties like `Element.id`,
  `Element.className`, and `HTMLElement.tabIndex`.
* Get and set any attributes with `Element.getAttribute(attrName)` and
`Element.setAttribute(attrName, value)`.
* Want to get or set the text content of, say, a `span` or a `p`? Use
`HTMLElement.innerText`.
* Want to know about an element's position on the page?
`Element.getBoundingClientRect()` returns a POJO with the element's current
distance from the top and left sides of the page, as well as its current width
and height.
* Add, remove, and toggle classes using methods from the
[`DOMTokenList`][mdn-token-list] object returned by `Element.classList`.
* Read and write data attributes using the `DOMStringMap` object
returned by [`HTMLOrForeignElement.dataset`][mdn-dataset].
* And so much more!

## [NodeList][mdn-node-list] and [HTMLCollection][mdn-html-collection]

If you call `document.querySelectorAll('p')`, you will get an array-like
collection of all `p` elements on the page. This array-like object is an
instance of [`NodeList`][mdn-node-list]. Another array-like collection of
elements you might encounter is [`HTMLCollection`][mdn-html-collection]. (Keep
reading to discover some of the key differences between a `NodeList` and an
`HTMLCollection`!)

These array-like objects can be either _live_, which means they update
dynamically, gaining or losing elements as the DOM changes, or _static_, which
means they don't gain or lose elements dynamically. Every `HTMLCollection` is
live, but a `NodeList` can be live or static.

Here are some common methods and properties that return a `NodeList` or
`HTMLCollection`:

|        | NodeList | HTMLCollection |
|--------|----------|----------------|
| live   | `Node.childNodes` | `document.getElementsByClassName()`<br>`document.getElementsByTagName()` <br>`Element.children` |
| static | `document.querySelectorAll()` |  |

To demonstrate the difference between live and static collections, consider this
example:

```html
  <style>
    .red {
      color: red;
    }

    .blue {
      color: blue;
    }
  </style>

  <span class='red'>I'm red.</span>
  <span class='red'>I'm also red.</span>
  <span class='blue' id='turns-red'>I'm blue now, but I'll turn red.</span>

  <script>
    const staticRedSpans = document.querySelectorAll('span.red');
    const liveRedSpans = document.getElementsByClassName('red');

    console.log(staticRedSpans.length); // 2
    console.log(liveRedSpans.length); // 2

    document.getElementById('turns-red').className = 'red';

    console.log(staticRedSpans.length); // still 2
    console.log(liveRedSpans.length); // 3, span#turns-red was dynamically added
  </script>
```

Notice how the `liveRedSpans`--a live `HTMLCollection`--dynamically updates to
include `span#turns-red` once you change its class to `red`, but the
`staticRedSpans`--a static `NodeList`--doesn't change.

Let's now talk about how these array-like objects compare with real arrays.

As you can see in the example above, both types of collections have a `length`
property, just like arrays. Another similarity is that you can index into these
collections:

```js
  console.log(staticRedSpans[0]); // <span class='red'>I'm red</span>
```

`NodeList` also has a `forEach` method (an `HTMLCollection` does **NOT!**). But
besides that, there are a lot of `Array` methods that aren't available for
`NodeList` or `HTMLCollection` objects.

To use these methods, first turn your collection into an array, then call your
favorite array methods. For example:

```js
  const textContents = Array.from(staticRedSpans).map(redSpan => {
    return redSpan.innerText;
  }); 
  
  console.log(textContents); // ["I'm red", "I'm also red"]
```

## Exploring more

This reading has only scratched the surface of what you can do. Indeed, most DOM
elements are actually instances of even more specific subclasses that inherit
from `HTMLElement`. These might add additional functionality, such as the
methods `play()` and `pause()` for [`HTMLMediaElement`][mdn-html-media-element]
(which would include `video` and `audio` elements).

So definitely spend a lot of time exploring the docs —
[`HTMLElement`][mdn-html-element], [`Element`][mdn-element], and
[`Node`][mdn-node] are good places to start.

Then, experiment with what you find in your browser's console. Pick any random
page, open the inspector, and select an element with the element picker. You can
access the currently selected element in your Chrome console with the special
variable `$0`.

If you `console.dir(someElement)`, you'll see a list of all its properties. Or
you can call `someElement.constructor` to find out what class an element belongs
to, so you can dig through the MDN docs for its class and ancestor classes.

Go ahead: start accessing properties, calling methods, and making mutations! The
world is your oyster!

[mdn-document]: https://developer.mozilla.org/en-US/docs/Web/API/Document
[mdn-text]: https://developer.mozilla.org/en-US/docs/Web/API/Text
[mdn-comment]: https://developer.mozilla.org/en-US/docs/Web/API/Comment
[mdn-node]: https://developer.mozilla.org/en-US/docs/Web/API/Node
[mdn-element]: https://developer.mozilla.org/en-US/docs/Web/API/Element
[mdn-html-element]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
[mdn-svg]: https://developer.mozilla.org/en-US/docs/Web/API/SVGElement
[mdn-html-media-element]:
https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
[mdn-node-list]: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
[mdn-html-collection]:
https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
[mdn-dataset]:
https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset
[mdn-token-list]: https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList
