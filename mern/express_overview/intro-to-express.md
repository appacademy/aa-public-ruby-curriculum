# Introduction To Express

An _Express_ application is a server instance that can be configured to easily
handle requests and formulate responses instead of writing a ton of boilerplate
code. Overall, it is fairly minimalist, using middleware packages to tackle
almost any web development problem.

This reading will show you how to

* Create an Express app
* Configure route handlers for your app
* Run your app and test your routes

## Creating an Express app

Express applications consist of an `app` object created at the top level calling
the `express()` function exported by the Express module. Once defined, this
`app` object can use methods from the Express module for:

* Routing HTTP requests
* Configuring middleware
* Rendering HTML views
* And more...

> Tip: For future reference, you may wish to bookmark the [Express application
> docs].

To create an Express app--this is in general, not specifically for your MERN
project--initialize an npm project (`npm init -y`) and run `npm install
express`. (Make sure you have a __.gitignore__ that includes __node_modules__!)

Add a file named __app.js__ to your project folder. Use the `require` directive
to import the `express` module and assign it to a variable named `express`. The
`express` variable references a function (exported by the `express` module) that
you can call to create an Express application. Assign the return value from the
`express` function call to a variable named `app`:

```js
// app.js

const express = require('express');

// Create the Express app
const app = express();
```

That's it! The `app` variable holds a reference to an Express Application
(`app`) object. Of course, your app doesn't do much at the moment. You'll call
methods on the `app` object as you build out your web application.

[Express application docs]: http://expressjs.com/en/api.html#app

## Handling routes in Express

Now that you know how to set up an Express application, it's time to
configure the routes that will be handling client requests.

Routing determines how an application should respond to a client's request based
on the _endpoint_: the combination of a specific URI (i.e., the path, such as
`/` or `/users`) and an HTTP method (e.g., `GET` or `POST`).

Initializing a new Express application and defining new routes can be done as
shown below:

```js
// Create the server 
const express = require('express');

const app = express();

// Assign routes
app.get('/', (req, res) => {
    // Send a response back to the client
});

app.post('/users', (req, res) => {
    // Do something...
    // Send a response back to the client
});

// Tell the server to listen for incoming traffic on a specific port
const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

Notice that first the express server is created, then routes are assigned, and
finally the server is told to `listen()` for incoming web traffic.

### Defining route paths

The Express Application (`app`) object contains a collection of methods for
defining an application's routes:

* `get()` - to handle `GET` requests
* `post()` - to handle `POST` requests
* `put()` - to handle `PUT` requests
* `delete()` - to handle `DELETE` requests
* `patch()` - to handle `PATCH` requests

All of these methods take two arguments: the path of the route relative to `/`
and a callback function that will execute some action and return a response to
the user.

Express provides a lot of flexibility with the format of the route path. A route
path can be a string, string pattern, regular expression, or an array containing
any combination of those as seen below:

```js
let paths = ['/', '/ab+cd', '/a/'];

app.get(paths, (req, res) => {
    // Send response
})
```

The application will send the same response to any `GET` request that matches
one of the expressions in the `paths` array.

### Handling responses: The callback function

As noted above, the second parameter to any routing method in Express is a
function specifying how to respond to that route. Express calls this callback
function whenever an incoming request matches the route.

The callback function takes two parameters, `req` and `res`. These parameters
give you access, respectively, to the **Request object** and the **Response
object**. The Request (`req`) object is used to get details about the client
request that's currently being processed. The Response (`res`) object is used to
prepare a response to return to the client.

#### `req`

Methods available on the `req` object that you might find helpful include:

* `req.body`: Returns the parsed body of the request
* `req.query`: Returns an object containing the query string parameters
* `req.params`: Returns an object containing named route parameters

As an example of this last method, you could send and access "John Adams" like
this:

```js
// In the browser console
fetch('http://localhost:3000/users/John/Adams', {
    method: 'POST'
})

// Server-side handling
app.post('/users/:firstName/:lastName', (req, res) => {
    console.log(req.params.firstName);   // John   
    console.log(req.params.lastName);    // Adams
})
```

#### `res`

To send a plain text **response** to the client, call `res.send()`, passing in
the desired content.

For example, when a client makes a `GET` request to your application by browsing
to the URL `http://localhost:3000/`, Express could return a plain text response
like "Hello from Express!".

```js
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});
```

The `res` object also supports sending JSON back to the client through the
`.json()` method:

```js
app.get('/json', (req, res) => {
    const resp = {
        property1: "value1",
        property2: "value2"
    };
    res.json(resp);
})
```

This will call `JSON.stringify()` on the input to `res.json()`, thereby
serializing it. It will be the job of the client to deserialize the response to
properly interact with it as a JavaScript object.

**Note:** Calling `res.send` or `res.json` ends the server's processing of the
request; any subsequently-defined middleware, route handlers, or error handlers
will not run. So if you have code like this:

```js
// This is BAD code! DO NOT DO THIS!
app.get('/goodbye/*', (req, res) => {
    res.send("Goodbye, my friend!");
});

app.get('/goodbye/until/:time', (req, res) => {
    res.send(`Goodbye. See you ${req.params.time}.`);
});
```

the `goodbye/until/:time` route will never get matched--and, consequently, never
return its message--because that route will always match the `goodbye/*`
expression checked by the first route handler. You should accordingly always
define your routes from most specific to least specific:

```js
// This is GOOD code
app.get('/goodbye/until/forever', (req, res) => {
    res.send("So long. Farewell. Have a great life!");
});

app.get('/goodbye/until/:time', (req, res) => {
    res.send(`Goodbye. See you ${req.params.time}.`);
});

app.get('/goodbye/*', (req, res) => {
    res.send("Goodbye, my friend!");
});
```

## Running your app and testing your routes

To run your application, browse to your project's folder and run the following
command in the terminal:

```plaintext
node app.js
```

If your application starts successfully, you'll see the text "Listening on port
3000..." displayed in the terminal. Next, open a web browser and browse to the
address `http://localhost:3000/`. You should see the text "Hello from Express!"
displayed in the browser if you've been following along.

To test any Express route, start your Express server and use 1) Postman, 2) the
browser address bar (for `GET` only), or 3) `fetch` on the browser to make a
request to the endpoint that you wish to test.

**NOTE:** If you change your __app.js__ file, you will need to restart the app
to see the changes. (To restart the app, kill the currently running server
process with `CTRL-c` and rerun `node app.js`.)

## What you've learned

In this reading, you learned how to create an Express app, configure route
handlers, and test the routes' functionality.
