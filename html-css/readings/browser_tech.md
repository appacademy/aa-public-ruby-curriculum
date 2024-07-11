# Browsers

A browser's purpose is to display web resources - HTML documents, images, &
styling. The user of a browser tells the browser where the resource is located
(usually by typing a URL into the text input field at the top of the browser),
and the browser fetches, parses, and displays that resource.

The main components of a browser are: the user interface (UI), which consists of
the browser's display elements; the browser engine, which coordinates the UI and
the rendering engine; the rendering engine, which displays the requested
content, parsing HTML and CSS if necessary; networking, which handles network
calls; the UI backend, which draws widgets like dropdown lists and windows; the
JavaScript interpreter; and data storage, which manages cookies and
localStorage, among other things.

![parts of a browser](https://assets.aaonline.io/fullstack/html-css/assets/browser_layers.png)

Browsers are large and complicated - modern browsers are made up of millions
(yes, you read that correctly) of lines of C++ code.

## The Rendering Engine

N.B. Typically, browser will have an instance of its rendering engine running
for each tab open in the browser.

First off, it is important to note that different browsers use different
rendering engines; the wikipedia page for a browser will tell you what rendering
engine that browser uses. Different rendering engines sometimes perform tasks in
slightly different ways or in a slightly different order, but in general, they
follow the below pattern:

- **Parse the HTML document to construct the DOM tree**
  - HTML elements get converted to DOM nodes in the "content" tree
- **Construct the render tree**
  - CSS information (and styling information from the HTML) is used to create
    the "render" tree from the "content" tree
    - The render tree contains a rectangle for each node
      - Each rectangle has dimensions and color
    - The rectangles are ordered the same way they will be ordered on the
      display
- **Add layout information to the render tree**
  - Each node receives its exact coordinates on the screen
- **Paint the render tree**
  - The render tree is traversed and each node is painted
    - This step uses the UI backend to access the OS's drawing capabilities

## HTML Parsing

Two things need to happen for HTML to get parsed: first, the HTML document needs
to get broken up into HTML elements; and second, the rules of HTML syntax need
to be applied to those elements.

Because HTML is not a context-free grammar, its parsing is rather complex. The
parser has to fix any syntax errors that the author has written into their
document and prevent the author from making stupid mistakes, like ending the
`body` too early.

JavaScript can either be synchronously loaded, in which it blocks the parsing of
the HTML while it is executed, deferred, in which case its execution is
typically deferred until after the HTML has been parsed, or asynchronously
loaded, in which case its execution happens on a different thread from the HTML
parsing.

Style sheets, however, are always loaded synchronously.

## Render Tree Construction

Each element in the render tree (called either a "frame" or a "renderer,"
depending on the render engine used) knows how to lay out and paint itself and
its children. A frame will represent the rectangular area that element will take
up - it will have a width, a height, and a position - and if the element is not
visible, then it will not appear in the render tree. Some HTML elements will
require the creation of multiple frames, like "select": one frame for the
display area, one frame for the dropdown list box, and one frame for the button.

Floating and absolutely positioned elements are handled differently than block
and inline elements.

Computing the style of a given element can be very costly. To optimize this
process, some browsers use two extra trees: a style context tree, which holds a
reference to the end values of various style rules (i.e., a node in the rule
tree); and a rule tree, which holds matched style rules, with nodes farther from
the root holding precedence over nodes closer to the root. Browsers that don't
implement a rule tree end up traversing the list of matching style declarations
four times: for high priority properties (e.g., display), for important high
priority properties, for normal priority properties, and finally for important
normal priority properties, with each traversal capable of overwriting rules set
in the previous traversal.

Browsers also use hash maps to filter out rules that don't apply to a given
element. If a browser is looking for information about `div.blue#test`, it will
look in the tag hash map for rules matching `div`, the class hash map for rules
matching `.blue`, and the id hash map for rules matching `#test`.

Once the rules that apply to a given element have been selected, they are then
ordered by specificity.

## Layout

Because HTML uses a flow-based layout model, the layout can start at 0,0 (the
top left corner of the screen) and find the positions of almost all elements in
a single pass. Layout progresses recursively from the `<html>` element to all of
its descendants following the below pattern:

- the frame determines its width
- for each child frame:
  - the frame places that child frame by setting its x and y positions
  - calls that child frame's layout
- the frame uses its children's heights to set its own height

Two different types of events can trigger layout events: global changes, such as
the window being resized; and incremental changes, such as the addition of new
content to the page. For incremental changes, the frames that have changed are
flagged as "dirty"; those are the only frames that are re-laid out (although
their new positions can trigger more incremental changes). One optimization that
browsers use is to cache the sizes of its frames and not recalculate them unless
it is necessary.

While global layout is done synchronously, incremental layout is asynchronous

- the reflowing steps get scheduled to be completed at some point in the future.

## Painting

Painting is done in the following order:

1. Background color
1. Background image
1. Border
1. Children
1. Outline

Similarly to layout, painting can be either global or incremental. Browsers try
to do as little work as possible to respond to a change, both at a structural
level (e.g., changing an element's color will only repaint that element and not
re-lay it out) and at a lower level (e.g., WebKit saves a rectangle as a bitmap
before repainting and only paints the delta between the new and old rectangles).

For a more in-depth discussion of this topic, see
[HTML5Rocks' writeup on how browsers work](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)
