# React

## A Brief History

React came out of a [project at Facebook][xhp-announcement] to develop a
version of PHP that could defend against Cross Site Scripting (XSS) attacks.
This version of PHP, called XHP, integrated XML-like language and could properly
escape potentially malicious code. It also had the ability to condense entire
PHP elements into single, HTML-like tags that could be used elsewhere in the
codebase. There was just one problem: the performance of XHP when it came to DOM
manipulation was terrible.

One engineer had the idea of using the more creative elements of PHP (i.e., its
integration of XML-like syntax and use of tags) in a Javascript library. In
order to deal with the issue of efficiently updating the DOM, lifecycle methods
and a differential algorithm to identify what needed to be updated were
introduced. Thus React was born.

React was first used in Facebook's newsfeed in 2011 and Instagram.com in 2012.
Although React was made open source in 2013, its license contained a clause that
could be invoked to prevent a party from using the React library should their
product compete with or should they make any sort of patent claim against
Facebook. The non-competition portion of the clause was recently revised and is
no longer in effect. However, a party's right to use React can still be revoked
if they file a patent claim against Facebook.

React has continued to grow in popularity since its release. It is now, along
with Angular, one of the most popular libraries for front-end development. In
addition to Facebook, React is used by Uber, Airbnb, Netflix, Yahoo, Pinterest,
Feedly, Coursera, Product Hunt, and OpenTable.

[xhp-announcement]:
  https://m.facebook.com/notes/facebook-engineering/xhp-a-new-way-to-write-php/294003943919

## Concepts

Below are a series of concepts you should be familiar with as you enter the job
search.

### Single Page App

Single page apps only have one backend route that renders HTML. To allow users
to interact with the database, asynchronous Ajax requests send and retrieve
information to the backend, and React updates the relevant portion of the page.
This brings an improvement in performance because the page isn't entirely
reloaded with every click. Rather, React attempts to update a minimal number of
elements. Users still have the feeling that they're navigating to other pages on
a single page app because the browser's history is synchronized with the page.

### Virtual DOM

The DOM stands for Document Object Model and is a tree structure in which each
node is an object that represents an HTML element. As nodes of the tree are
manipulated, the corresponding HTML on the webpage is changed. The DOM provides
us an API to traverse and change nodes. It is accessible through `document`.

The issue and relevance to our understanding of React is that as web pages grow
in size, the DOM becomes more expensive to manage and traverse. This is where
the Virtual DOM comes in.

The virtual DOM is a simpler and faster abstraction of the HTML DOM. While it
might be more expensive to manage two DOMs in some respects, being able to
traverse and perform operations on the virtual DOM saves React from having to
have costly interactions with the real one, only updating it when it absolutely
needs to.

### Diffing Algorithm

When rendering, React creates a tree of React elements. When state or props
update, React then renders a tree of potentially different elements. The diffing
algorithm figures out how to efficiently update the DOM, removing old DOM nodes
and replacing them only when necessary. We give unique HTML elements unique IDs
so the diffing algorithm can tell them apart.

This algorithm solves the problem of generating the fewest number of operations
needed to manage re-rendering. The React diffing algorithm manages to run in
O(n) time (where n is the number of HTML elements) using a series of rules to
determine when a node will need to be updated. To read about the specific
implementation, [check out this post on the React website][diffing-algorithm].

[diffing-algorithm]: https://reactjs.org/docs/reconciliation.html

### JSX

JSX provides syntactic sugar for the `React.createElement(component, props,
...children)` function and in doing so makes the code you write more readable
and concise. We use Babel to transpile JSX into Javascript. Remember, JSX
doesn't have to be used with React; it just makes life easier. For more
information, refer to the JSX reading linked in the sidebar.

### Enzyme and Jest

[Enzyme][enzyme-docs] is a testing library developed by AirBnB that is used to
compare React outputs. Central to testing in Enzyme is the concept of shallow
rendering, which allows us to unit test a single component and not rely on the
performance of its children. Enzyme is often used in conjunction with
[Jest][jest-docs], a framework created by Facebook for running tests on React
code. Jest is syntactically similar to Jasmine (JS testing framework), and reads
similarly to RSpec. The creators of React recommend Enzyme's rendering methods
for testing over those provided by Jest.

[enzyme-docs]: https://enzymejs.github.io/enzyme/
[jest-docs]: https://jestjs.io/

## Comparisons with other frameworks and libraries

### jQuery

[jQuery][jquery-docs] is the most popular Javascript library in use, allowing
developers to manipulate the DOM, handle events, and make Ajax request, among
other things. It's possible to build a single page app using just jQuery.
However, that would put the onus of managing efficient re-renders on the
developer.

With React, on the other hand, all we have to do is worry about updating state
and the React diffing algorithm will determine what needs to be re-rendered.

[jquery-docs]: https://jquery.com/

### Vue

[Vue][vue-docs] is a relatively new, open source, and community-driven library.
React and Vue share several similarities, including a virtual DOM, dynamic view
components, companion libraries that handle routing (react-router), and global
state (react-redux).

Vue provides big improvements in speed relative to React, in part attributed to
a lighter-weight virtual DOM and a more selective re-rendering of components.
However, Vue is developed by a much smaller community, and lacks many of the
libraries React has. Unlike React and Angular, it doesn't have the large,
organizational support of Facebook or Google.

[vue-docs]: https://vuejs.org/

### Angular

[Angular][angular-docs] was initially released in 2009 and is maintained by
Google and a community of developers. It is part of the MEAN stack: the MongoDB
database, Express.js server, Angular.js, and Node.js.

Angular is a framework, not a library like React, and implements a [MVVM
framework (Model-View-ViewModel)][mvvm-explanation]. As a result, it offers
perhaps more functionality out of the box than React. However, it also takes
much more time to master and is criticized in some corners for its lack of
flexibility. Angular 1.0 also struggled to handle larger amounts of data. With
the release of Angular 2.0, its ability to render large amounts of data in the
browser has increased. However, it still loses out to React in terms of
performance.

[angular-docs]: https://angularjs.org/
[mvvm-explanation]:
  http://stackoverflow.com/questions/667781/what-is-the-difference-between-mvc-and-mvvm

### Ember

Like Angular, [Ember][ember-docs] is a framework and not just a library. It has
a number of customizations that can be added to the app from the Ember CLI (an
idea the Ember team took from Rails!), as well as built in testing tools.
However, it doesn't have a particularly large core team so development is slow.
The community, while vibrant, doesn't produce as many add-ons. Also, because
Ember is a framework, it's harder to customize.

[ember-docs]: http://emberjs.com/

### React Native

[React Native][react-native-docs] was released in 2015 as a way to use React
components to develop mobile apps in Javascript. It's used by companies like
Facebook, Airbnb, Instagram, and Baidu, as well as many smaller startups.
Windows also has plans to start supporting React applications on the Windows
Universal Platform.

[react-native-docs]: https://reactnative.dev/
