# Express Middlewares Flow Diagram

When working with middleware and error handling middleware in Express, it can be
quite useful to have a flow diagram for the possible paths. Not only does this
help with implementation, but it can also help with testing to make sure all
paths have been followed. Additionally, a diagram can help developers when
joining a project that already has an Express server.

In this article, you will review a flow diagram for an Express server with
multiple custom middlewares and error handling middlewares.

## How to read a flow diagram

Start at the top of the image and follow the arrows.

* Each use of `next()` flows to the next middleware function
* `next(err)` flows to the next error handling middleware function
* Calling a response function (represented by `res.end()`) will cause the app to
  send a response back to the caller

The symbols have specific meanings

* Middlewares are represented by diamonds because they are decision points: one
  or more arrows flow in, and two or more flow out.
* Error handling middlewares are represented by slanted rectangles (a.k.a.,
  parallelograms) because they are procedures that determine what to do with an
  error: either send a response or continue to flow through the middleware
  chain.
* Starting points are drawn using rounded corner rectangles with one arrow out.
* Ending points are drawn using rounded corner rectangles with one arrow in.

Color coding can be helpful but is not required.

## Sample diagram

![diagram]

## What you've learned

In this article, you reviewed a flow diagram for an Express server with custom
middlewares and error handling middlewares.

[diagram]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/module-04/week-10/assets/express-middleware-chain.png
