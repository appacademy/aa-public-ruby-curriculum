# JavaScript

JavaScript is a critical tool for any web developer, as it is one of the three
primary languages that ships with the browser. Whereas HTML and CSS respectively
provide static content and its styling, JavaScript makes websites dynamic. With
JavaScript, the initial content of a webpage can be selected, altered, and
transformed on a conditional basis.

JavaScript is now no longer used just on the client-side, but on the server-side
as well. There are various [Node.js] frameworks designed for this purpose.

[Node.js]: https://nodejs.org/en/

## History

JavaScript was introduced during the initial [browser wars]. In 1995, [Netscape
Communications] recruited [Brendan Eich] to add a language to their browser,
Netscape Navigator, that non-professional programmers could use with ease.
Having decided to incorporate Java into their browser with the collaboration of
[Sun Microsystems], Netscape Communications decided to have Eich's new language
act as a complement to Java. Eich completed his tasked language in ten days, and
it eventually became known as JavaScript.

Following suit, Microsoft released a similar dialect called JScript in Internet
Explorer 3.0. In June 1997, [ECMAScript] was established as a scripting-language
specification - a standard - and various languages are implementations of that
standard. Both JavaScript and JScript aim to fulfill the ECMA standards, but
both also offer functionality that goes beyond the mutual specification.

*__Excerpted ECMAScript releases:__*

| Name                  | Release Number| Year of Release  |
| --------------------- |:-------------:| ----------------:|
| ES5                   | 5             |             2009 |
| ES6 / ECMAScript 2015 | 6             |             2015 |
| ES7 / ECMAScript 2016 | 7             |             2016 |
| ES8 / ECMAScript 2017 | 8             |             2017 |


[browser wars]: https://en.wikipedia.org/wiki/Browser_wars
[Netscape Communications]: https://en.wikipedia.org/wiki/Netscape
[Brendan Eich]: https://en.wikipedia.org/wiki/Brendan_Eich
[Sun Microsystems]: https://en.wikipedia.org/wiki/Sun_Microsystems
[ECMAScript]: https://en.wikipedia.org/wiki/ECMAScript

## Alternatives to JavaScript

JavaScript, JScript, and ActionScript are all valid implementations of
ECMAScript.

* While it does maintain slight differences with JavaScript, JScript is
  essentially the same language with a different name to avoid trademark issues.
  However, the difference is so slight that anything written in JavaScript is
  presumed to run properly in a browser that is built on JScript. Microsoft's
  Internet Explorer is the only browser that uses JScript.

* ActionScript is much more of an object-oriented language than JavaScript. For
  instance, it makes use of class inheritance, as opposed to JavaScript's
  prototypal inheritance. ActionScript was originally developed by [Macromedia
  Inc.], which merged into [Adobe Systems]. It is now associated with
  development in both [Adobe AIR] and [Adobe Flash], so its use has rapidly
  declined since the [Apple and Adobe Flash controversy].

[Macromedia Inc.]: https://en.wikipedia.org/wiki/Macromedia
[Adobe Systems]: https://en.wikipedia.org/wiki/Adobe_Systems
[Adobe Flash]: https://en.wikipedia.org/wiki/Adobe_Flash
[Adobe AIR]: https://en.wikipedia.org/wiki/Adobe_AIR
[Apple and Adobe Flash controversy]: https://en.wikipedia.org/wiki/Apple_and_Adobe_Flash_controversy

## Package Managers: NPM vs. Bower

JavaScript's ever-increasing modularity is of particular use to software
engineers. Innumerable JavaScript libraries are available to developers as
packages. There are libraries that offer everything from [helper
methods][lodash] to [various data structures][yallist] to [monolithic frontend
frameworks][angular]. Also, there are plenty of [humorous libraries].

While some programmers are [skeptical][David Haney] of the widespread use of
libraries – perhaps rightfully so – the proliferation of package integration has
likely led to significantly faster project development and production code that
is both more stable and more secure.

To handle project dependencies, a package manager has to be used. Two of the
most commonly used package managers are [npm][package manager] (node package
manager) and [Bower]. While npm is intended to handle Node.js dependencies, it
is able to handle frontend dependencies – those that are sent to the client for
use in the browser – as well. However, in order to allow for these frontend
dependencies to be easily required, a bundling tool like [Browserify] or
[webpack] has to be used.

Bower, on the other hand, is designed specifically for managing frontend
dependencies, so a bundling tool is not required. A key difference between npm
and Bower lies in their treatment of conflicting dependencies. Take the
following dependency structure:

| Dependency    | Requires       |
| ------------- |:--------------:|
| A version 2.0 | n/a            |
| B             | A version 1.0  |
| C             | A version 2.0  |

With npm, both A version 1.0 and A version 2.0 will be included. Bower, however,
will only require one of the two versions of A in order to decrease duplication
(which reduces the payload size). On bundle, Bower will ask which version should
be included. It will throw an error in the case that no mutual version of a
package exists between two dependencies.

App Academy chooses to use npm with webpack. More information about its use can
be found [here][npm-docs].

[lodash]: https://www.npmjs.com/package/lodash
[yallist]: https://www.npmjs.com/package/yallist
[angular]: https://www.npmjs.com/package/angular
[humorous libraries]: http://qz.com/677122/when-programmers-get-weird-the-funniest-code-projects-on-github/
[David Haney]: http://www.haneycodes.net/npm-left-pad-have-we-forgotten-how-to-program/
[package manager]: https://www.npmjs.com/
[npm-docs]: https://docs.npmjs.com/
[Bower]: https://bower.io/
[Browserify]: http://browserify.org/
[Webpack]: https://webpack.github.io/

## Vocabulary

### Vanilla

*Vanilla* is a term used to describe standard JavaScript without the use of
additional frameworks or libraries. For example, the use of jQuery to make
`.ajax` requests means that one is not using *vanilla* JavaScript.

### Hoisting

In JavaScript, declarations are *hoisted* by default. This means that variable
and function declarations are put into memory at compile time. Therefore, it is
actually possible, on execution, to call a declared function or variable before
it is defined. For instance, the following will properly call the function
`sayHello`.

```javascript
console.log(sayHello()); // => 'hi!'

function sayHello() {
  return 'hi!';
}
```

### 'use strict';

You will sometimes see this line at the top of JavaScript files. It is an
instance of a special compiler directive called a [pragma]. This specific pragma
ensures that the code in its scope follows certain rules, and if those rules are
broken, errors will be thrown at compile time. For instance, strict mode
prohibits the use of global variables. There are [many other rules] that are
enforced in strict mode.

[pragma]: http://stackoverflow.com/questions/14593350/what-exactly-is-a-javascript-pragma
[many other rules]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

### IIFE

An *Immediately-Invoked Function Expression* is a function that is called
immediately after it is defined. For example, the following would run right
after it is created:

```javascript
(function() {
  console.log('testing');
})(); // => 'testing'
```

### jQuery

jQuery is a free, open-source JavaScript library that allows its users to
manipulate the DOM (Document Object Model). It was originally released in 2006,
and it is now the most widely used JavaScript library on the Internet, being
installed on 65% of the ten million most-trafficked websites. jQuery includes
both a variety of functions that can be called on jQuery objects and utility
functions such as `$.ajax()`. jQuery allows coders a slightly easier way,
compared to vanilla JavaScript, to do almost everything - it's almost like
coding in Ruby.

jQuery's utility functions roughly mirror those provided by lodash.js.

### MEAN stack

The MEAN stack is comprised of MongoDB, Express, Angular, and Node - all of
which have a common base of JavaScript. This allows developers to write all of
their code, from their database to their frontend, in JavaScript. MongoDB is a
NoSQL database, Express is a "Sinatra-inspired server," Angular is a frontend
MVC framework and Node is the server-side JavaScript environment.

### Functional programming

JavaScript, with its treatment of functions as first-class objects, can be
treated as a functional programming language without too much effort. One
library that we will use heavily, Redux, uses several patterns and concepts from
functional programming such as the currying pattern, pure functions, and
avoiding the mutation of information. These ideas can be extended to encompass
the entirety of a JavaScript program through the use of various libraries.

Immutable.js, for example, is a library that makes every object immutable; to
update an object's information, you are forced to replace it with a new object.

### POJO

A POJO, or Plain Old JavaScript Object, is an object with attributes, getter
methods, and setter methods. Since JavaScript objects allow access to their
attributes via dot (`obj.attr`) and / or bracket (`obj["attr"]`) notation, any
JavaScript object without additional methods is a POJO.

The term comes from Java, with the "J" in the acronym originally having stood
for "Java."
