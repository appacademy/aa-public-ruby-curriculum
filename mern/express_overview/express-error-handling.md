# Handling Errors in Express

This reading explains how to configure custom error handlers in Express. By the
end, you should be able to

* Explain what differentiates error handlers from other middleware
* Configure a custom error handler that sets an appropriate status code
* Arrange multiple error handlers to run in series

## Error handlers

As you've seen, Express middleware functions take three parameters (`req`,
`res`, `next`) and route handlers take two or three parameters (`req`, `res`,
and optionally `next`):

```js
// Middleware function
app.use((req, res, next) => {
  console.log('Hello from a middleware function!');
  next();
});

// Route handler function
app.get('/', (req, res, next) => {
  if (req.params.message) {
      res.send(`Echo: ${req.params.message}`);
  } else {
      console.log('Hello from intermediate route hander function')
      next();
  }
});

// Route handler function
app.get('/', (req, res) => {
  res.send('Hello from a route handler function!');
});
```

Error handling functions look the same as middleware functions except they
take four parameters instead of three: `err`, `req`, `res`, and `next`:

```js
app.use((err, req, res, next) => {
  console.error(err);
  res.send('An error occurred!');
});
```

**Custom error handler functions have to define four parameters; otherwise,
Express won't recognize the function as an error handler.**

Define error handler functions **after** all other calls to `app.use()` and all
of your application's route definitions:

```js
// app.js

const express = require('express');

// Create the Express app
const app = express();


// Define routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/throw-error', (req, res) => {
  throw new Error('An error occurred!');
});

// Custom error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.send('An error occurred! Please check the url, or wait a few minutes and try again.');
});

// Define a port and start listening for connections
const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

This ensures that your custom error handler will get called to handle errors
from any of your application's middleware or route handler functions.

If you test your custom error handler by browsing to
`http://localhost:3000/throw-error` (or any other route that doesn't have
a handler),  you'll see that it sends a response containing the text "An error
occurred!".

## Customizing the status code

If you use your browser's developer tools to inspect the response of
`http://localhost:3000/throw-error`, you'll notice that the response HTTP status
code is `200 OK`, which is the default status code used by Express when sending
responses. You can use the `res.status()` method to set a different status code:

```js
// Custom error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.send('An error occurred! Please check the url, or wait a few minutes and try again.');
});
```

Notice that the `err.status` property is checked to see if it has a value before
the status is set to the literal numeric value `500`. Giving priority to the
`err.status` property allows code elsewhere in the application to throw an error
that includes a specific HTTP status code to send to the client.

## Defining multiple custom error handlers

Express allows you to define more than one custom error handler, which is useful
if you need to handle specific types of errors differently. It's also useful for
creating an error handler to perform a specific error-handling task. Let's look
at an example of defining a second error handler that's responsible for logging
errors.

Error handlers, like route handlers, are executed by Express in the order that
they're defined, so defining a new error handler before the existing handler
ensures that it will be called first:

```js
// Custom error handlers

// Error handler to log errors
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    // TODO Log the error to the database
  } else {
    console.error(err);
  }
  next(err);
});

// Generic error handler
app.use((err, req, res, next) => {
  // No longer need to console.log the error here!
  res.status(err.status || 500);
  res.send('An error occurred! Please check the url, or wait a few minutes and try again.');
});
```

The new error handler simply uses the `console.error()` method to log errors to
the console, provided that the `NODE_ENV` environment variable isn't set to
"production". In the production environment, there's a TODO comment to log the
error to the database. (This is a common practice in production environments
because it allows a system administrator to review application errors for issues
that require attention.)

Also, notice that when the new error handler calls the `next()` method, it
**passes in the `err` parameter** (i.e., the current error), which passes
control to the next **error handler**. An error handler needs to call `next` or
return a response. Failure to do this will result in the request "hanging" and
consuming resources on the server.

## What you've learned

In this reading, you've learned what an Express error handler is, how to define
an error handler, and how to configure your app to use multiple error handlers.
