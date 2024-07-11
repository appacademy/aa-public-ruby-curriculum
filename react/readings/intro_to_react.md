# React.js

### What is React?

[React][react] is a JavaScript library for creating UI components. React's
specialty is exactly what its name implies: reaction. When the data that is
represented by the UI changes, React *reacts* by updating the UI.

## What isn't React?

React isn't a front-end MVC framework. There are no models, no collections, no
controllers, and no templates. The basic library provides no router.

### Why would we need React?

As your application grows in size and complexity, managing the maze of callbacks
and event handlers responsible for updating your views will quickly become
unwieldy. React's mission is to manage *all* UI updates when any piece of your
app changes. Using it, we will no longer need to manually update elements on a
page in response to user input! When the state of the application changes, React
re-renders *all* elements. Thanks to the use of a 'virtual DOM', this process is
just as fast as isolating the changing element.

It gets better: the other primary focus of React is to provide a
*simple* interface for front-end developers to use. You describe how you
want your UI to look at any given point in time and React takes care
of the rest.

### How does it work?

In traditional JavaScript applications, you must look at which pieces of
data changed and surgically update the DOM to reflect the new state. Using
React, when the component is initially rendered, the markup is generated
and added to the document. When the data is changed, React renders
again, but instead of replacing the component wholesale, it updates only
the bit that has changed. It effectively runs a 'diff' on what is there
compared to what should be there. This way the absolute minimum change
can be applied to the DOM. This process is called *reconciliation*.

This process of *reconciliation* is so fast that we don't need to
carefully check which parts are rendering. We can re-render an entire
page in milliseconds.

### Where does React come from?

Facebook. Instagram.

[react]: https://reactjs.org/
