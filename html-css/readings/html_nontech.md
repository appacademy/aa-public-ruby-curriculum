# HTML

## What is HTML?

### HTML

HTML is short for "HyperText Markup Language," which tells us several things
about it. First, it is a markup language, which means that each piece of
information is annotated with a description of what it is (e.g., a paragraph, a
link, and image, &c.). Second, its defining characteristic is "HyperText" - the
ability to click on a reference to another text and get access to it (i.e.,
links).

HTML is the standard markup language for creating web pages and web
applications. The original specs for HTML, as well as the browser software,
were written by Tim Berners-Lee in 1990. Each new version of HTML undergoes a
lengthy review process by its publishing body, the W3C, before being released -
for example, HTML5 was published as a working draft in 2008, but not released
as a stable recommendation until 2014.

### HTML5

HTML5 is the newest / current version of HTML. It includes new multimedia tags,
including `<audio>`, `<video>`, and `<canvas>`, as well as new semantic tags,
including `<main>`, `<section>`, `<header>`, and `<nav>`.

### HTML 5.1

HTML 5.1 is the proposed next version of HTML, with HTML 5.2 planned to come after that.

## Vocabulary

### Semantic HTML 

Semantic HTML means that the HTML tags describe the meaning of the information
(its semantics) rather than its presentation.

### Web Browser

Modern browsers retrieve information stored at the URL entered and "render" the
HTML and CSS stored at that location, allowing users to interact with its
display. Browsers also interpret any JavaScript files that they are instructed
to run. Browsers first parse the HTML and construct a DOM tree, then combine
the styling with the HTML to create the render tree. Once the render tree is
complete, the browser gives each node its exact coordinates on the page before
"painting" all of them.

The first web browser was invented by Tim Berners-Lee in 1990, while the first
mainstream browser was Mosaic, created by Marc Andreessen in 1993. Andreessen
later started Netscape, which released Netscape Navigator in 1994. In 1995
Microsoft developed Internet Explorer and eventually took over the market (in
part by bundling IE with Windows, which was included on almost every PC sold).
Netscape created Mozilla in 1998, which is a nonprofit organization that
creates open source web products (most popularly, the browser Firefox). Along
with Firefox, Safari (developed by Apple and included with Apple's OS X and
iOS), Chrome (developed by Google), and IE / Microsoft Edge are the most
popular browsers currently in use.

Find more information on how browsers work [here][html5rocks-browsers].

### Browser Wars

The "Browser Wars," a competition for market share during the 90s between
Netscape's Navigator and Microsoft's Internet Explorer, saw those two browsers
implement different sets of HTML features as well as create their own features.
While today's popular browsers don't have as wide a set of disparities as
Netscape and IE did, some newer standards are still interpreted differently
between browsers.

### XML

XML stands for "Extensible Markup Language." It is a way of packaging
information with metadata so that it can be easily consumed. It is widely used,
including by RSS and Microsoft Office products.

### JSON

JSON, short for "JavaScript Object Notation," is a data format consisting of
`key: value` pairs. The value types that it accepts are numbers, strings,
boolean values, arrays, objects, and null. It has replaced XML as the most
common data format for asynchronous browser-server communication because of its
lower structure-to-data ratio.

### YAML

YAML, short for "YAML Ain't Markup Language," is a version of JSON that
replaces many of the symbols used in JSON (e.g., `{`, `[`) with indents.

### JSX

JSX is a JavaScript Extension syntax that allows the use of HTML tags inside
JavaScript. JSX can quote HTML and can also render "HTML elements," although
all JSX compiles into calls to `React.createElement`.

[html5rocks-browsers]: https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/
