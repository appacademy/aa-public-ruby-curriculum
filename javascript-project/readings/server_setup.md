# Setting Up a Server

Before proceeding, be sure to go through all the instructions in the regular
Setup reading first.

## Setup

1. move your `index.html` into `dist`
2. add the following lines to your `.gitignore`:
    ```
    .env
    main.js
    main.js.map
    main.css
    main.css.map
    ```
3. install new dependencies
  ```
    npm install dotenv express node-fetch 
  ```
4. in your root directory, create `app.js`

  ```js
  const express = require('express'); // web framework
  const fetch = require('node-fetch'); // for making AJAX requests
  const path = require('path');
  
  // put environmental variables defined in .env file on process.env
  require('dotenv').config(); 

  const app = express();

  // serve files / assets from the dist folder
  app.use(express.static('dist')); 

  // in response to `GET /` requests, send the file `dist/index.html`
  app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/dist/index.html`);
  });

  // Heroku sets process.env.PORT in production; use 8000 in dev
  const PORT = process.env.PORT || 8000;
  // start up a server listening at PORT; on success, log a message
  app.listen(PORT, () => {
    console.log(`Listening at localhost:${PORT}`);
  });
  ```

5. change any relative paths to assets, such as imaages, so that they are now
relative to `dist` instead of your root directory. (This is because of the line
`app.use(express.static('dist'));` in `app.js`; static assets are served from
the `dist` folder).

6. add `engines` key and update `scripts` in `package.json`

    ```json
    // package.json

    {
      "engines": {
        "node": "14.x" // use your version of node; check with `node -v`
      },
      "scripts": {
        "start": "node app.js", // runs server
        "start:debug": "node --inspect app.js", // server with debuggers 
        "watch": "webpack --watch --mode=development",
        "build": "webpack --mode=production"
      },
    }
    ```

7. in your root directory, create a `.env` file, where you'll define 
environmental variables

## Environmental Variables and Dotenv

Environmental variables can be very useful. Generally, anything you want to keep
secret should be accessed through an environmental variable. You can provide
your production server with environmental variables on Heroku, and you can
provide your development server with environmental variables via a file you
never push up to GitHub. Nothing gets pushed to GitHub.

`process.env` is how you will access environmental variables in your JavaScript.
How these environmental variables get set differs between development and 
production:

* Development: 
  - the `dotenv` library looks for a file called `.env`
  - any environmental variables defined there are added to `process.env`
  - Example:
  ```
    //.env
    API_KEY=banana
  ```
  ```js
    //app.js
    console.log(process.env.API_KEY === "banana") // true
  ```
* Production:
  - do *not* push your `.env` file to Github or Heroku
  - set environmental variables on Heroku Dashboard (Settings > Config Vars)
  - keys & values should match what is in your `.env` file
  - Heroku automatically adds these config vars to `process.env`

## Refactoring

All your frontend AJAX requests will now go to your backend. Your backend will
then make a request to your external API. Whatever response it gets, it'll send
to the frontend. 

You'll need to set up one or more routes on your backend that your frontend
will make requests to. Here are some examples, with explanatory comments:

```js
// app.js

// `GET /cors` requests trigger this callback (like controller action)
// `request` object contains request's query string, wildcard params, etc
// `response` object has `send` method for sending our server response
app.get('/cors', (request, response) => {
  console.log(`Fetching: ${request.query.url}`);

  fetch(request.query.url) // AJAX request to URL provided in query string
    .then(apiResponse => apiResponse.json()) // parse response as JSON
    .then(data => response.send(data)) // send parsed data to frontend
    .catch(error => response.send(error));
});


app.get('/api', (request, response) => {
  const urlStart = 'https://www.themealdb.com/api/json/v1';
  const apiKey = process.env.API_KEY; // from .env (dev) or Heroku
  const searchTerm = request.query.searchTerm; // from query string
  const url = `${urlStart}/${apiKey}/search.php?s=${searchTerm}`;

  console.log(`Fetching: ${url}`);

  fetch(url) // AJAX request to API
    .then(apiResponse => apiResponse.json())
    .then(data => response.send(data))
    .catch(error => response.send(error));
});
```

Then, after setting up these routes, you'll have to change every frontend AJAX
request to your API so that it goes through your server instead.

The requests you're making on the frontend now, will instead be made on your 
server (`app.js`). Every aspect of the request, then, either needs to:

1. be hardcoded on your server – such as parts of the url that never change, or

2. be sent from the frontend to the backend, in the form of a query string
param, wildcard, or in the request body. 

The example below uses the query string to pass data to the backend. The
`encodeURIComponent` function is built-in to JavaScript; it encodes a string
such that it can be put into a query string. 

```js
// src/index.js

const demoUrl = 'https://www.metaweather.com/api/location/search/?query=san';
const corsRequest = (url = demoUrl) => {
  fetch(`/cors?url=${encodeURIComponent(url)}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
}

const apiRequest = (query = 'curry') => {
  fetch(`/api?searchTerm=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
}

/* 
Before Refactor:

const apiRequest = (query = 'curry') => { 
  fetch(`https://www.themealdb.com/api/json/v1/${apiKey}/search.php?s=${query}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
}
*/
```

Go ahead and test out these example backend routes and frontend requests in your 
project! Don't forget to put the `corsRequest` and `apiRequest` functions on the 
window to test those in the browser!
