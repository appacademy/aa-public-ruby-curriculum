# Node.js

The 'N' in MERN stands for Node.js.

## Learning Goals

- Understand what Node is
- Understand Node's role in the MERN stack

### What is Node.js?

Node.js is a JavaScript runtime environment. In other words, it is an
environment where you can run application code. JavaScript was originally
designed to be used only in browsers. Node allows us to utilize JavaScript code
outside of the browser in order to build network applications. You have already
used Node to help manage your React app's dependencies. Now you will be taking
it one step further and using it as a runtime environment for your server. You
will truly have a full-stack JavaScript app!

The main benefit of using Node is that you can take advantage of JavaScript's
asynchronicity.

Unless it has a parallel processor, your server will not be able to process two
requests at the same time. In other words, the server cannot process an
additional request until the first is completed, a problem known as _blocking_.
Node.js uses JavaScript's asynchronous capabilities to mitigate the blocking
problem by enabling _concurrent_ processing: each event is handled by
JavaScript's [event loop] just as asynchronous functions would be handled in a
browser.

In other words, as in a browser, if a request involves an asynchronous task that
does not require Node's active processing power--e.g., a database query or call
to `setTimeout`--then Node will process other requests while it waits for the
first to complete. Note, however, that if a request does require Node's
processing power, then blocking will still occur, even if the task is
asynchronous.

[event loop]: http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D
