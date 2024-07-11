# What Is The Document Object Model (DOM)?

The **Document** is any web page loaded in by the browser. It serves as an entry
point into the web page's content. The **Document Object Model** is an API
provided by the browser in which JavaScript code can be used to access the HTML
content of a page. In other words, the DOM is an interface that allows us to
break down a web page into a heirarchy of nodes, and manipulate those nodes with
JavaScript.

![DOM](https://upload.wikimedia.org/wikipedia/commons/5/5a/DOM-model.svg)

The DOM is represented as a tree, and each branch of the tree ends in a node,
representing an object. In a sense it is an object-oriented way to represent a
webpage. Everything from the html root element to the attributes of an image tag
is represented as an object using the DOM. It is important to recognize that an
HTML page on its own is not made up of underlying data structures, and that it
is the DOM itself that is translating the HTML into a node tree. Without the
DOM, you wouldn't have any way to manipulate the document and its component
parts using JavaScript code alone.

The DOM API is standardized by the World Wide Web Consortium (W3C); all major
browsers implement it, though there are quirks across browsers.

## The `window` object

The `window` object is a global variable representing the browser's window in
which JavaScript code is currently running. The window has many properties,
including but not limited to, all other global variables, global functions, the
console (`console.log`), and of particular interest to us, the document. The
scope of the window is generally limited to the tab in which the code is
running, but in certain cases can extend to the whole browser window, such as
resizing the window.

When using the console of a browser, unless otherwise specified, all commands
are implicitly called on the window. For example, typing `num = 42` in the
console, and then typing `window.num` will return a value of `42`. Similarly, to
access the `document` of the window, you could either type `window.document` or
just `document`.
